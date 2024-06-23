const modeloUsuario = require('../model/usuario')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await modeloUsuario.encontrarUsuario(email);
        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            req.session.usuarioId = usuario.id
            req.session.usuarioNome = usuario.nome
            res.status(200).json({ success: true, redirectUrl: '/home' })
        } else {
            res.status(401).json({ success: false, message: 'Email ou senha incorretos' })
        }
    } catch (err) {
        console.error('Erro: ', err)
        res.status(500).json({ success: true, message: 'Erro ao processar login' })
    }
}

const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ success: false, message: 'Erro ao processar logout: ', err })
        }
        res.redirect('/')
    })
}

const cadastro = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        if (senha.length < 8) {
            return res.status(400).json({ success: false, message: 'A senha deve conter pelo menos 8 caracteres' })
        }


        const emailExistente = await modeloUsuario.encontrarUsuario(email)
        if (emailExistente) {
            return res.status(400).json({ success: false, message: 'Email já está em uso' })
        }
        else {
            const novoUsuario = await modeloUsuario.criarUsuario(nome, email, senha)
            res.status(201).json({ success: true, message: 'Usuário criado com sucesso' })
        }
    }
    catch (err) {
        console.error('Erro ao criar usuário: ', err)
        res.status(500).json({ sucess: true, message: 'Falha ao criar usuário' })
    }
}

const remover = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await modeloUsuario.encontrarUsuario(email)
        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            await modeloUsuario.removerUsuario(email)

            if (req.session) {
                req.session.destroy(err => {
                    if (err) {
                        console.error('Erro ao destruir sessão: ', err)
                        res.status(500).json({ success: false, message: 'Falha ao encerrar sessão' })
                    } else {
                        res.status(200).json({ success: true, message: 'Conta removida com sucesso' })
                    }
                })
            } else {
                res.status(500).json({ success: false, message: 'Sessão não encontrada' })
            }
        } else {
            res.status(401).send('Email ou senha incorretos')
        }
    } catch (err) {
        console.error('Não foi possível remover a conta: ', err)
        res.status(500).send('Falha ao remover conta')
    }
}

const alterar = async (req, res) => {
    const { email, senhaAtual, novaSenha } = req.body

    try {
        const usuario = await modeloUsuario.encontrarUsuario(email)

        if (usuario && await bcrypt.compare(senhaAtual, usuario.senha)) {
            await modeloUsuario.alterarSenha(email, novaSenha)

            if (req.session) {
                req.session.destroy(err => {
                    if (err) {
                        console.error('Erro ao destruir sessão: ', err)
                        res.status(500).json({ success: false, message: 'Falha ao encerrar sessão' })
                    } else {
                        res.status(200).json({ success: true, message: 'Senha alterada com sucesso' })
                    }
                })
            }
        }
        else {
            res.status(401).json({ success: false, message: 'Email ou senha incorretos' })
        }

    } catch (err) {
        console.error('Não foi possível alterar a senha: ', err)
        res.status(500).json({ success: false, message: 'Falha ao alterar senha' })
    }
}

module.exports = {
    login,
    logout,
    cadastro,
    remover,
    alterar
}
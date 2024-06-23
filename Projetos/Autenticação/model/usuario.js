const pool = require("../config/database")
const bcrypt = require("bcrypt")

const encontrarUsuario = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]

    try {
        const res = await pool.query(query, values)
        return res.rows[0]
    } catch (err) {
        console.error("Erro ao encontrar usuário: ", err)
        throw err
    }
}

const criarUsuario = async (nome, email, senha) => {
    const senhaHash = await bcrypt.hash(senha, 10)
    const query =
        "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)"
    const values = [nome, email, senhaHash]

    try {
        const res = await pool.query(query, values)
        return res.rows[0]
    } catch (err) {
        console.error("Erro ao criar usuário: ", err)
        throw err
    }
}

const removerUsuario = async (email) => {
    const query = "DELETE FROM usuarios WHERE email = $1"
    const values = [email]

    try {
        const res = await pool.query(query, values)
        return res.rows[0]
    } catch (err) {
        console.error('Não foi possível remover a conta: ', err)
        throw err
    }
}

const alterarSenha = async (email, novaSenha) => {
    const senhaHash = await bcrypt.hash(novaSenha, 10);
    const query = "UPDATE usuarios SET senha = $1 WHERE email = $2"
    const values = [senhaHash, email]

    try {
        await pool.query(query, values)
    } catch (err) {
        console.error("Não foi possível alterar a senha: ", err)
        throw err
    }
}

module.exports = {
    encontrarUsuario,
    criarUsuario,
    removerUsuario,
    alterarSenha,
}

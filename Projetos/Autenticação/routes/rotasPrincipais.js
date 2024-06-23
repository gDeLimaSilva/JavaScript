const express = require('express')
const path = require('path')
const router = express.Router()

const requireLogin = (req, res, next) => {
    if (!req.session.usuarioId) {
        return res.redirect('/')
    }
    next()
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/index.html'))
})

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/cadastro.html'))
})

router.get('/remover', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/remover.html'))
})

router.get('/alterar', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/alterar.html'))
})

router.get('/home', requireLogin, (req, res) => {
    res.render('home.ejs', { usuarioNome: req.session.usuarioNome })
})

module.exports = router
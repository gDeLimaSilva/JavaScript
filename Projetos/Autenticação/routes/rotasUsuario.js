const express = require('express')
const router = express.Router();
const controleUsuario = require('../controller/controleUsuario')

router.post('/login', controleUsuario.login)
router.post('/cadastro', controleUsuario.cadastro)
router.post('/remover', controleUsuario.remover)
router.post('/alterar', controleUsuario.alterar)
router.post('/logout', controleUsuario.logout)

module.exports = router

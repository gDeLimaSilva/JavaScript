const express = require('express')
const session = require('express-session')
const path = require('path')
const rotasPrincipais = require('./routes/rotasPrincipais')
const rotasUsuario = require('./routes/rotasUsuario')

const app = express()
app.set('view engine', 'ejs')

app.use(express.static('./view'))
app.set('views', path.join(__dirname, './view'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/', rotasPrincipais)
app.use('/user', rotasUsuario)

app.listen(1000, () => {
    console.log('Servidor rodando na porta 1000.')
})
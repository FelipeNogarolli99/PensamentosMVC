const express = require('express')
const {engine} = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')

//iniciar o express
const app = express()

const conn = require('./db/conn')

//models
const Pensamentos = require('./models/Pensamento')
const User = require('./models/User')
const { FORCE } = require('sequelize/lib/index-hints')

app.engine('handlebars', engine())
app.set('view engine' , 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), "session"),
        }),
        cookie:{
            secure: false,
            maxAge: 36000,
            expires: new Date(Date.now() + 36000),
            httpOnly: true
        }

    }),
)

app.use(flash())

app.use(express.static('public'))

app.use((req,res, next) =>{
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

conn
    // .sync( {force: true})
    .sync()
    .then(() =>{
        app.listen(3001)
    })
    .catch((erro) => console.log(erro))
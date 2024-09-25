const express = require('express')
const {engine} = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')

//iniciar o express
const app = express()

const conn = require('./db/conn')

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

conn
    .sync()
    .then(() =>{
        app.listen(3000)
    })
    .catch((erro) => console.log(erro))
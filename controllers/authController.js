const { where } = require("sequelize")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
 
module.exports = class AuthController{
    static login(req, res){
        res.render("auth/login")
    }

    static register(req,res ){
        res.render('auth/register')
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        // se usuario existe e senha é aquela
        const userExists = await User.findOne({where: {email: email}})

        if(!userExists){
            req.flash("message", "Usuario não encontrado")
            return res.render("auth/login")
        }

        const passwordMatch = bcrypt.compareSync(password, userExists.password)

        if(!passwordMatch){
            req.flash("message", "Senha invalida")
            return res.render("auth/login")
        }

    
        req.session.userid = userExists.id

        req.flash('message', "Autentiação realizada com suceso")

        req.session.save(() =>{
            res.redirect("/")
        })

    }

    static async registerPost(req, res){

        const {name, email, password, confirmPassword} = req.body

        // validar senha

        if(password != confirmPassword){
            req.flash("message", "As senhas não conferem, tente novamente")
            return res.render("auth/register")

            
        }   

        const checkIfUserExists = await User.findOne({where: {email: email}})

        if(checkIfUserExists){
            req.flash("message", "O e-mail já está em uso!")
            return res.render("auth/register")

        }

        // create senha

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user ={
            name,
            email,
            password: hashedPassword
        }

       try{
        const createUser = await User.create(user)

        req.session.userid = createUser.id

        req.flash('message', "Cadastro realizado com suceso")

        req.session.save(() =>{
            res.redirect("/")
        })
       }catch(err){
        console.log(err)
       }
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect("/login")
    }
}


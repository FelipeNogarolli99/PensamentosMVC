const { where, or } = require('sequelize')
const Pensamentos = require('../models/Pensamento')
const User = require('../models/User')

const {Op} = require("sequelize")

module.exports = class PensamentosController{
    static async showPensamentos(req, res){

        let search = ""

        if(req.query.search){
            search= req.query.search

        }

        let order = 'DESC'

        if (req.query.order === 'old') {
        order = 'ASC'
        } else {
        order = 'DESC'
        }


        const toughtsData = await Pensamentos.findAll({
            include: User,
            where:{
                title: {[Op.like]: `%${search}%`},
            },

            order:[["createdAt" , order]]
        })
        
        const toughts = toughtsData.map((result) => result.get({plain: true}))

        let pensmanetosQTI = toughts.length

        if(pensmanetosQTI === 0){
            pensmanetosQTI =false
        }

        res.render("pensamentos/home" , {toughts, search, pensmanetosQTI})
        
    }

    static async dashboard(req, res) {
        const userId = req.session.userid
    
        const user = await User.findOne({
          where: {
            id: userId,
          },
          include: Pensamentos,
          plain: true,
        })
    
        const toughts = user.Pensamentos.map((result) => result.dataValues)
    
        let emptyToughts = true
    
        if (toughts.length > 0) {
          emptyToughts = false
        }
    
        res.render('pensamentos/dashboard', { toughts, emptyToughts })
      }

    static createTought(req, res){
        res.render('pensamentos/create')
    }

    static createToughtSave(req, res) {
        const tought = {
          title: req.body.title,
          UserId: req.session.userid,
        }
    
        Pensamentos.create(tought)
          .then(() => {
            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() => {
              res.redirect('/pensamentos/dashboard')
            })
          })
          .catch((err) => console.log())
      }

    //   static async removeTought(req, res){
    //     const id= req.body.id
    //     const UserId = req.session.userid

    //    try {
    //     await Pensamentos.destroy({where: {id:id, UserId: UserId}})

    //         req.session.save(() => {
    //           res.redirect('/pensamentos/dashboard')
    //         })
    //    } catch (error) {
    //     console.log('Aconteeu um erro ' + error)
        
    //    }

    //   }

      static async removeTought(req, res) {
        const id = req.body.id
        const UserId = req.session.userid
    
        await Pensamentos.destroy({ where: { id: id , userId:UserId} })
          .then(() => {
            req.flash('message', 'Pensamento removido com sucesso!')
            req.session.save(() => {
              res.redirect('/pensamentos/dashboard')
            })
          })
          .catch((err) => console.log())
      }

      static async updateTought(req, res){
        const id = req.params.id

        const pensamento = await Pensamentos.findOne({where: {id:id}, raw: true})
        res.render("pensamentos/edit" , {pensamento})
      }

      static async updateToughtSave( req, res ){

        const id = req.body.id

        const pensamento = {
            title: req.body.title

        }

        await Pensamentos.update(pensamento, { where: {id:id }})
        req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
              res.redirect('/pensamentos/dashboard')
            })
        
      }
    
}


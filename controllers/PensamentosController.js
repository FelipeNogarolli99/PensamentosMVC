const Pensamentos = require('../models/Pensamento')
const User = require('../models/User')

module.exports = class PensamentosController{
    static async showPensamentos(req, res){
        res.render('pensamentos/home')
        
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
    
        console.log(toughts)
        console.log(emptyToughts)
    
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
    
}


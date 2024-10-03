const Pensamentos = require('../models/Pensamento')
const User = require('../models/User')

module.exports = class PensamentosController{
    static async showPensamentos(req, res){
        res.render('pensamentos/home')
    }
}
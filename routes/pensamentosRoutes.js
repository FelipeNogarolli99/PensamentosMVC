const express = require('express')
const router = express.Router()
const PensamentosController = require('../controllers/PensamentosController')

const checkAuth = require("../helpers/auth").checkAuth

//controller

router.get('/dashboard' , checkAuth, PensamentosController.dashboard)
router.get('/add' , checkAuth, PensamentosController.createTought)
router.get('/edit/:id' , checkAuth, PensamentosController.updateTought)
router.post('/edit' , checkAuth, PensamentosController.updateToughtSave)
router.post('/add' , checkAuth, PensamentosController.createToughtSave)
router.post('/remove' , checkAuth, PensamentosController.removeTought)
router.get('/' , PensamentosController.showPensamentos)

module.exports = router
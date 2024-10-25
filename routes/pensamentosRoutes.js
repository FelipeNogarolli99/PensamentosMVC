const express = require('express')
const router = express.Router()
const PensamentosController = require('../controllers/PensamentosController')

const checkAuth = require("../helpers/auth").checkAuth

//controller

router.get('/dashboard' , checkAuth, PensamentosController.dashboard)
router.get('/add' , checkAuth, PensamentosController.createTought)
router.get('/' , PensamentosController.showPensamentos)

module.exports = router
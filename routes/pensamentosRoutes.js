const express = require('express')
const router = express.Router()
const PensamentosController = require('../controllers/PensamentosController')

//controller

router.get('/' , PensamentosController.showPensamentos)

module.exports = router
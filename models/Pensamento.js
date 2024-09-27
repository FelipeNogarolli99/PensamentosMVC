const { DataTypes} = require('sequelize')
const db = require('../db/conn')

const User = require('.//User')

//user

const Pensamentos = db.define('Pensamentos' ,{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Pensamentos.belongsTo(User)
User.hasMany(Pensamentos)

module.exports = Pensamentos
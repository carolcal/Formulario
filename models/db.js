const Sequelize = require('sequelize')

//Conexão com o bancod de dados MySQL
const sequelize = new Sequelize('postagens', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
})

module.exports = { Sequelize, sequelize }
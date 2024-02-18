const db = require('./db')

const Post = db.sequelize.define('posts', {
    titulo:{
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

//post.sync({force: true})

module.exports = Post
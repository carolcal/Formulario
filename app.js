const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Posts = require("./models/post")

//Config 
    //Template Engine
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            }
        }))
        app.set('view engine', 'handlebars')
    //Body Parser
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())


//Rotas
    app.get("/", function (req, res) {
        Posts.findAll({ order: [['id', 'DESC']] }).then((posts) => {
            console.log(posts)
            res.render("home", { posts })
        }).catch((error) => {
            res.send(`Houve um erro: ${error}`)
        })
    })
    app.get("/cad", function (req, res) {
        res.render("formulario")
    });
    app.post("/add", function (req, res) {
        Posts.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
        }).then(() => {
            res.redirect("/")
        }).catch((error) => {
            res.send(`Houve um erro: ${error}`)
        })
    })
    app.get("/delete/:id", function (req, res) {
        Posts.destroy({ where: { "id": req.params.id } }).then(() => {
            res.send("Postagem Deletada com Sucesso!")
        }).catch(()=>{
            res.send("Essa postagem não existe!")
        })
    })

//Server
    app.listen(8081, function () {
        console.log("Servidor rodadndo na url http://localhost:8081")
    }) //essa função deve sempre ser a última na sua linha de código


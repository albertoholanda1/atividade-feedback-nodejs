const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let feedbacks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/feedbacks/enviar", (req, res) => {

    const { nome, comentario } = req.body;

    feedbacks.push({
        nome,
        comentario
    });

    res.redirect("/feedbacks/lista");
});

app.get("/feedbacks/lista", (req, res) => {

    res.render("lista", {
        feedbacks
    });

});

app.post("/feedbacks/remover", (req, res) => {

    const indice = req.body.indice;

    feedbacks.splice(indice, 1);

    res.redirect("/feedbacks/lista");
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});
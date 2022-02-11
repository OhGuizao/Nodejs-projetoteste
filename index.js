// Vamos criar um servidor de backend para cadastrar dados de um banco de dados Mysql.
// Esse projeto deverá recebr comandos de teste

//importar o módulo do servidor express
const express = require("express");

// importar o módulo de mysql para a manipulação de banco de dados
const mysql = require("mysql");

//importar o módulo do cors para tratar urls que vem do frontend
const cors = require("cors");

// Vamos usar o servidor express passando como referência a constate app
const app = express();

// Preparar o servidor para receber dados 
app.use(express.json());

//Aplicar o Cors na aplicação
app.use(cors());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Banco de dados ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Estabelecer conexão com o banco de dados e realizar um CRUD na base
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbprodutos"
});
//Testar e estabelecer a coonexão com o banco de dados
conexao.connect((erro) => {
    if (erro) {
        console.error("Erro ao tentar estabelecer a conexão" + erro.stack);
        return;
    }
    console.log("Conectado ao banco ->" + conexao.threadId);
});





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CRUD ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Teste de rotas usando a arquitetura http coms os verbos GET, SET, PUT E DELET

//  --------->  GET
app.get("/produtos/listar", (req, res) => {

    //consultar sql para selecionar os produtos no banco de dados
    conexao.query("select * from tbproduto", (erro, resultado) => {
        if (erro) {
            return res.status(500).send({ msg: "Erro ao tentar executar a consulta" + erro });
        }
        res.status(200).send({ msg: resultado })
    })
});

//método GET, para a busca de apenas um produto
app.get("/produtos/buscar/:id", (req, res) => {

    conexao.query("select * from tbproduto where idproduto=?", [req.params.id], (erro, resultado) => {
        if (erro) {
            return res.status(500).send({ msg: `Erro ao tentar executar consultac${erro}` });
        }
        if (resultado == null || resultado == "") {
            return res.status(404).send({ msg: `Não foi possivel localizar este produto` });
        }
        res.status(200).send({ msg: resultado });
    });

});

//  --------->  POST
app.post("/produtos/cadastro", (req, res) => {
    conexao.query("insert into tbproduto set ?", [req.body], (erro, resultado) => {
        if (erro) {
            res.status(500).send({ msg: `Não foi possível cadastrar -> ${erro}` });
            return;
        }
        res.status(201).send({ msg: resultado })
    })
});

//  --------->  PUT
app.put("/produtos/atualizar/:id", (req, res) => {
    conexao.query("update tbproduto set ? where idproduto=?", [req.body, req.params.id], (erro, resultado) => {

        if (erro) {
            res.status(500).send({ msg: `Erro ao tentar atualizar dados ->${erro}` });
            return;
        }
        res.status(200).send({ msg: resultado });
    })
});

//  --------->  DELET
app.delete("/produtos/apagar/:id", (req, res) => {
    conexao.query("delete from tbproduto where idproduto = ?", [req.params.id], (erro, resultado) => {
        if (erro) {
            res.status(500).send({ msg: `Erro ao tentar apagar o produto -> ${erro}` });
            return;
        }
        res.status(204).send({ msg: resultado });
    })
});

//Vamos subir o servidor na porta:5000
app.listen("5000", () => console.log("Servidor online em http://localhost:5000"));

module.exports = app;
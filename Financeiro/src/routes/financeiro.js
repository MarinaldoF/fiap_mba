const express = require("express")
const Financeiro = require("../model/financeiro")
const serverConfig = require("../config/servidor")
const verificaToken = require("../middleware/verificaToken")




// Configurando a variável de rotas do express
const route = express.Router();

route.get('/', verificaToken, (req, res) => {
    Financeiro.find({apikey: req.data.apikey}, (error, accounts) => {
        if (error) res.status(500).send({error});
        res.status(200).send({accounts});
    }).select('-password');
});

route.post('/', verificaToken, (req, res) => {
    // Adicionando a APIKEY no corpo da requisição
    req.body.apikey = req.data.apikey;

    // Criando os dados da conta
    const model = new Financeiro(req.body);

    // Executando o comando de save
    model.save().then((result) => {
        return res.status(201).send({output: "Cadastro realizado", payload: result})
    }).catch((error) => {
        return res.status(500).send({error});
    });
});

route.put('/:id', verificaToken, (req, res) => {
    Financeiro.findByIdAndUpdate(req.params.id, req.body, {new: false}, (error, account) => {
        if (error) res.status(500).send({error});
        return res.status(202).send({output: "Alterado"})
    });
});

module.exports = route;

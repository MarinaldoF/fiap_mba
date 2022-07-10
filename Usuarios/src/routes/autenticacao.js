const express = require("express")
const bcrypt = require("bcrypt")
const criarToken = require("../utils/criarToken")
const User = require("../model/usuario")

// Configurando a variável de rotas do express
const route = express.Router();

route.post('/', (req, res) => {
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) return res.status(500).send({error});
        if (!user) return res.status(400).send({error: 'NotFound'});
        bcrypt.compare(req.body.password, user.password, (error, same) => {
            if (error) return res.status(500).send({error});
            if (!same) return res.status(403).send({error: 'Credenciais inválidas'});
            const token = criarToken(user._id, user.apikey);
            return res.status(200).send({
                token, apiKey: user.apikey,
            });
        });
    });
});

module.exports = route;
const express = require("express")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const usuario = require("../model/usuario")
const serverConfig = require("../config/servidor")
const verificaToken = require("../middleware/verificaToken")

// Configurando a variável de rotas do express
const route = express.Router();

// Rotas públicas para utilização dos usuários
route.post('/register', (req, res) => {
    try {
        bcrypt.hash(req.body.password, serverConfig.salt, (error, result) => {
            // Caso aconteça um erro na criptografia, print do erro
            if (error) throw `Ocorreu um erro ao cryptografar a senha -> ${error}`;

            // Substituindo a senha para o valor criptografado
            req.body.password = result;
            req.body.apikey = uuid4();

            // Criando a classe do usuário baseado no Schema construído
            const model = new usuario(req.body);

            // Executando o comando de save
            model.save().then((result) => {
                return res.status(201).send({output: "Cadastro foi realizado com sucesso", payload: result})
            }).catch((error) => {
                return res.status(500).send({error});
            });
        });
    } catch (error) {
        return res.status(500).send({error: true});
    }
});

// Rotas privadas que necessitam de credenciais válidas
route.get('/', verificaToken, (req, res) => {
    User.find((error, users) => {
        if (error) res.status(500).send({error});
        res.status(200).send({users});
    }).select('-password');
});

route.post('/update-password', verificaToken, (req, res) => {
    User.findOne({apikey: req.data.apikey}, (error, user) => {
        if (error) res.status(500).send({error});
        if (!user) res.status(400).send({error: 'Não foi encontrado'});
        bcrypt.compare(req.body.password, user.password, (error, same) => {
            if (!same) res.status(403).send({error: 'Credenciais estão inválidas'});
            bcrypt.hash(req.body.newPassword, serverConfig.salt, (error, result) => {
                User.findByIdAndUpdate(user._id, {password: result}, {new: false}, (error, user) => {
                    if (error) res.status(500).send({error});
                    res.status(200).send({success: true});
                });
            });
        });
    });
});


module.exports = route;
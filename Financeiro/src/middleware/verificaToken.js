const jwt = require("jsonwebtoken");

const servidor = require("../config/servidor");
const serverConfig = require("../config/servidor");


module.exports = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).send({error: `Acesso negado`});

    jwt.verify(token, serverConfig.jwt_secret, (error, result) => {
        if (error) return res.status(401).send({error});
        req.data = {
            _id: result.id, apikey: result.apikey,
        }
        next();
    });
}

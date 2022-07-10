const jwt = require("jsonwebtoken");
const serverConfig =require("../config/servidor");


module.exports = (id, apikey) => jwt.sign({
    id, apikey
}, serverConfig.jwt_secret, {
    expiresIn: serverConfig.jwt_expires,
});
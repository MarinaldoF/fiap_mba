const mongoose = require("mongoose")

module.exports = {
    port: 11901, jwt_secret: "#V$Code%", jwt_expires: "2d", salt: 10, connect: () => {
        const db_path = "mongodb+srv://naldo:abc123321@cluster0.juk7d.mongodb.net/db_users?retryWrites=true&w=majority"
        mongoose.connect(db_path, {
            useNewUrlParser: true, useUnifiedTopology: true
        }, () => console.log('[MS_USERS] Banco conectado'));
    },
}

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cfg = require("./config/servidor");
// const notfound = require("./middleware/notfound");
const routeusuario = require("./routes/usuario");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

cfg.connect();

app.use("/usuarios",routeusuario);
// app.use(notfound);


app.listen(3001, () =>
  console.log(`Servidor on-line. em http://localhost:3001`)
);

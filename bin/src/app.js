const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require('./mongooseConnection')
const router = require('./router/router')

const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(cors());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {console.log(`Server started on http://localhost:${PORT}`)})

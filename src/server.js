const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/connectDB');
const route = require('./routes/index');
const cors = require('cors');
require('dotenv').config();

const app = express();

//config app
app.use(cors());
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);
connectDB();

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

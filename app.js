const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');

const app = express();

//renderowanie
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

//instancja aplikacji - formularze
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//instalacja ciasteczek
app.use(cookieParser());

app.use(flash());
//obsługuj wszystkie zapytania od /
app.use('/',routes);

module.exports = app;



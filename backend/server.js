// importer le package de NODE JS
const http = require('http');

//importer l'application APP.JS
const app = require('./app');

// importer le package pour utiliser les variables d'environnements
const dotenv = require('dotenv');

// configuration dotenv
require('dotenv').config()



app.set('port', process.env.PORT);
const server = http.createServer(app);

server.listen(process.env.PORT);

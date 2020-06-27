const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const config = require('./config/env.config')[process.env.NODE_ENV || 'development'];

const app = express();
app.disable('x-powered-by');
app.configdb = config;
cors({ credentials: true, origin: true });
app.use(cors());
app.use(express.json());
app.use(expressValidator());

app.locals.title = "Cliente";
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use('/', require('./server/index'));

//após tentar casar todas as rotas a ultima rota que sobrou é not found
app.get('*', (req, res) => {
  res.status(404).send('<html><head><style>body {font-family: Helvetica, Arial, Sans-Serif;margin-top: 5em;}h1 {font-size: 3em;}h2 {font-size: 2em}</style></head></body><center><h1>Página não encontrada (Not Found)</h1><h2>(╯°□°）╯︵ ┻━┻</h2><br>O endereço solicitado não foi encontrado nesse servidor.<br>Verifique o url e tente novamente<br><h2>Erro: 404</h2></center></body></html>');
});

module.exports = app;
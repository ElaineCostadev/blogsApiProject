const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const errorMiddleware = require('./errors/errorMiddleware');
// ...

const app = express();

app.use(express.json());

app.use('/login', routes.loginRoute);

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

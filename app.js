require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ErrorsHandlerMiddleware = require('./middlewares/Errors.Middleware');
const db = require('./db');

const { PORT } = require('./config');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

db.getConnection();

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.use(ErrorsHandlerMiddleware.notFoundHandler);
app.use(ErrorsHandlerMiddleware.errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Started application successfully ${server.address().port}`);
});
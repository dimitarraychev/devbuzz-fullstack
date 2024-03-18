const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env')});

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const configExpress = require('./config/configExpress');

const app = express();
const port = process.env.PORT;

configExpress(app);

app.use(routes);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('DB Connected');

        app.listen(port, () => console.log(`App is listening on http://127.0.0.1:${port}...`));
    }).catch((err) => console.log('Error when attempting connection to DB'));

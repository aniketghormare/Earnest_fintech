
require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 8900;
const cors=require("cors")

app.use(bodyParser.json());
app.use(cors())
app.use(routes);


db.raw('SELECT 1')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error.message);
        process.exit(1); // Exit the process if unable to connect to the database
    });



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {itemsRouter} from "./items/items.router";
import mysql from 'mysql';
// import {dbConfig} from "./items/config/database";
import * as MySQLConnector from "./items/utils/mysql.connector";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());

app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

import bodyParser, { BodyParser } from "body-parser" ;
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json()); // -> 설정 안하면 post로 데이터 입력시 빈값으로 받게됨 !

// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '1234',0
//     database : 'my_db'
// });


//
// const connection = mysql.createConnection(dbConfig);
//
// connection.connect();
//
// connection.query('SELECT * from baseItem', (error, rows, fields) => {
//     if (error) throw error;
//     console.log('baseItem info is: ', rows);
// });
//
// connection.end();

// create database pool
MySQLConnector.init();

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
app.use("/api/menu/items", itemsRouter);


/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});



/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
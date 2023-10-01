
require('dotenv').config();


// export const DATA_SOURCES = {
//     mySqlDataSource: {
//         DB_HOST: '127.0.0.1',
//         DB_USER: 'root',
//         DB_PASSWORD: '----',
//         DB_PORT: 3306,
//         DB_DATABASE: '-----',
//         DB_CONNECTION_LIMIT: 4,
//     }
// };

export const DATA_SOURCES = {
    mySqlDataSource: {
        DB_HOST: process.env.MY_SQL_DB_HOST,
        DB_USER: process.env.MY_SQL_DB_USER,
        DB_PASSWORD: process.env.MY_SQL_DB_PASSWORD,
        DB_PORT: process.env.MY_SQL_DB_PORT,
        DB_DATABASE: process.env.MY_SQL_DB_DATABASE,
        DB_CONNECTION_LIMIT: process.env.MY_SQL_DB_CONNECTION_LIMIT,
    }
};





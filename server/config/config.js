require('dotenv').config();

module.exports = {
    environment: process.env.NODE_ENV || 'development',

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8mb4',
        connectionLimit: 100
    },

    port: process.env.PORT || 3000,

    corsOptions : {
        origin: '*',
        methods: ['GET', 'POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization','ngrok-skip-browser-warning','User-Agent'],
        credentials: true,
    }
};

module.exports = {
    HOST: 'localhost:8080',
    USER: 'root',
    PASSWORD: 'yogirajDB',
    DB: 'mean_authentication_authorization',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

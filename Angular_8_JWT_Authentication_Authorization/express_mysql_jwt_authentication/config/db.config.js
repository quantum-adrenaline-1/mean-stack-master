/**
 * This module defines config object (like database.properties) having just the database configuration as a modular JavaScript module
 * and exported to be used at the data access layer
 */

module.exports = {
    HOST: 'localhost',
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

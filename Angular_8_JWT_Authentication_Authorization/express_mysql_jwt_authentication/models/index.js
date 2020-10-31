/**
 * This module defines the Sequelize class instance detailed with the model entities and it's ORM so that database transaction can be done easily with the
 * inbuilt database trasaction functions by the ORM library module Sequelize 
 */
const config = require('../config/db.config');
const Sequelize = require('sequelize');

/* This constructed Sequelize object from db.config.js is used to implement ORM in the respective modules for the entity models */
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

/**
 * This db object will contain information about -
 * 1. all the database and all database configuration implemented in db.config.js
 * 2. all the models and their ORM in models/
 * 3. the relationship between the models (implemented in this module)
 * 4. this module acts like the frontier for all the models in the application in the 'models' package
 */
const db = {};

/* referencing Sequelize class using attribute through object db */
db.Sequelize = Sequelize;

/* referencing Sequelize class object defined above in this module using attribute through the object db */
db.sequelize = sequelize;

/**
 * Importing the model and it's ORM config from the entity model modules
 */
db.user = require('../models/user.module')(sequelize, Sequelize);
db.role = require('../models/role.model')(sequelize, Sequelize);

/* Defining the relationship between the model entities */
db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignkey: 'roleId',
    otherKey: 'userId'
});

/* Defining the relationship between the model entities */
db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignkey: 'userId',
    otherKey: 'roleId'
});

/* Defining the role names in collection */
db.ROLES = ['user', 'admin', 'moderator'];

/* Exporting the object having entire information about database and it's configuration, the application model entities and their ORM configuration */
module.exports = db;

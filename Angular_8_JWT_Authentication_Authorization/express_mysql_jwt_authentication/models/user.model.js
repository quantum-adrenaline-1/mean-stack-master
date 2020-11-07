/**
 * This module is ment to define and implement ORM.
 * 'sequelize' --> onject of class Sequelize that is constructed with all the database config from db.config.js such as dialect, db name, host, credentials and pool config
 * 'Sequelize' --> has all the SQL datatypes a column must possess
 * 
 * define(1st_argument, 2nd_argument) -
 * 1st_argument -- string literal which is the name of the table
 * 2nd_argument -- Object constructed of the model type which has all the attributes of the model as a column of the entity table and it's SQL datatype defined
 * 
 * The constructed entity table record is returned in the end
 * 
 * So, this module just returns the constructed record of the entity table
 * 
 * @param {username} sequelize 
 * @param {email} Sequelize
 * @param {password} Sequelize 
 */

/**
 * Here the entity model is defined along with the entity table in the database and the mapping of model fields with table columns
 * 
 * This module exports the config object of entity model 'role' and it's ORM using a function 
 */
module.exports = (sequelize, Sequelize) => {
                    const User = sequelize.define('users', {
                        username: {
                            type: Sequelize.STRING
                        },
                        email: {
                            type: Sequelize.STRING
                        },
                        password: {
                            type: Sequelize.STRING
                        }
                    });

                    return User;
                };

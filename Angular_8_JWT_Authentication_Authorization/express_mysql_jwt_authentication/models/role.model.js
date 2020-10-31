/**
 * This ORM arrangement is used to define mapping between table and the entity class with the datatypes
 * 
 * The primary key is defined for this entity of type INTEGER
 * 
 * The model involved is 'roles'
 * 
 * The constructed 'Roles' object is returned by the end of the module
 * 
 * @param {id} sequelize 
 * @param {name} Sequelize 
 */

/**
 * Here the entity model is defined along with the entity table in the database and the mapping of model fields with table columns
 * 
 * This module exports the config object of entity model 'role' and it's ORM using a function 
 */
module.exports = (sequelize, Sequelize) => {
                    const Role = sequelize.define('roles', {
                        id: {
                            type: Sequelize.INTEGER,
                            primaryKey: true
                        },
                        name: {
                            type: Sequelize.STRING
                        }
                    });

                    return Role;
                };

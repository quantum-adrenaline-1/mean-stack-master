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
                }

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

/* Use of 'exports' as multiple modules are exported from this single module */
/**
 * Controller for user registration
 */
exports.signup = (request, response) => {
                    
                    // Saving user in the database
                    User.create({
                        username: request.body.username,
                        email: request.body.email,
                        password: bcrypt.hashSync(request.body.password, 8)
                    })     /**
                                Here, user is configured to be created as per the data received from the request raised from front end
                                Also, there is Many-to-Many relationship between entities 'User' and 'Role'
                                So, on 'User' creation, 'Role' associated with it is also configured and created in the 'then' statement below         
                            */
                    .then(user => {
                        if (request.body.roles) {
                            Role.findAll({
                                where: {
                                    name: {
                                        [Op.or]: request.body.roles
                                    }
                                }
                            }).then(roles => {
                                user.setRoles(roles).then(() => response.send({message: "User has registered successfully!"}));
                            });
                        } else {
                            user.setRoles([1]).then(() => response.send({message: "User has registered successfully!"}));
                        }
                    })
                    .catch(error => response.status(500).send({message: error.message})
                    );
                };

/* Use of 'exports' as multiple modules are exported from this single module */
/**
 * Controller for user sign in 
 */
exports.signin = (request, response) => {
                    User.findOne({
                        where: {
                            username: request.body.username
                        }
                    })
                    .then(user => {
                        /* Checking if user is registered or not */
                        if (!user) {
                            return response.status(404).send({
                                message: "User Not Found!!"
                            });
                        }

                        /* Validation for user password as per the registered password for that user */
                        const passwordIsValid = bcrypt.compareSync(
                            request.body.password, user.password
                        );
                        if (!passwordIsValid) {
                            return response.status(401).send({
                                accessToken: null,
                                message: "Invalid Password!!"
                            });
                        }

                        /* Getting user access token to include in response */
                        const token = jwt.sign({id: user.id}, config.secret, {
                            expiresIn: 86400 // 86400 seconds = 24 hours
                        });

                        /* Getting user roles to include in response */
                        var authorities = [];
                        user.getRoles()
                            .then(roles => {
                                for (let i = 0; i < roles.length; i++) {
                                    authorities.push("ROLES_" + roles[i].name.toUpperCase());
                                }

                                response.status(200).send({
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    roles: authorities,
                                    accessToken: token
                                });
                            });
                    })
                    .catch(error => {
                        response.status(500).send({
                            message: error.message
                        });
                    });
                };

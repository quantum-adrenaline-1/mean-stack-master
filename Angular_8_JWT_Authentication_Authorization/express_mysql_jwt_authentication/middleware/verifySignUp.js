const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (request, response, next) => {
                                    // Username duplication check
                                    User.findOne({
                                        where: {
                                            username: request.body.username
                                        }
                                    }).then(user => {
                                        if (user) {
                                            response.status(400).send({
                                                message: "Failed! Username is already in use!"
                                            });
                                            return;
                                        }

                                        // Email duplication check
                                        User.findOne({
                                            where: {
                                                email: request.body.email
                                            }
                                        }).then(user => {
                                            if (user) {
                                                response.status(400).send({
                                                    message: "Failed! EmailId already exists!"
                                                });
                                                return;
                                            }

                                            next();
                                        });
                                    });
                                };


const checkRolesExisted = (request, response, next) => {
                            const requestRoles = request.body.roles;
                            if (requestRoles) {
                                for (let i = 0; i < requestRoles.length; i++) {
                                    if (! ROLES.includes(requestRoles[i])) {
                                        response.status(400).send({
                                            message: "Failed! Role does not exist -- " + requestRoles[i]
                                        });
                                        return;
                                    }
                                }
                            }

                            next();
                        };


const verifySignUp = {
                        checkDuplicateUsernameOrEmail,
                        checkRolesExisted
                    };

module.exports = verifySignUp;

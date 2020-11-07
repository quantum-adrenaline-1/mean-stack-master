/**
 * This middleware module is used to implement authentication and authorization
 * 
 * First it checks on whether the submitted token is correct or not
 * then it checks the role of the user to submit user details along with the request
 * 
 * This module exports all these details along with the verification and user details in a single JSON object
 */
const { request } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { user } = require('../models');
const db = require('../models');
const User = db.user;

/* Authentication */
const verifyToken = (request, response, next) => {
                        const token = request.headers["x-access-token"];
                        
                        if (!token) {
                            return response.status(403).send({
                                message: "No token provided!"
                            });
                        }

                        jwt.verify(token, config.secret,
                            (error, decoded) => {
                                if (error) {
                                    return response.status(401).send({
                                        message: "Unauthorized!"
                                    });
                                }
                                request.userId = decoded.id;
                                next();
                            }
                        );
                    };

/* Authorization */
const isAdmin = (request, response, next) => {
            User.findByPk(request.userId).then(
                user => {
                    user.getRoles().then(
                        roles => {
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "admin") {
                                    next();
                                    return;
                                }
                            }
                            response.status(403).send({
                                message: "Requires Admin Role!"
                            });
                            return;
                        }
                    );
                }
            );  
        };

/* Authorization */
const isModerator = (request, response, next) => {
                User.findByPk(request.userId).then(
                    user => {
                        user.getRoles().then(
                            roles => {
                                for (let i = 0; i < roles.length; i++) {
                                    if (roles[i].name === "moderator") {
                                        next();
                                        return;
                                    }
                                }
                                response.status(403).send({
                                    message: "Requires Moderator Role!"
                                });
                            }
                        );
                    }
                );            
            };

/* Authorization */
const isModeratorOrAdmin = (request, response, next) => {
                        User.findByPk(request.userId).then(
                            user => {
                                user.getRoles().then(
                                    roles => {
                                        for (let i = 0; i < roles.length; i++) {
                                            if (roles[i].name === "moderator") {
                                                next();
                                                return;
                                            }
                                            if (roles[i].name === "admin") {
                                                next();
                                                return;
                                            }
                                        }
                                        response.status(403).send({
                                            message: "Require Moderator or Admin Role!"
                                        });
                                    }
                                );
                            }
                        );                   
                    };

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
};

module.exports = authJwt;

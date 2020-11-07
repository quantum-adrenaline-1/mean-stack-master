const {verifySignUp} = require('../middleware');
const controller = require("../controllers/auth.controller");
const { request, response } = require('express');

module.exports = app => {
                    /** 
                     * Headers are constructed before sending HTTP response for authentication (signup and signin)
                     * After the Header are constructed, any of the requested authentication route is accessed using the next() function
                     */
                    app.use((request, response, next) => {
                        response.header(
                            "Access-Controll-Allow-Headers",
                            "x-access-token, Origin, Content-Type, Accept"
                        );
                        next();
                    });

                    /**  
                     * HTTP POST request for 'signup'
                     * The functions with business logic for 'sign up' are executed for this route 
                     */
                    app.post(
                        "/api/auth/signup",
                        [
                            verifySignUp.checkDuplicateUsernameOrEmail,
                            verifySignUp.checkRolesExisted
                        ],
                        controller.signup
                    );

                    /**
                     * The controller function with business logic for 'login' is executed for this route 
                     */
                    app.post("/api/auth/signin", controller.signin);
                }

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { request, response } = require("express");

module.exports = app => {
                    app.use((request, response, next) => {
                        response.header(
                            "Access-Controll-Allow-Headers",
                            "x-access-token, Content-Type, Accept, Origin"
                        );

                        next();
                    });

                    /**
                     * Test route which is available all time to access
                     * Most likely, use to check for server status if it is responding to the user requests or not
                     */
                    app.get("/api/test/all", controller.allAccess);

                    /**
                     * This is a priviledge access route for 'User' role
                     * A valid access token required
                     */
                    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

                    /**
                     * This is a priviledge access route for 'Moderator' role
                     * A valid access token required
                     */
                    app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

                    /**
                     * This is a priviledge access route for 'Admin' role
                     * A valid access token required
                     */
                    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
                };

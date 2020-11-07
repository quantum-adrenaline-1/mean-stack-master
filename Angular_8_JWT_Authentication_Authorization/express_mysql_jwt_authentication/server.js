/**
 * This is server.js, which is the main module of the back-end application
 * Importing the very first required dependencies for the application
 * (Referring the Express.js documentation), the CORS is configured asynchronously
 */


 /* 'express' is imported as the core framework library module, used to build the RES api */
const express = require('express');

/* 'body-parser' is imported to parse the request and build the request.body object */
const bodyParser = require('body-parser');

/* 'cors' is imported to configure the CORS policies for successful communication between the front-end and the back-end */
const cors = require('cors');



                        /////   -   ***   -   Done importing till here in application   -   ***   -   /////



/* Creating Server for the back-end application */
var app = express();

/* List of the allowed hosts */
const allowList = ['http://localhost:4200'];

/* CORS configuration and origin validation */
const corsOptionsDelegate = (request, callback) => {
                                let corsOptions = null;

                                if (allowList.indexOf(request.header('Origin')) !== -1)
                                    corsOptions = {origin: true}    /* Reflect (enable) the requested origin in the CORS response */
                                else
                                    corsOptions = {origin: false}   /* Disable CORS for this request */

                                /* callback() expects two arguments (error, options)
                                * Here, error = null and options = corsOptions
                                */
                                callback(null, corsOptions);
                            }

/* Parse request of content-type: application/json */
app.use(bodyParser.json());

/* Parse request of content-type: application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));


/* Any HTTP method called on application server object has the argument sequence as follows --
 * 1. Request End-point (URI)
 * 2. CORS configuration and origin validation
 * 3. Handler function
 */
app.get('/', cors(corsOptionsDelegate), 
            (request, response) => {
                response.json({ message: 'Hey, this is great, a Express server using Node.js after long time! are the changes loading?? :-/' })
            });


/* Set port and listen for request over it */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
                    console.log(`\nServer is listening on port ${PORT}!`);
                });

/**
 * Importing db object from index.js
 * It is probably like the default export from the 'models' package, so importing the 'models' package imports the 'db' object from index.js
 */
const db = require('./models');
const Role = db.role;

/* Drop and re-sync the role table in the database */
db.sequelize.sync({force: true}).then(
    () => {
        console.log('Drop and Resync DB');
        intial();
    }
);

/* This function helps create three records for the 'role' table in the database */
const intial = () => {
                Role.create({
                    id: 1,
                    name: 'user'
                });
                
                Role.create({
                    id: 2,
                    name: 'moderator'
                });

                Role.create({
                    id: 3,
                    name: 'admin'
                });
            };

/**
 * Importing all the routing functions from the 'routes' package in the server module
 */
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

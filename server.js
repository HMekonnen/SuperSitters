// Import Express
const express = require("express")


// Import MongoConfig
const mongoConfig = require("./config")

// Import Morgan
const morgan = require("morgan")

// Import router file
const routeCity = require("./routes/api/routeCity")



//Config
require("dotenv").config()

// Import Cors
const cors = require('cors');


//Create PORT
const PORT = process.env.PORT || 3000


//Initialize express
const server = express()

// Body Parser MiddleWare
server.use(express.json())

// For Forms
server.use(express.static('public'));

// Dev Morgan
server.use(morgan("dev"))

// Initialize cors
server.use(cors());

// Connect server.js w/ log routes file & Log Schema
server.use('/', routeCity);


// Homepage "welcome"
server.get('/',(req,res)=>{
    res.status(200).json({message: 'Welcome to Super Sitters!'});
})



// Listen at PORT
server.listen(PORT, ()=>{
    mongoConfig()
console.log(` Server is listening at port: ${PORT}`)
})

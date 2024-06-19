// 1. import all dependencies  
// - express, create app with express, .env (THIS IS NEW)
const express = require("express")
const mysql = require("mysql")
const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database:"aram_test"
})
require('dotenv').config();
const cors = require('cors')
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
const port = process.env.PORT;
// 4. import mongoose.config (after config is complete)
require("./configs/mongoose.config")

// 2. configure express with app.use
app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// 5. import routes (after routes are done -- may need to complete the models & the backbone of the controller first)
const UserRoutes = require("./routes/user.routes");
const MatchRoutes = require("./routes/match.routes");
MatchRoutes(app)
UserRoutes(app)
// 3. listen to the port at the end
app.listen(port, ()=>console.log(`Listening on port: ${port}`))
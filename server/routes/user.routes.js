// 1. import the controller
const UserController = require("../controllers/user.controller")

// 2. export a function that reads one argument (app)


const UserRoutes =  (app) =>{
    app.post("/api/register/player", UserController.regPlayer)
    app.post("/api/register/user", UserController.regUser)
    app.post("/api/earnings", UserController.addEarnings)
    app.get("/api/testing", UserController.apiTest)
    app.get("/api/players", UserController.allPlayer)
    app.get("/api/player/:id", UserController.onePlayer)
    app.get("/api/win/:id", UserController.onePlayerWin)
    app.get("/api/loss/:id", UserController.onePlayerLoss)
    app.post("/api/compare/player", UserController.comparePlayer)
    
    
}
// 3. include all the routes with the corresponding logic from controller
module.exports = UserRoutes
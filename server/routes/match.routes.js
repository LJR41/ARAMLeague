const MatchController = require("../controllers/match.controller")

const MatchRoutes =  (app) =>{
    app.post("/api/create/match", MatchController.regMatch)
    app.post("/api/add/players", MatchController.addPlayers)
    app.post("/api/data", MatchController.winnerData)
    app.post("/api/assign/bounty", MatchController.assignBounty)
    app.post("/api/pentakill", MatchController.newPenta)
    app.get("/api/get/match", MatchController.getMatch)
    app.get("/api/all/match", MatchController.matchHistory)
    app.get("/api/damage", MatchController.damageHistory)
    app.get("/api/view/penta", MatchController.getPenta)
    app.get("/api/random/bounty", MatchController.randomBounty)
    app.get("/api/get/bounty", MatchController.getBounty)
    


}

module.exports = MatchRoutes
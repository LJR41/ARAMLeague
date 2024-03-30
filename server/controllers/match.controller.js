const mysql = require("mysql")
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "aram_test"
})

// Example: 
module.exports.regMatch = (req, res) => {
    const query = "INSERT INTO matches (team_result) VALUES (?)"
    const values = req.body.teamResult
    db.query(query, [values], (err, data) =>  {
        if(err) return res.json(err);
        // test
        return res.json(data)
    })
}

module.exports.getMatch = (req,res) => {
    const query = "SELECT * FROM matches ORDER BY created_at DESC"
    db.query(query, (err, data) =>  {
        if(err) return res.json(err);
        return res.json(data)
    })
}

module.exports.addPlayers = (req,res) => {
    let allUser = [[req.body.latestMatch[0].id, req.body.matchWinner._id, req.body.matchWinner.winner_name, req.body.matchWinner.user_result ]]
    for (let i = 0; i < req.body.matchLoser.length; i++) {
        let tempArr = []
        if ('loser_name' in req.body.matchLoser[i]) {
            tempArr.push(req.body.latestMatch[0].id)
            tempArr.push(req.body.matchLoser[i]._id)
            tempArr.push(req.body.matchLoser[i].loser_name)
            tempArr.push(req.body.matchLoser[i].user_result)
            allUser.push(tempArr)
        }
    }
    const query = "INSERT INTO match_users (match_id, user_id, display_name, user_result) VALUES ?"
    const values = allUser
    db.query(query, [values], (err, data) =>  {
        if(err) return res.json(err);
        return res.json(data)
    })
}

module.exports.winnerData = (req,res) => {
    const query = "INSERT INTO winner_data (user_id, match_id, damage_dealt, champion_name) VALUES (?)"
    const values = [req.body.matchWinner._id, req.body.latestMatch[0].id,req.body.winnerDataDamage, req.body.winnerDataChampion]
    db.query(query, [values], (err, data) =>  {
        if(err) return res.json(err);
        return res.json(data)
    })
}

module.exports.matchHistory = (req,res) =>{
    const query = "SELECT * FROM matches INNER JOIN winner_data ON winner_data.match_id = matches.id INNER JOIN match_users ON match_users.match_id = matches.id WHERE user_result = 1 ORDER BY match_users.match_id ASC"
    db.query(query, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports.damageHistory = (req, res) =>{
    const query = "SELECT * FROM winner_data INNER JOIN users ON users._id = winner_data.user_id"
    db.query(query, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports.randomBounty = (req, res) => {
    const query = "SELECT * FROM bounty_champions"
    db.query(query, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports.assignBounty = (req, res) => {
    
    const query = "UPDATE current_bounty SET bounty_name = ? WHERE id = 1"
    const values = req.body.bounty_name
    console.log(values)
    db.query(query, values, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports.getBounty = (req, res) => {
    const query = "SELECT * FROM current_bounty"
    db.query(query, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports.newPenta = (req, res) => {
    const query = "INSERT INTO pentakills (display_name, user_id, match_id) VALUES (?)"
    const values = [req.body.display_name, req.body.id, req.body.latestMatch]
    db.query(query, [values], (err, data) =>  {
        if(err) return res.json(err);
        return res.json(data)
    })
}

module.exports.getPenta = (req,res) =>{
    const query = "SELECT * FROM pentakills"
    db.query(query, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
}


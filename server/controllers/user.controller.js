const mysql = require("mysql")
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database:"aram_test"
})

// 2. export all the functions with placeholder
module.exports.apiTest = (req, res)=>{
    res.json({message: "Hello from ARAMLeague"})
}

// Example: 
module.exports.regPlayer = (req, res)=>{
    const query = "INSERT INTO users (`first_name`, `last_name`,`display_name`) VALUES (?)"
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.display_name,
    ]

    db.query(query, [values], (err, data) =>  {
        if(err) return res.json(err);
        return res.json("User created")
    })

}

module.exports.allPlayer = (req,res) =>{
    const query = 'SELECT * FROM users'
    db.query(query, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports.addEarnings = (req,res) =>{
        let winnerData =  []
        for (let i = 0; i < req.body.matchLoser.length; i++) {
            let tempArr = []
            if ('loser_name' in req.body.matchLoser[i]) {
                tempArr.push(req.body.matchLoser[i]._id)
                tempArr.push(req.body.amountLost)
                tempArr.push(req.body.matchWinner._id)
                tempArr.push(req.body.latestMatch[0].id)
                winnerData.push(tempArr)
            }
        }
        const query = "INSERT INTO earnings ( loser_user_id, amount_owed, winner_user_id, match_id ) VALUES ?"
        const values = winnerData
        db.query(query, [values],(err,data)=>{
            if(err) return res.json(err)
            return res.json(data)
        })
    
}

module.exports.onePlayer= (req,res) => {
    const query = `SELECT * FROM users WHERE _id =  ${req.params.id}`
    db.query(query,(err,data)=>{
        if(err) console.log(res.json(err))
        return res.json(data)
    })
}

module.exports.onePlayerWin = (req,res) => {
    const winQuery = `SELECT * FROM earnings WHERE winner_user_id = ${req.params.id} `
    db.query(winQuery, (err,data)=>{
        if(err) console.log(res.json(err))
        return res.json(data)
    })
    
}

module.exports.onePlayerLoss = (req,res) => {
    const lossQuery = `SELECT * FROM earnings WHERE loser_user_id = ${req.params.id} `
    db.query(lossQuery, (err,data)=>{
        if(err) console.log(res.json(err))
        return res.json(data)
    })
    
}

module.exports.comparePlayer = (req,res) => {
    console.log(req.body)
    const query = `SELECT * FROM earnings INNER JOIN users ON earnings.loser_user_id=users._id WHERE winner_user_id = ${req.body.comparePlayer.viewPlayerId} && loser_user_id = ${req.body.comparePlayer.comparePlayerId}; `
    db.query(query, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports.regUser = (req, res) =>{
    console.log(req.body)
}

module.exports.addQuadra = (req,res) =>{
    let queryLength = req.body.quadraList.length
    for(let i = 0; i<= queryLength; i++){
        const query = `UPDATE users SET quadras = quadras +1 WHERE _id = ? `
        const values = req.body.quadraList[i]
        db.query(query, [values], (err,data) =>{
            if(err) return res.json(err)
            return res.json(data)
        })
    }
}
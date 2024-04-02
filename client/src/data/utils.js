import axios from "axios"
import { auth } from "../firebase"

export async function getEarningsData(id) {
    let userResponse = await axios.get(`http://localhost:8000/api/player/${id}`)
    let user_display_name = userResponse.data[0].display_name
    // console.log(user_display_name)
    let winResponse = await axios.get(`http://localhost:8000/api/win/${id}`)
    let winTotal = 0
    let matchesWon = []
    for (let i = 0; i < winResponse.data.length; i++) {
        let matchWinnings = winResponse.data[i].amount_owed
        if (!matchesWon.includes(winResponse.data[i].match_id)) {
            matchesWon.push(winResponse.data[i].match_id)
        }
        winTotal += matchWinnings
    }
    let lossResponse = await axios.get(`http://localhost:8000/api/loss/${id}`)
    let lossTotal = 0
    let matchesLost = []
    for (let i = 0; i < lossResponse.data.length; i++) {
        let matchLoss = lossResponse.data[i].amount_owed
        if (!matchesLost.includes(lossResponse.data[i].match_id)) {
            matchesLost.push(lossResponse.data[i].match_id)
        }
        lossTotal += matchLoss
    }

    return {
        display_name: user_display_name,
        wins: matchesWon.length,
        losses: matchesLost.length,
        earnings: winTotal - lossTotal
    }
}

export function seshCheck(){
    auth.onAuthStateChanged(user => {
    // if user is null, they are not logged in, navigate to login
    if(user == null){
        return false
    }
    else{
        return true
    }
})
}
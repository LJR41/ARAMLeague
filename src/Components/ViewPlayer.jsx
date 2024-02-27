import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const ViewPlayer = () => {
    const { id } = useParams()
    const [allUser, setAllUser] = useState()
    const [onePlayer, setOnePlayer] = useState()
    const [playerEarnings, setPlayerEarnings] = useState(0)
    const [playerWins, setPlayerWins] = useState(0)
    const [playerLoss, setPlayerLoss] = useState(0)
    const [comparePlayerEarnings, setComparePlayerEarnings] = useState(0)
    const [comparePlayerUser, setComparePlayerUser] = useState()

    useEffect(() => {
        async function getEarningsData(id) {
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
            setPlayerEarnings(winTotal - lossTotal)
            setPlayerWins(matchesWon.length)
            setPlayerLoss(matchesLost.length)
        }
        getEarningsData(id)

        axios.get('http://localhost:8000/api/players')
            .then(response => setAllUser(response.data))
            .catch(err => console.log(err))
        axios.get(`http://localhost:8000/api/player/${id}`)
            .then(response => setOnePlayer(response.data))
            .catch(err => console.log(err))
    }, [id])

    const handleEarningsBreakdown = async (e) => {
        
        
        let response = await axios.post('http://localhost:8000/api/compare/player', {comparePlayer:{viewPlayerId: onePlayer[0]._id, comparePlayerId: e.target.id}})
        let viewPlayerEarnings = 0
        console.log(response)
        setComparePlayerUser(e.target.value)
        if(response.data.length > 0){
            
            for(let i = 0; i< response.data.length; i ++){
                viewPlayerEarnings += response.data[i].amount_owed
            }
        }

        let flippedResponse = await axios.post('http://localhost:8000/api/compare/player', {comparePlayer:{viewPlayerId: e.target.id, comparePlayerId: onePlayer[0]._id}})
        let comparePlayerEarnings = 0
        if(flippedResponse.data.length > 0){
            for(let i = 0; i< flippedResponse.data.length; i ++){
                comparePlayerEarnings += flippedResponse.data[i].amount_owed
            }
        }

        setComparePlayerEarnings(viewPlayerEarnings - comparePlayerEarnings)
    }

    return (
        <div class="d-flex justify-content-center">
            <div>
                {onePlayer && allUser ? <div class="card" >
                    <div class="card-body">
                        <h4 class="card-title fw-bold">{onePlayer[0].display_name}</h4>
                        <h5 class="card-subtitle mb-2 text-body-secondary  ">{onePlayer[0].first_name} {onePlayer[0].last_name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary fw-bold"> W - L  </h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary "> {playerWins} - {playerLoss}</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary "> <p class="text-decoration-underline fw-bold">Earnings</p> {playerEarnings > 0?  <p class="text-success">${playerEarnings}</p> : <p class="text-danger">-${playerEarnings * -1}</p>}</h6>
                        <p class="card-text">Select a Player to see earnings breakdown.</p>
                        <div>
                            <div>
                                <select name="loser_name" id="">
                                    <option value="" hidden>Select a Player</option>
                                    {allUser.map((eachUser, Idx) => {
                                        return (
                                            eachUser.display_name == onePlayer[0].display_name ? <option value={eachUser.display_name} id={eachUser._id} disabled >{eachUser.display_name}</option> :
                                                <option value={eachUser.display_name} id={eachUser._id} onClick={handleEarningsBreakdown}>{eachUser.display_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="mt-4">{comparePlayerEarnings? <div>{comparePlayerEarnings > 0? <div>{comparePlayerUser} owes {onePlayer[0].display_name} <div><p class="text-success">${comparePlayerEarnings}</p></div></div>:<div>{onePlayer[0].display_name} owes {comparePlayerUser} <div><p class="text-danger">${comparePlayerEarnings * -1}</p></div> </div>}</div>: <h6></h6>}</div>
                        </div>
                    </div>
                </div> : <div><h3>Loading...</h3></div>
                }

            </div>

        </div>
    )
}

export default ViewPlayer
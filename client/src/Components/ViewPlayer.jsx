import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getEarningsData } from '../data/utils'

const ViewPlayer = () => {
    const { id } = useParams()
    const [allUser, setAllUser] = useState()
    const [onePlayer, setOnePlayer] = useState()
    const [playerData, setPlayerData] = useState({
        earnings: 0,
        wins: 0,
        losses: 0
    })
    const [comparePlayerEarnings, setComparePlayerEarnings] = useState(0)
    const [comparePlayerUser, setComparePlayerUser] = useState()
    const [earningsData, setEarningsData] = useState()

    useEffect(() => {
        getEarningsData(id)
            .then(data => setPlayerData({
                earnings: data.earnings,
                wins: data.wins,
                losses: data.losses
            }))
        axios.get('http://localhost:8000/api/players')
            .then(response => setAllUser(response.data))
            .catch(err => console.log(err))
        axios.get(`http://localhost:8000/api/player/${id}`)
            .then(response => setOnePlayer(response.data))
            .catch(err => console.log(err))
    }, [id])

    const handleEarningsBreakdown = async (e) => {
        // Send response to backend, finding games where viewPlayer has won and comparePlayer has lost
        let response = await axios.post('http://localhost:8000/api/compare/player', { comparePlayer: { viewPlayerId: onePlayer[0]._id, comparePlayerId: e.target.id } })
        let viewPlayerEarnings = 0
        // set compare player state here, because players with 0 wins will not pass if conditional on line 59
        setComparePlayerUser(e.target.value)
        if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
                viewPlayerEarnings += response.data[i].amount_owed
            }
        }

        // send response to backend, finding where comparePlayer has won and viewPlayer has lost
        let flippedResponse = await axios.post('http://localhost:8000/api/compare/player', { comparePlayer: { viewPlayerId: e.target.id, comparePlayerId: onePlayer[0]._id } })
        let comparePlayerEarnings = 0
        if (flippedResponse.data.length > 0) {
            for (let i = 0; i < flippedResponse.data.length; i++) {
                comparePlayerEarnings += flippedResponse.data[i].amount_owed
            }
        }

        // set earnings to viewPlayer earnings minus comparePlayer earnings
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
                        <h6 class="card-subtitle mb-2 text-body-secondary "> {playerData.wins} - {playerData.losses}</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary "> <p class="text-decoration-underline fw-bold">Earnings</p> {playerData.earnings > 0 ? <p class="text-success">${playerData.earnings}</p> : <p class="text-danger">-${playerData.earnings * -1}</p>}</h6>
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
                            <div class="mt-4">{comparePlayerEarnings ? <div>{comparePlayerEarnings > 0 ? <div>{comparePlayerUser} owes {onePlayer[0].display_name} <div><p class="text-success">${comparePlayerEarnings}</p></div></div> : <div>{onePlayer[0].display_name} owes {comparePlayerUser} <div><p class="text-danger">${comparePlayerEarnings * -1}</p></div> </div>}</div> : <h6></h6>}</div>
                        </div>
                    </div>
                </div> : <div><h3>Loading...</h3></div>
                }

            </div>

        </div>
    )
}

export default ViewPlayer
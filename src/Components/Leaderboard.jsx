import React, { useState, useEffect } from 'react'
import axios, { all } from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import MatchHistory from './MatchHistory'
import TopDamage from './TopDamage'
import PentaLeaders from './PentaLeaders'

const Leaderboard = () => {
    const { id } = useParams()
    const [allUser, setAllUser] = useState()
    const [leaderboardData, setLeaderboardData] = useState([{}])
    const [pentaLeaders, setPentaLeaders] = useState()

    useEffect(() => {
        async function getEarningsData(id) {
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


        axios.get('http://localhost:8000/api/players')
            .then(response => {
                let orderedData = []
                for (let i = 0; i < response.data.length; i++) {
                    getEarningsData(response.data[i]._id)
                        .then(res => {
                            // Push res object into our State array
                            setLeaderboardData(leaderboardData => [
                                ...leaderboardData, res
                            ])
                            // Sort our state
                            setLeaderboardData(leaderboardData => [
                                ...leaderboardData.sort(function(a, b) {return b.earnings - a.earnings})
                            ])
                        })
                        
                }
            })
            .catch(err => console.log(err))

    }, [])

    const pentaAmt = (pentaAmt) =>{
        console.log(pentaAmt)
        setPentaLeaders(pentaAmt)
    }
    return (
        <div class="row d-flex justify-content-center">
            <div class='col-4'>
                <div><h4 class="mt-3">Top Earners</h4></div>
                {leaderboardData ? <div class="mt-3"><table class="table table-sm table-secondary table-bordered" >
                    <thead>
                        <tr>
                            <th scope="col">Placement</th>
                            <th scope="col">Name</th>
                            <th scope="col">Earnings</th>
                            <th scope="col">Wins</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {leaderboardData.slice(1).map((eachUser, Idx) => {
                            return (
                                <tr>
                                    <th scope="row">{Idx + 1}</th>
                                    <td>{eachUser.display_name}</td>
                                    <td>{eachUser.earnings >= 0 ? <p class="text-success">${eachUser.earnings}</p> : <p class="text-danger">-${eachUser.earnings * -1}</p>}</td>
                                    <td>{eachUser.wins}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table></div> : <div>Loading....</div>}
            </div>
            <div class="d-flex justify-content-evenly"><TopDamage></TopDamage>
            <PentaLeaders pentaAmt ={pentaAmt}></PentaLeaders></div>
        </div>
    )
}

export default Leaderboard
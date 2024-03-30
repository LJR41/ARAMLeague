import React, { useState, useEffect } from 'react'
import axios, { all } from 'axios'
import { getEarningsData } from '../data/utils'

let renderCount = 0

const Leaderboard = () => {
    renderCount++
    const [leaderboardData, setLeaderboardData] = useState([{}])

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(response => {
                console.log(response)
                let orderedData = []
                for (let i = 0; i < response.data.length; i++) {
                    getEarningsData(response.data[i]._id)
                        .then(res => {
                            
                            // Push res object into our State array
                            setLeaderboardData(leaderboardData => [
                                ...leaderboardData, res
                            ])
                            // // Sort our state
                            setLeaderboardData(leaderboardData => [
                                ...leaderboardData.sort(function(a, b) {return b.earnings - a.earnings})
                            ])
                        })
                        
                }
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div class="row d-flex justify-content-center">
            <div class='col-4'>
                <div><h4 class="mt-3">Top Earners({renderCount})</h4></div>
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
        </div>
    )
}

export default Leaderboard
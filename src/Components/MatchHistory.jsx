import React, { useState, useEffect } from 'react'
import axios, { all } from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const MatchHistory = () => {
    const [allMatches, setAllMatches] = useState()
    useEffect(() => {

        axios.get('http://localhost:8000/api/all/match')
            .then(response => {
                console.log(response.data)
                setAllMatches(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div class="mt-4">
                {allMatches ?
                    <table class="table table-sm table-secondary table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Match #</th>
                                <th scope="col">Winner</th>
                                <th scope="col">Champion</th>
                                <th scope="col">Damage Dealt</th>
                                <th scope="col">Team Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMatches.map((eachMatch, Idx) =>{
                                return(
                                    <tr>
                                <th scope="row">{eachMatch.match_id}</th>
                                <td>{eachMatch.display_name}</td>
                                <td>{eachMatch.champion_name}</td>
                                <td>{eachMatch.damage_dealt}</td>
                                <td>{eachMatch.team_result == 0? <p>L</p> : <p>W</p>}</td>
                            </tr>
                                )
                            })}
                            
                        </tbody>
                    </table> : <div>Loading...</div>}
            </div>
        </div>
    )
}

export default MatchHistory
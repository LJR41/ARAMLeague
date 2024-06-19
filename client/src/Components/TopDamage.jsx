import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TopDamage = ({champName}) => {
    const [damageLeaderboard, setDamageLeaderboard] = useState([{}])

    useEffect(() => {
        axios.get('http://localhost:8000/api/damage/')
            .then(res => {
                setDamageLeaderboard(res.data.sort(function (a, b) { return b.damage_dealt - a.damage_dealt }))
            })
            .catch(err => console.log(err))

    }, [])

return (
    <div class="row d-flex justify-content-center">
        <div >
            <div><h4 class="mt-3">Top Single Game Damage</h4></div>
            <div>
                <table class="table table-sm table-secondary table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Placement</th>
                            <th scope="col">Name</th>
                            <th scope="col">Damage Dealt</th>
                            <th scope="col">Champion</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {
                            damageLeaderboard.slice(0,5).map((eachUser, Idx) => {
                                return (
                                    <tr>
                                        <th scope="row">{Idx +1}</th>
                                        <td>{eachUser.display_name === champName? '👑 ': ' '} {eachUser.display_name}</td>
                                        <td>{eachUser.damage_dealt}</td>
                                        <td>{eachUser.champion_name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)
}
export default TopDamage
import React from 'react'

const Matches = ({ matches, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
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
                {matches.map((eachMatch, Idx) => {
                    return (
                        <tr>
                            <th scope="row">{eachMatch.match_id}</th>
                            <td>{eachMatch.display_name}</td>
                            <td>{eachMatch.champion_name}</td>
                            <td>{eachMatch.damage_dealt}</td>
                            <td>{eachMatch.team_result == 0 ? <p>L</p> : <p>W</p>}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Matches
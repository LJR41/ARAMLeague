import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PentaLeaders = (props) => {
    const [pentaLeaders, setPentaLeaders] = useState()

    useEffect(() => {

        axios.get('http://localhost:8000/api/view/penta')
            .then(res => {
                let pentaLeaders = []
                for (const i of res.data) {
                    let tempObj = {}
                    tempObj.display_name = i.display_name
                    tempObj.penta_amt = 1
                    pentaLeaders.push(tempObj)
                }
                for (let i = 0; i <= pentaLeaders.length-1; i++) {
                    for (let j = i + 1; j <= pentaLeaders.length-1; j++) {
                        if (pentaLeaders[i].display_name === pentaLeaders[j].display_name) {
                            pentaLeaders.splice(j, 1)
                            pentaLeaders[i].penta_amt += 1
                            j -= 1
                        }
                    }
                }
                setPentaLeaders(pentaLeaders.sort(function (a, b) { return b.penta_amt - a.penta_amt }))
                props.pentaAmt(pentaLeaders)
            })

    }, [])

    return (
        <div ><div class="row d-flex justify-content-center">
            <div><h4 class="mt-3">Top Penta Killers</h4></div>
            {pentaLeaders ? <div class="mt-3"><table class="table table-sm table-secondary table-bordered" >
                <thead>
                    <tr>
                        <th scope="col">Placement</th>
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {pentaLeaders.map((eachUser, Idx) => {
                        return (
                            <tr>
                                <th scope="row">{Idx + 1}</th>
                                <td>{eachUser.display_name}</td>
                                <td>{eachUser.penta_amt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table></div> : <div>Loading....</div>}
        </div></div>
    )
}

export default PentaLeaders
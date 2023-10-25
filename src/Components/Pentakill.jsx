import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const Pentakill = (props) => {
    const [pentaKill, setPentakill] = useState(false)
    const [pentaKiller, setPentaKiller] = useState({
        penta_killer: "",
        id: null,
    })
    const [pentaLoser, setPentaLoser] = useState([{}])
    const [loserAmount, setLoserAmount] = useState([0, 1, 2, 3])

    const showPentakill = () => {
        if (!pentaKill) {
            setPentakill(true)
        }
        else {
            setPentakill(false)
        }
    }

    const handlePentaKiller = (e) => {
        setPentaKiller({
            penta_killer: e.target.value,
            id: e.target.id
        })
        setPentaLoser([{}])
    }

    const handlePentaLoser = (e) => {
        setPentaLoser([
            ...pentaLoser,
            { penta_loser: e.target.value, id: e.target.id }])
    }
    return (
        <div>
            <form action="">
                <div>
                    <div>
                        <h4>PentaKiller</h4>
                        <div>
                            <select name="penta_killer" id="">
                                <option value="" hidden>Select a Player</option>
                                {props.allUser.map((eachUser) => {
                                    return (
                                        <option value={eachUser.display_name} id={eachUser._id} onClick={handlePentaKiller}>{eachUser.display_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div class="mt-2">
                        <h4>PentaLosers</h4>
                        <div class="d-flex justify-content-center">
                            <table class="my-2">
                                <thead>
                                    <tr>
                                        <th scope="col-3">Display Name</th>
                                        <th scope="col">Amount Lost</th>
                                    </tr>
                                </thead>
                                {loserAmount.map((eachIdx) => {
                                    return (
                                        <tr scope="row">
                                            <td>
                                                <select name="penta_loser" id="">
                                                    <option value="" hidden>Select a Player</option>
                                                    {props.allUser.map((eachUser) => {
                                                        return (
                                                            !Object.values(pentaKiller).indexOf(eachUser.display_name) ? <option value={eachUser.display_name} id={eachUser._id} disabled >{eachUser.display_name}</option> :
                                                            <option value={eachUser.display_name} id={eachUser._id} onClick={handlePentaLoser}>{eachUser.display_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                            <td colspan="2"><p>$1</p> </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </form>

        </div>

    )
}

export default Pentakill
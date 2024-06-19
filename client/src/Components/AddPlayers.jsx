import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import Pentakill from './Pentakill'

const AddPlayers = () => {
    const [allUser, setAllUser] = useState([])
    const [latestMatch, setLatestMatch] = useState()
    const navigate = useNavigate()
    const [amountLost, setAmountLost] = useState(.5)
    const loserAmount = [0, 1, 2, 3]
    
    const [matchWinner, setMatchWinner] = useState({
        winner_name: "",
        _id: null,
        user_result: null
    })
    const [matchLoser, setMatchLoser] = useState([{}])
    const [loserList, setLoserList] = useState([])
    const [errors, setErrors] = useState({
    })
    const [winnerDataChampion, setWinnerDataChampion] = useState("")
    const [winnerDataDamage, setWinnerDataDamage] = useState()
    const [onFire, setOnFire] = useState(false)
    const [bounty, setBounty] = useState(false)
    const[pentaKill, setPentakill] = useState(false)
    const [pentaKiller, setPentaKiller] = useState()
    const [pentaLoser, setPentaLoser] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(response => setAllUser(response.data))
            .catch(err => console.log(err))
        axios.get('http://localhost:8000/api/get/match')
            .then(response => {
                setLatestMatch(response.data)
                if (response.data[0].team_result == 1) {
                    setAmountLost(1)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleWinner = (e) => {
        setMatchWinner({
            ...matchWinner,
            winner_name: e.target.value,
            _id: e.target.id,
            user_result: 1
        })
        setMatchLoser([])
    }

    const handleLoser = (e) => {
        setMatchLoser([
            ...matchLoser,
            { loser_name: e.target.value, _id: e.target.id, user_result: 0 }
        ])
        setLoserList([...loserList,e.target.value])
    }

    const handleChampion = (e) => {
        setWinnerDataChampion(e.target.value)
    }
    const handleDamage = (e) => {
        setWinnerDataDamage(e.target.value)
    }
    const handleFire = (e) => {
        if (!onFire) {
            setOnFire(true)
            setAmountLost(amountLost * 2)
        }
        else {
            setOnFire(false)
            setAmountLost(amountLost / 2)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/add/players', { latestMatch, matchWinner, matchLoser })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
        axios.post('http://localhost:8000/api/earnings', { latestMatch, amountLost, matchWinner, matchLoser })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
        axios.post('http://localhost:8000/api/data', { winnerDataChampion, winnerDataDamage, matchWinner, latestMatch })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/')
                }
            })
        if(pentaKill){
            axios.post('http://localhost:8000/api/earnings',{latestMatch, amountLost: 1, matchWinner: pentaKiller, matchLoser: pentaLoser})
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                }
            })
            axios.post('http://localhost:8000/api/pentakill',{latestMatch, display_name: pentaKiller.winner_name, id:pentaKiller._id})
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                }
            })
        }
    }
    const handleBounty = (e) => {
        if (!bounty) {
            setBounty(true)
            setAmountLost(amountLost + .5)
        }
        else {
            setBounty(false)
            setAmountLost(amountLost - .5)
        }
    }
    const showPentakill = () =>{
        if(!pentaKill){
            setPentakill(true)
        }
        else{
            setPentakill(false)
        }
    }
    const neededInfo = (pentaInfo)=>{
        setPentaKiller(pentaInfo.pentaKiller)
        setPentaLoser(pentaInfo.pentaLoser)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {allUser ?
                    <div>
                        <div class="my-3 d-inline justify-content-center align-items-center">
                            <h4 class="my-3">Winner</h4>
                            <div>
                                <select name="winner_name" id="">
                                    <option value="" hidden>Select a Player</option>
                                    {allUser.map((eachUser, Idx) => {
                                        return (
                                            <option value={eachUser.display_name} id={eachUser._id} onClick={handleWinner}>{eachUser.display_name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div class="d-flex justify-content-center">
                                <div class=" my-2 ">
                                    <div class="mx-2 my-1"><label htmlFor="champion">Champion</label></div>
                                    <label htmlFor="damage" class="mx-2 my-1" >Damage Dealt</label>
                                </div>
                                <div class="my-2">
                                    <div><input type="text" name="champion" onChange={handleChampion} /></div>
                                    <input type="number" name="damage" class="my-1" onChange={handleDamage} />
                                </div>

                            </div>
                            <div>
                                <div>
                                    <label htmlFor="onfire" class="mx-2">On Fire</label>
                                    <input type="checkbox" onChange={handleFire} name="onfire" />
                                </div>
                                <div>
                                    <label htmlFor="bounty" class="mx-2">Bounty Claimed</label>
                                    <input type="checkbox" name="bounty" value="1" onChange={handleBounty} class="mx-1" />
                                </div>
                                <div>
                                    <label htmlFor="pentakill"> Pentakill</label>
                                    <input type="checkbox" name="pentakill" value="0" onChange={showPentakill}></input>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2">
                            <h4>Losers</h4>
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
                                                    <select name="loser_name" id="">
                                                        <option value="" hidden>Select a Player</option>
                                                        {allUser.map((eachUser, Idx) => {
                                                            return (
                                                                !Object.values(matchWinner).indexOf(eachUser.display_name) || loserList.indexOf(eachUser.display_name) != -1 ? <option value={eachUser.display_name} id={eachUser._id} disabled >{eachUser.display_name}</option> :
                                                                    <option value={eachUser.display_name} id={eachUser._id} onClick={handleLoser}>{eachUser.display_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </td>
                                                <td colspan="2"><p>${amountLost}</p> </td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                            { pentaKill?<div class="row my-2"><Pentakill allUser={allUser} neededInfo={neededInfo}></Pentakill> </div>: null }
                        </div> </div> : <div> Loading </div>}
                <button type='submit' class="btn btn-primary"> Submit </button>
            </form>
        </div>
    )
}

export default AddPlayers
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'


const GetBounty = () =>{
    const [bounty, setBounty] = useState("")

    const handleBounty = (e) => {
        axios.get('http://localhost:8000/api/bounty')
            .then(res => {
                let randomInt = Math.floor(Math.random() * (res.data.length - 0))
                setBounty(res.data[randomInt].champion_name)

            })
        }
    return(
        <div>{bounty == ""? <a class="icon-link icon-link-hover" onClick={handleBounty}>
        Get Bounty
        <svg class="bi" aria-hidden="true"></svg>
        </a>  : <p onClick={handleBounty}> Bounty: {bounty}</p>}</div>
    )
}

export default GetBounty
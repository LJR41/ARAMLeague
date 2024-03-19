import React, { useState, useEffect } from 'react'
import axios from 'axios'


const GetBounty = () =>{
    const [bountyRefresh, setBountyRefresh] = useState(0)
    const [currentBounty, setCurrentBounty] = useState("")

    useEffect(()=>{
        axios.get('http://localhost:8000/api/get/bounty')
            .then(res =>{
                setCurrentBounty(res.data[0])
            })
        
    },[bountyRefresh])

    const handleBounty = (e) => {
        axios.get('http://localhost:8000/api/random/bounty')
            .then(res => {
                let bountyNames = []
                for(let i = 0; i < 3; i++){
                    let randomInt = Math.floor(Math.random() * (res.data.length - 0))
                    if(i < 2){
                        bountyNames.push(res.data[randomInt].champion_name + ", ")
                    }
                    else{
                        bountyNames.push(res.data[randomInt].champion_name)
                    }
                    
                }
                return bountyNames.join('')
                
            })
            .then( res =>
                axios.post('http://localhost:8000/api/assign/bounty', {bounty_name : res })
            )
            .then(
                res => {
                    if(res.status = 200){
                        setBountyRefresh( bountyRefresh + 1)
                    }
                    else{
                        console.log(res)
                    }
                }
            )
        
        
        }
    return(
        <div>
            <a onClick={handleBounty} class="text-info link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover " href="javascript:void(0)" > Bounty: {currentBounty.bounty_name} </a>
        </div>
    )
}

export default GetBounty
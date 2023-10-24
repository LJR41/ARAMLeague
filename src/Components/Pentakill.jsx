import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const Pentakill = (props) =>{
    const[pentaKill, setPentakill] = useState(false)

    const showPentakill = () =>{
        if(!pentaKill){
            setPentakill(true)
        }
        else{
            setPentakill(false)
        }
    }
    return(
        <div>
            <p>Its Working</p>
        </div>
        
    )
}

export default Pentakill
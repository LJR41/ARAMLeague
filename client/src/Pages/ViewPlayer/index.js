import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ViewPlayer from '../../Components/ViewPlayer'
import { seshCheck } from '../../data/utils'

const PlayerInfo = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // check if user is logged in
        if (seshCheck() == false) {
            navigate('/')
        }
    }, [])
    return (
        <div><ViewPlayer /></div>
    )
}

export default PlayerInfo
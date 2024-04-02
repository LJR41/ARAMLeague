import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchHistory from '../../Components/MatchHistory'
import { seshCheck } from '../../data/utils'

const History = () => {
  const navigate = useNavigate()
  useEffect(() => {
    // check if user is logged in
    if (seshCheck() == false) {
      navigate('/')
    }
  }, [])
  return (
    <div><MatchHistory /></div>
  )
}

export default History
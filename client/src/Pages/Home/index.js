import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Leaderboard from '../../Components/Leaderboard'
import TopDamage from '../../Components/TopDamage'
import PentaLeaders from '../../Components/PentaLeaders'
import { seshCheck } from '../../data/utils'


const HomePage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    // check if user is logged in
    if (seshCheck() == false) {
      navigate('/')
    }
  }, [])

  const [pentaLeaders, setPentaLeaders] = useState()
  const pentaAmt = (pentaAmt) => {
    setPentaLeaders(pentaAmt)
  }

  return (
    <div>
      <div>
        <Leaderboard />
      </div>
      <div class="d-flex justify-content-evenly">
        <TopDamage />
        <PentaLeaders pentaAmt={pentaAmt} />
      </div>
    </div>
  )
}

export default HomePage
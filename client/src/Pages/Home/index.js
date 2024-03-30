import React, { useState, useEffect } from 'react'
import Leaderboard from '../../Components/Leaderboard'
import TopDamage from '../../Components/TopDamage'
import PentaLeaders from '../../Components/PentaLeaders'

const HomePage = () => {
  const [pentaLeaders, setPentaLeaders] = useState()
  const pentaAmt = (pentaAmt) => {
    setPentaLeaders(pentaAmt)
  }

  return (
    <div>
      <div>
        <Leaderboard/>
      </div>
      <div class="d-flex justify-content-evenly">
        <TopDamage/>
        <PentaLeaders pentaAmt={pentaAmt}/>
      </div>
    </div>
  )
}

export default HomePage
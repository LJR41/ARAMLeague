import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Leaderboard from '../../Components/Leaderboard'
import TopDamage from '../../Components/TopDamage'
import PentaLeaders from '../../Components/PentaLeaders'
import { QuadraLeaders } from '../../Components/QuadraLeaders'


const HomePage = (props) => {
  const championName = 'Higgs0'
  const navigate = useNavigate()
  useEffect(() => {
    // check if user is logged in
    // if (seshCheck() == false) {
    //   navigate('/')
    // }
  }, [])
  const [pentaLeaders, setPentaLeaders] = useState()
  const pentaAmt = (pentaAmt) => {
    setPentaLeaders(pentaAmt)
  }

  // comment to update hehe
  // comment again to update hehe
  // hehe
  // he
  // h
  // e
  // h
  // e
  // h
  // e
  // h
  // e
  // h
  // e
  // h
  // e
  // h
  // e
  // h 
  // e
  // h
  // e
  // h
  return (
    <div>
      <div>
        <Leaderboard champName={championName}/>
      </div>
      <div class="d-flex justify-content-evenly">
        <TopDamage champName={championName}/>
        <PentaLeaders pentaAmt={pentaAmt} champName={championName} />
        <QuadraLeaders champName={championName}/>
      </div>
    </div>
  )
}

export default HomePage
import React from 'react'
import LoginForm from '../../Components/LoginForm'
import certificate from '../Login/certificate.jpeg'


const LoginPage = () => {
   
  return (
    <div>
        <div><LoginForm/></div>
        <div class="container-sm"><img class="img-thumbnail" src={certificate} alt="" /></div>
        
    </div>
  )
}

export default LoginPage
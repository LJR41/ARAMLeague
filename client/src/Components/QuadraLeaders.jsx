import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const QuadraLeaders = ({champName}) => {
    const [quadraLeaders, setQuadraLeaders] = useState()

    useEffect(()=>{
      axios.get('http://localhost:8000/api/players')
            .then(response => {
              let quadLeaders = []
              for( const i of response.data){
                let tempObj = {}
                tempObj.display_name = i.display_name
                tempObj.quad_amt = i.quadras
                quadLeaders.push(tempObj)
              }
              setQuadraLeaders(quadLeaders.sort(function(a,b){return b.quad_amt - a.quad_amt}))
            })
            .catch(err => console.log(err))
    },[])


  return (
    <div><div class="row d-flex justify-content-center">
    <div><h4 class="mt-3">Top Quadra Killers</h4></div>
    {quadraLeaders ? <div class="mt-3"><table class="table table-sm table-secondary table-bordered" >
        <thead>
            <tr>
                <th scope="col">Placement</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            {quadraLeaders.map((eachUser, Idx) => {
                return (
                    <tr>
                        <th scope="row">{Idx + 1}</th>
                        <td>{eachUser.display_name === champName? '👑 ': ' '} {eachUser.display_name} </td>
                        <td>{eachUser.quad_amt}</td>
                    </tr>
                )
            })}
        </tbody>
    </table></div> : <div>Loading....</div>}
</div></div>
  )
}

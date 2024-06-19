import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const Quadra = () => {
  const navigate = useNavigate()
  const [allUser, setAllUser] = useState()
  const [quadraList, setQuadraList] = useState([])
  const playerAmount = [0, 1, 2, 3, 4]
  useEffect(() => {
    axios.get('http://localhost:8000/api/players')
      .then(response => setAllUser(response.data))
      .catch(err => console.log(err))

  }, [])

  const addQuadraUser = (e) =>{
    setQuadraList([...quadraList, e.target.id])
  }

  const handleQuadra = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/quadra/add', {quadraList})
      .then(res => {
        if (res.data.errors) {
            console.log(res.data.errors)
        } else {
            navigate('/')
        }
  })
  .catch(err => {
    console.log(err)
})
  }
  return (
    <div>
      <form onSubmit={handleQuadra}>
        {allUser ?
          <div>
            <div class="my-3 d-inline justify-content-center align-items-center">
              <h4 class="my-3">Add Quadras</h4>
              <div class="d-flex justify-content-center">
                <table>
                  {playerAmount.map((eachIdx) => {
                    return (
                      <tr scope='row'>
                        <td>
                          <select name="winner_name" id="">

                            <option value="" hidden>Select a Player</option>
                            {allUser.map((eachUser, Idx) => {
                              return (
                                <option value={eachUser.display_name} id={eachUser._id} onClick={addQuadraUser} >{eachUser.display_name}</option>
                              )
                            })}
                          </select>
                        </td>
                      </tr>

                    )
                  })}
                </table>

              </div>

            </div>
          </div> : <div> Loading </div>}
        <button type='submit' class="btn btn-primary"> Submit </button>
      </form>
    </div>
  )
}

export default Quadra
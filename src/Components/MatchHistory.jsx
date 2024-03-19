import React, { useState, useEffect } from 'react'
import axios, { all } from 'axios'
import Matches from './Matches'
import PaginateButtons from './PaginateButtons'

const MatchHistory = () => {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [matchesPerPage] = useState(10)

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true)
            const res = await axios.get('http://localhost:8000/api/all/match')
            setMatches(res.data)
            setLoading(false)
            
        }

        fetchMatches()

    }, [])

    console.log(matches)
    //Get current matches
    const indexOfLastMatch = currentPage * matchesPerPage
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
    const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch)

    //Change Page

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div class='row d-flex justify-content-center'>
            {matches ? <div class='col-4 my-4'>

                <Matches matches={currentMatches} loading={loading}></Matches>
                <div class='d-flex justify-content-center'>
                    <PaginateButtons matchesPerPage={matchesPerPage} totalMatches={matches.length} paginate={paginate}></PaginateButtons>
                </div>
            </div> : <h1>Loading....</h1>}
        </div>
    )
}

export default MatchHistory
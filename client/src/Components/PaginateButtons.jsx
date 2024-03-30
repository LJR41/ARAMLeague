import React from 'react'

const PaginateButtons = ({ matchesPerPage, totalMatches,paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalMatches / matchesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul class="pagination">
                {pageNumbers.map((number) => {
                    return (
                        <li key={number} class="page-item">
                            <a onClick={()=> paginate(number)} href="javascript:void(0)" class="page-link"> {number}</a>
                        </li>
                    )
                })}

            </ul>
        </nav>
    )
}

export default PaginateButtons
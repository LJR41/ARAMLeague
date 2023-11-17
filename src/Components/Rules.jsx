import React from 'react'

const Rules = () => {
    return (
        <div class="row d-flex justify-content-center "><div class="col-6">
            <h2>ARAM League Rules</h2>
            <ul class="list-group list-group">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Winning a match</div>
                        <p>Player who deals the most damage is the winner.</p>
                    </div>
                    <span class="badge bg-primary rounded-pill"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Match Payouts</div>
                        <p>If the team wins the match, the winning player earns $1 from every player in the lobby.</p>
                        <p>If the team loses the match, the winning player earns 50c from every player in the lobby.</p>
                    </div>
                    <span class="badge bg-primary rounded-pill"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Subheading</div>
                        Content for list item
                    </div>
                    <span class="badge bg-primary rounded-pill"></span>
                </li>
            </ul>
        </div></div>
    )
}

export default Rules
import React, { useState, useRef, useEffect } from 'react'

const SeasonCountdown = () => {
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 21, 2024 22:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
    return (
        <div >
            {/* <h2>{timer}</h2> */}
            <div class="d-flex justify-content-center">
                <p class="mx-2 fw-bold text-primary-emphasis">Playoffs Ends: </p>
                <p id="timer" class="text-warning-emphasis"></p>
            </div>
            {/* <button onClick={onClickReset}>Reset</button> */}
        </div>
    )

}

export default SeasonCountdown
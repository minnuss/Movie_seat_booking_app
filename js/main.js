const seatContainer = document.querySelector('.seat-container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.querySelector('.count')
const total = document.querySelector('.total')
const movieSelect = document.getElementById('movie')

getDataFromLocalStorage()
// GET DATA FROM LOCAL STORAGE
function getDataFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    console.log(selectedSeats)

    // set selected class again to saved seats indexes
    selectedSeats.forEach(seatIdx => {
        seats[seatIdx].classList.add('selected')
    })

    // this code do the same like upper one, its from tutorial, i do not like it, to complicated to understand
    // if (selectedSeats !== null && selectedSeats.length > 0) {
    //     seats.forEach((seat, idx) => {
    //         if (selectedSeats.indexOf(idx) > -1) {
    //             seat.classList.add('selected')
    //         }
    //     })
    // }

    // get the count of selected seats from local storage
    const selectedSeatsCount = selectedSeats.length
    // get the selected movie index from list option
    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'))
    // get the selected movie price from list option
    const selectedMoviePrice = JSON.parse(localStorage.getItem('selectedMoviePrice'))

    movieSelect.selectedIndex = selectedMovieIndex
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * selectedMoviePrice
}

// GET THE VALUE OF SELECTED MOVIE and change it from string to number
let ticketPrice = +movieSelect.value
// console.log(ticketPrice)

// UPDATE SELECTED SEATS COUNT AND TOTAL
function updatedeSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    // copy selected seats into arr
    const seatsIndex = [...selectedSeats]
        .map(seat => {
            // checking for indexes of only available seats, that are not occupied
            return [...seats].indexOf(seat)
        })
    // console.log(seatsIndex)

    // put selected seats in local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length
    // console.log(selectedSeatsCount)

    // set the value of selected seats count
    count.innerText = selectedSeatsCount
    // set the value of total price of selected seats
    total.innerText = selectedSeatsCount * ticketPrice
}

// EVENT LISTENER ON SEATS
seatContainer.addEventListener('click', (e) => {
    // select only seats that are not occupied
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target)

        e.target.classList.toggle('selected')

        updatedeSelectedCount()
    }
})

// EVENT LISTENER ON MOVIE CHANGE
movieSelect.addEventListener('change', (e) => {
    // ticketPrice = +e.target.value
    ticketPrice = +movieSelect.value

    // GET CHANGES - INDEX OF SELECTED OPTION LIST AND A VALUE
    // console.log(movieSelect.selectedIndex, movieSelect.value)
    setMovieData(movieSelect.selectedIndex, movieSelect.value)

    updatedeSelectedCount()
})

// SAVE SELECTED MOVIE INDEX AND PRICE TO LOCAL STORAGE
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}
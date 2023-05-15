const container = document.querySelector(".container");
const count = document.getElementById('count');
const amount = document.getElementById("amount");
const select = document.getElementById('movie');
const seats = document.querySelectorAll(".seat:not(.reserved)")

let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
count.innerText = selectedSeatCount;
amount.innerText = 20 * selectedSeatCount;

getFromLocalStorage();
calculateTotal();

function getFromLocalStorage() {
    const selectedSeatIndex = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if (selectedSeatIndex != null && selectedSeatIndex.length>0) {
        seats.forEach(function(seat,index){
            if(selectedSeatIndex.indexOf(index)>-1){
                seat.classList.toggle('selected');
            }
        });
    }

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('rezerved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function (e) {
    calculateTotal();
});

function calculateTotal() {
    let selectedSeats = container.querySelectorAll(".seat.selected");
    const selectedSeatArray = [];
    const seatArray = [];
    selectedSeats.forEach(function (seat) {
        selectedSeatArray.push(seat);
    });

    seats.forEach(function (seat) {
        seatArray.push(seat);
    });

    selectedSeatsIndex = selectedSeatArray.map(function (seat) {
        return seatArray.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = select.value * selectedSeatCount;
    saveToLocalStorage(selectedSeatsIndex);
}

function saveToLocalStorage(selectedSeatsIndex) {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex)
}



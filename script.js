const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

const countdownElement = document.getElementById('countdown');
const coundownElementTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);

//Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date ().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day); 
        const hours = Math.floor((distance % day) / hour); 
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        //Hide inputContainer
        inputContainer.hidden = true;
        // If the countown has ended
        if (distance < 0 ) {
            countdownElement.hidden = true;
            clearInterval(countdownActive);
            completeElementInfo.textContent  = `${countdownTitle} finished on ${countdownDate}!`;
            completeElement.hidden = false; 
        } else {
            // Show countdown in progress
            coundownElementTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeElement.hidden = true;
            countdownElement.hidden = false;
        }
    }, second);
}

// Takes values from form input
function updateCountdown (e) {
    e.preventDefault();
    countdownTitle = e.target[0].value;
    countdownDate = e.target[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date before submiting');
    } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    }
}

// Reset button function
function reset () {
    //Hide Countdown/Complete and Show input form
    countdownElement.hidden = true;
    inputContainer.hidden = false;
    completeElement.hidden = true;
    // Stop the Time Event countdown funtion
    clearInterval(countdownActive);
    // Reset date and title
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    //Get the object out of the JSON.strigify if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownButton.addEventListener('click', reset);
completeButton.addEventListener('click', reset);

// On load check local storage
restorePreviousCountdown();
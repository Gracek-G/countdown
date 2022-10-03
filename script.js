const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

// Set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);
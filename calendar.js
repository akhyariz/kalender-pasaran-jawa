// Sample JavaScript for generating the calendar
function generateCalendar(month, year) {
  const calendarBody = document.getElementById('calendar-body');
  calendarBody.innerHTML = ''; // Clear previous calendar

  // Assume you have a function to get the days in a month and their Pasaran
  const daysInMonth = getDaysInMonth(month, year);

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (date <= daysInMonth.length) {
        const dateSpan = document.createElement('span');
        dateSpan.className = 'date';
        dateSpan.innerText = date;

        const pasaranSpan = document.createElement('span');
        pasaranSpan.className = 'pasaran';
        pasaranSpan.innerText = daysInMonth[date - 1].pasaran; // Assuming pasaran is part of your data

        cell.appendChild(dateSpan);
        cell.appendChild(document.createElement('br'));
        cell.appendChild(pasaranSpan);
        date++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

// Call generateCalendar with the current month and year to initialize
generateCalendar(new Date().getMonth(), new Date().getFullYear());

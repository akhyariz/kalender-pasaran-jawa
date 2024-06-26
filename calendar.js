document.addEventListener('DOMContentLoaded', function() {
  const pasaranDays = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');

  function getPasaran(date) {
    const baseDate = new Date(1900, 0, 1);
    const msInDay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.floor((date - baseDate) / msInDay);
    return pasaranDays[daysDifference % 5];
  }

  function createCalendar(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const calendarDiv = document.getElementById('calendar');
    let calendarHTML = '<table><tr>';
    const daysOfWeek = ['Ahd', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    daysOfWeek.forEach(day => calendarHTML += `<th>${day}</th>`);
    calendarHTML += '</tr><tr>';

    for (let i = 0; i < firstDay; i++) {
      calendarHTML += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const pasaran = getPasaran(date);
      calendarHTML += `<td>${day}<br>(${pasaran})</td>`;
      if ((day + firstDay) % 7 === 0) {
        calendarHTML += '</tr><tr>';
      }
    }

    calendarHTML += '</tr></table>';
    calendarDiv.innerHTML = calendarHTML;
  }

  function populateMonthSelect() {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                        "Juli", "Augustus", "September", "Oktober", "November", "Desember"];
    monthNames.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = month;
      monthSelect.appendChild(option);
    });
  }

  function populateYearSelect() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      yearSelect.appendChild(option);
    }
  }

  monthSelect.addEventListener('change', function() {
    createCalendar(yearSelect.value, monthSelect.value);
  });

  yearSelect.addEventListener('change', function() {
    createCalendar(yearSelect.value, monthSelect.value);
  });

  const today = new Date();
  populateMonthSelect();
  populateYearSelect();
  monthSelect.value = today.getMonth();
  yearSelect.value = today.getFullYear();
  createCalendar(today.getFullYear(), today.getMonth());
});

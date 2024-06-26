document.addEventListener("DOMContentLoaded", function () {
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");
  const calendarDiv = document.getElementById("calendar");

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Des ember"];
  const currentYear = new Date().getFullYear();
  const referenceDate = new Date(2024, 0, 2); // Fixed reference date (January 2, 2024)
  const referencePasaran = 0; // Pasaran for the reference date (Legi)

  // Populate month and year dropdowns
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = month;
    monthSelect.appendChild(option);
  });

  for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  }

  monthSelect.value = new Date().getMonth();
  yearSelect.value = currentYear;

  function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const pasaran = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"];
    let html = `<table class="table table-bordered">
                  <thead class="thead-light">
                    <tr>
                      <th class="text-danger">Ahad</th>
                      <th>Senin</th>
                      <th>Selasa</th>
                      <th>Rabu</th>
                      <th>Kamis</th>
                      <th>Jumat</th>
                      <th>Sabtu</th>
                    </tr>
                  </thead>
                  <tbody>`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
      html += "<tr>";
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          html += "<td></td>";
        } else if (date > daysInMonth) {
          break;
        } else {
          const currentDate = new Date(year, month, date);
          const daysDifference = Math.floor((currentDate - referenceDate) / (1000 * 60 * 60 * 24));
          const pasaranDay = pasaran[(referencePasaran + daysDifference) % 5];
          const cellClass = j === 0 ? 'class="text-danger"' : '';
          html += `<td ${cellClass}>${date}<br><small>${pasaranDay}</small></td>`;
          date++;
        }
      }
      html += "</tr>";
    }
    html += "</tbody></table>";

    calendarDiv.innerHTML = html;
  }

  monthSelect.addEventListener("change", () => {
    generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
  });

  yearSelect.addEventListener("change", () => {
    generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
  });

  generateCalendar(new Date().getMonth(), new Date().getFullYear());
});

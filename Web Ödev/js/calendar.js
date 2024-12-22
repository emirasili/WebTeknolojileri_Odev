let shifts = JSON.parse(localStorage.getItem('hospitalShifts')) || [];

document.getElementById('shift-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const dateInput = document.querySelector('input[type="text"][placeholder="Nöbet Tarihi"]');
    const departmentSelect = document.getElementById('department');
    const assistantSelect = document.getElementById('assistant');

    const departmentNames = ["Çocuk Acil", "Çocuk Yoğun Bakımı", "Çocuk Hematolojisi ve Onkolojisi"];
    const assistantNames = [
        "Emir Aşılı", "Kaan Uygun", "Hasan Turay", "Fikret Eralp", "Arslan İbrahimoğlu", "Ozan Ertürk", "Ela Altındağ", "Jülide Aydın", "Zeynep Öztürk", "Zenan Parlar",
        "Burak Kuzey", "Kader Denizhan", "Haldun Göksun", "Bilge Tuna", "Sevda Karasu"
    ];

    if (!dateInput.value || departmentSelect.value === "Bölüm Seç" || assistantSelect.value === "Asistan Seç") {
        alert('Lütfen tüm alanları doldurunuz.');
        return;
    }

    const department = departmentNames[parseInt(departmentSelect.value) - 1];
    const assistant = assistantNames[parseInt(assistantSelect.value) - 1];
    const shiftDate = dateInput.value;

    // Kural Kontrolleri
    const existingShifts = shifts.filter(shift => shift.date === shiftDate);

    // Aynı asistanın aynı gün başka bir bölümde nöbet tutmasını engelle
    if (existingShifts.some(shift => shift.assistant === assistant)) {
        alert(`${assistant}, ${shiftDate} tarihinde zaten bir nöbet tutuyor.`);
        return;
    }

    const newShift = {
        date: shiftDate,
        department: department,
        assistant: assistant
    };

    shifts.push(newShift);

    localStorage.setItem('hospitalShifts', JSON.stringify(shifts));

    renderCalendar();

    dateInput.value = '';
    departmentSelect.selectedIndex = 0;
    assistantSelect.selectedIndex = 0;
});

function renderCalendar() {
    if (shifts.length === 0) {
        generateEmptyCalendar();
        return;
    }

    const firstShiftDate = new Date(shifts[0].date);
    const year = firstShiftDate.getFullYear();
    const month = firstShiftDate.getMonth() + 1;

    const startDate = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = startDate.getDay();

    let calendarHTML = '';
    let currentDate = 1;

    for (let row = 0; row < 6; row++) {
        calendarHTML += '<tr>';
        for (let col = 0; col < 7; col++) {
            if (row === 0 && col < firstDayOfWeek) {
                calendarHTML += '<td></td>';
            } else if (currentDate > daysInMonth) {
                calendarHTML += '<td></td>';
            } else {
                const currentDateString = `${year}-${month.toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`;
                
                const shiftsForDate = shifts.filter(shift => shift.date === currentDateString);
                
                if (shiftsForDate.length > 0) {
                    calendarHTML += `
                        <td class="selected" data-date="${currentDateString}">
                            ${currentDate}
                            <div class="shift-info">
                                ${shiftsForDate.map(shift => `
                                    <div>
                                        <strong>${shift.department}</strong>: ${shift.assistant}
                                    </div>
                                `).join('')}
                            </div>
                        </td>
                    `;
                } else {
                    calendarHTML += `<td data-date="${currentDateString}">${currentDate}</td>`;
                }
                
                currentDate++;
            }
        }
        calendarHTML += '</tr>';
        
        if (currentDate > daysInMonth) break;
    }

    document.getElementById('calendar-body').innerHTML = calendarHTML;
}

function generateEmptyCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const startDate = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = startDate.getDay();

    let calendarHTML = '';
    let currentDate = 1;

    for (let row = 0; row < 6; row++) {
        calendarHTML += '<tr>';
        for (let col = 0; col < 7; col++) {
            if (row === 0 && col < firstDayOfWeek) {
                calendarHTML += '<td></td>';
            } else if (currentDate > daysInMonth) {
                calendarHTML += '<td></td>';
            } else {
                calendarHTML += `<td>${currentDate}</td>`;
                currentDate++;
            }
        }
        calendarHTML += '</tr>';
        
        if (currentDate > daysInMonth) break;
    }

    document.getElementById('calendar-body').innerHTML = calendarHTML;
}

function addClearButton() {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Tüm Nöbetleri Temizle';
    clearButton.classList.add('btn', 'btn-danger', 'mt-3');
    clearButton.style.marginLeft = '10px';
    clearButton.addEventListener('click', function() {
        localStorage.removeItem('hospitalShifts');
        shifts = [];
        renderCalendar();
    });

    const calendarDiv = document.getElementById('calendar');
    calendarDiv.appendChild(clearButton);
}

$(document).ready(function() {
    $('#date1').datetimepicker({
        format: 'YYYY-MM-DD',
        locale: 'tr'
    });

    renderCalendar();
    
    addClearButton();
});

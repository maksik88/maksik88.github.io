// Функция для отображения данных в таблице
function displayGrades() {
    const table = document.getElementById('gradeTable');
    table.innerHTML = '';

    // Заголовок таблицы
    const headerRow = table.insertRow();
    headerRow.insertCell(0).textContent = 'Имя и Фамилия';

    // Получаем текущую дату
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('ru', { month: 'long' });

    // Устанавливаем название месяца над таблицей
    const currentMonthElement = document.getElementById('currentMonth');
    currentMonthElement.textContent = `Месяц: ${currentMonth}`;

    for (let i = 1; i <= 31; i++) {
        const cell = headerRow.insertCell(i);
        const dayOfMonth = i.toString().padStart(2, '0');
        cell.textContent = dayOfMonth;
    }

    // Данные таблицы
    // Замените этот массив реальными данными, которые у вас есть
    const studentsData = [
        { name: 'Иван Иванов', grades: Array(31).fill(null) },
        { name: 'Мария Петрова', grades: Array(31).fill(null) },
        // Добавьте больше данных по мере необходимости
    ];

    // Загружаем данные из локального хранилища при загрузке страницы
    studentsData.forEach(student => {
        const savedGrades = localStorage.getItem(student.name);
        if (savedGrades) {
            student.grades = JSON.parse(savedGrades);
        }
    });

    studentsData.forEach(student => {
        const row = table.insertRow();
        row.insertCell(0).textContent = student.name;

        student.grades.forEach((grade, index) => {
            const cell = row.insertCell(index + 1);
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'grade-input';
            input.value = grade || '';
            input.addEventListener('change', function () {
                student.grades[index] = parseInt(this.value, 10) || null;
            });

            const cellContainer = document.createElement('div');
            cellContainer.className = 'grade-cell';
            cellContainer.appendChild(input);

            cell.appendChild(cellContainer);
        });
    });

    // Кнопка "Сохранить"
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function () {
        // Сохраняем данные в локальное хранилище
        studentsData.forEach(student => {
            localStorage.setItem(student.name, JSON.stringify(student.grades));
        });
    });

    // Кнопка "Сохранить в Excel"
    const saveToExcelButton = document.getElementById('saveToExcelButton');
    saveToExcelButton.addEventListener('click', function () {
        saveToExcel(studentsData);
    });
}

// Функция для сохранения данных в файл Excel (XLSX)
function saveToExcel(data) {
    const ws = XLSX.utils.aoa_to_sheet([
        ['Имя и Фамилия', ...Array.from({ length: 31 }, (_, i) => `День ${i + 1}`)],
        ...data.map(student => [student.name, ...student.grades]),
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Журнал');
    XLSX.writeFile(wb, 'journal.xlsx');
}

// Вызов функции для отображения данных при загрузке страницы
window.onload = displayGrades;
// Вызываем функцию снова после загрузки страницы для отображения сохраненных данных
window.onload();

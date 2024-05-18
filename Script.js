class Car {
    constructor(name, date, problem, status, imageUrl) {
      this.name = name;
      this.date = date;
      this.problem = problem;
      this.status = status;
      this.imageUrl = imageUrl;
    }
  }
  
  const cars = [];
  
  const form = document.getElementById('add-form');
  const table = document.getElementById('table');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const problem = document.getElementById('problem').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const image = document.getElementById('image').files[0];
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const car = new Car(name, date, problem, status, e.target.result);
      cars.push(car);
      updateTable();
    };
    reader.readAsDataURL(image);
  });
  
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete-btn')) {
      const name = target.closest('tr').querySelector('td:nth-child(2)').textContent;
      deleteCar(name);
    } else if (target.classList.contains('edit-btn')) {
      const name = target.closest('tr').querySelector('td:nth-child(2)').textContent;
      editCar(name);
    }
  });
  
  function deleteCar(name) {
    const index = cars.findIndex(car => car.name === name);
    if (index !== -1) {
      cars.splice(index, 1);
      updateTable();
    };
  };
  
  function editCar(name) {
    const car = cars.find(car => car.name === name);
    if (car) {
      alert('Измените данные в полях на исправленные и нажмите Добавить')
      
      document.getElementById('name').value = car.name;
      document.getElementById('date').value = car.date;
      document.getElementById('problem').value = car.problem;
      document.querySelector(`input[name="status"][value="${car.status}"]`).checked = true;
  
      deleteCar(name);
    };
  };
  
  const updateTable = () => {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
  
    cars.forEach((car) => {
      const row = document.createElement('tr');
  
      const imageCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = car.imageUrl;
      img.width = 200;
      img.width = 200;
      imageCell.appendChild(img);
  
      const nameCell = document.createElement('td');
      nameCell.textContent = car.name;
  
      const dateCell = document.createElement('td');
      dateCell.textContent = car.date;
  
      const problemCell = document.createElement('td');
      problemCell.textContent = car.problem;
  
      const statusCell = document.createElement('td');
      statusCell.textContent = car.status;
  
      row.appendChild(imageCell);
      row.appendChild(nameCell);
      row.appendChild(dateCell);
      row.appendChild(problemCell);
      row.appendChild(statusCell);
  
      const actionsCell = document.createElement('td');
  
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn', 'btn', 'btn-danger');
      deleteBtn.textContent = 'Удалить';
      actionsCell.appendChild(deleteBtn);
  
      const editBtn = document.createElement('button');
      editBtn.classList.add('edit-btn', 'btn', 'btn-primary');
      editBtn.textContent = 'Изменить';
      actionsCell.appendChild(editBtn);
  
      row.appendChild(actionsCell);
  
      tbody.appendChild(row);
    });
  };
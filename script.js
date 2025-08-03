const button = document.getElementById('button');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// fügr 

// Funktion zum Hinzufügen einer Aufgabe
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  //erstellt ein neues Etikett
  const task = document.createElement('div');
  task.className = 'task';
  task.textContent = text;

  // Aufgabe klickbar machen (zum Entfernen)
  task.addEventListener('click', () => {
    task.remove(); // Etikett wird entfernt
  });

  taskList.appendChild(task);
  taskInput.value = '';
}

button.addEventListener('click', addTask);

// Enter-Taste drücken im Eingabefeld
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }

 });



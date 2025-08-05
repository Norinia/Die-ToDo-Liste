const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const sound = document.getElementById('printSound');
let currentXP = 0;
let level = 1;
let xpForNextLevel = 60;
const resetXPButton = document.getElementById('resetXPBtn');

// WEnn die seite geladen wurde werden gespeicherte Aufgaben geladen
window.addEventListener('DOMContentLoaded', () => {
   loadTasks();
   loadXP();
});


// Funktion zum Hinzufügen einer Aufgabe
function addTask(text) {
  //erstellt ein neues Etikett
  const task = document.createElement('div');
  task.className = 'task'; //Klasse für css
  task.textContent = text; // text setzten

  // Aufgabe klickbar machen (zum Entfernen)
  task.addEventListener('click', () => {
    task.remove();// Etikett wird entfernt
    removeTask(text); // und aus dem speicher gelöscht
    addXP(10);
    showXP(10); 

    // Konfetti starten!
    confetti({
    particleCount: 100,
    spread: 100,
    origin: { x: 0.5 }
  });
  });

  taskList.appendChild(task); // wird in die Liste der andern Aufgaben eingefügt
}


function handleAdd(){ 
   const text = taskInput.value.trim(); // leezeichen Entvernem?
  if (text === '') return; // wenn leer abrechen

  addTask(text);           // anzeigen
  saveTask(text);          // im Browser speichern
  taskInput.value = '';    // Eingabefeld leeren
}

// KLick auf den Button
addButton.addEventListener('click', handleAdd);


// Enter-Taste drücken wenn was eigegebn wurde
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleAdd();
  }
 });


 // speichert die Aufgabe
 function saveTask(text) {
  const tasks = getTasks(); // Aktuelle Lsite holen
  tasks.push(text); // neue aufgabe hinzufügen 
  localStorage.setItem('tasks', JSON.stringify(tasks)); // speichern 
}

// Aufgaben werden beim öffnen geladen
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(addTask);
}

// Löscht die Aufgabe aus dem Speicher
function removeTask(text) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t !== text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// holt die Aufgabe aus dem Speicher
function getTasks() {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
}


// XP hinzufügen
function addXP(amount) {
  currentXP += amount;

  // Level-Up prüfen
  if (currentXP >= xpForNextLevel) {
    level++;
    currentXP -= xpForNextLevel;
    //xpForNextLevel = Math.floor(xpForNextLevel * 1.2); // steigert sich
    alert(`Level Up! Du bist jetzt Level ${level}`);
  }
  saveXP();
  updateXPBar();
}

function updateXPBar() {
  const percent = (currentXP / xpForNextLevel) * 100;
  document.getElementById('xpBar').style.width = percent + '%';
  document.getElementById('xpText').textContent = `Level ${level} – ${currentXP} / ${xpForNextLevel} XP`;
}

function showXP(amount) {
  const show= document.createElement('div');
  show.textContent = `+${amount} XP`;
  show.className = 'xp-feedback';
  document.body.appendChild(show);

  setTimeout(() => show.remove(), 2000);
}

function saveXP() {
  localStorage.setItem('currentXP', currentXP);
  localStorage.setItem('level', level);
}

 function loadXP() {
  const savedXP = localStorage.getItem('currentXP');
  const savedLevel = localStorage.getItem('level');
  if (savedXP !== null && savedLevel !== null) {
    currentXP = parseInt(savedXP, 10);
    level = parseInt(savedLevel, 10);
  }
  updateXPBar();
}

function resetXP() {
  // Gesamt XP und Level zurücksetzen
  currentXP = 0;
  level = 1;
  updateXPBar();
  saveXP();

  // Tages-XP zurücksetzen (für heutigen Tag)
  const todayKey = getTodayKey();
  localStorage.removeItem(todayKey);
  updateDailyXPDisplay(0);

  alert('Deine gesammelten XP wurden zurückgesetzt!');
}

resetXPButton.addEventListener('click', resetXP);
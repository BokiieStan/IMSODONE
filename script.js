// Game State
let gameState = {
  anxiety: 30,
  depression: 45,
  sleep: 60,
  day: 1,
  moodHistory: [],
  medicationTaken: {
    sertraline: false,
    melatonin: false
  },
  intrusiveThoughts: [
    "What if everyone is just pretending to like me?",
    "I'm probably going to fail everything anyway",
    "Why do I even bother trying?",
    "Everyone else has their life together except me",
    "What if I'm just not good enough?",
    "I should just give up now",
    "Nobody really cares about me",
    "I'm such a burden to everyone",
    "What's the point of anything?",
    "I'm probably going to mess this up too"
  ],
  negativeThoughts: [
    "I'm worthless",
    "I can't do anything right",
    "I'm a failure",
    "Nobody understands me",
    "I'm all alone",
    "I don't deserve happiness",
    "I'm broken",
    "I'll never be normal",
    "I'm a disappointment",
    "I should just disappear"
  ],
  currentThoughts: [],
  visualDistortionLevel: 0,
  lastMoodCheck: null
};

// DOM Elements
const introText = document.getElementById("introText");
const gameScreen = document.getElementById("gameScreen");
const deskScreen = document.getElementById("deskScreen");
const intrusiveThoughtsOverlay = document.getElementById("intrusiveThoughts");
const thoughtText = document.getElementById("thoughtText");
const visualDistortion = document.getElementById("visualDistortion");
const anxietyBar = document.getElementById("anxietyBar");
const depressionBar = document.getElementById("depressionBar");
const sleepBar = document.getElementById("sleepBar");

// Intro sequence
const introLines = [
  "Loading profile...\n",
  "Name: Jamie Rivera",
  "Age: 16",
  "Occupation: Student",
  "Interests: Drawing, biking, staying up too late",
  "Medical History: Depression, Anxiety",
  "Current Medications: Sertraline, Melatonin",
  "\nStatus: Online",
  "\nWelcome back, Jamie.",
  "\nRemember: You're not alone."
];

let index = 0;

function showLineByLine() {
  if (index < introLines.length) {
    introText.textContent += introLines[index] + "\n";
    index++;
    setTimeout(showLineByLine, 1000);
  } else {
    setTimeout(() => {
      document.getElementById("introScreen").style.display = "none";
      gameScreen.style.display = "flex";
    }, 2000);
  }
}

// Initialize game
function initGame() {
  updateStatusBars();
  startMentalHealthSimulation();
  scheduleIntrusiveThoughts();
  scheduleVisualDistortions();
  updateMedicationSchedule();
}

// Update status bars
function updateStatusBars() {
  anxietyBar.style.width = gameState.anxiety + "%";
  depressionBar.style.width = gameState.depression + "%";
  sleepBar.style.width = gameState.sleep + "%";
  
  // Color intensity based on levels
  if (gameState.anxiety > 70) {
    anxietyBar.style.background = "linear-gradient(90deg, #e74c3c, #c0392b)";
  } else if (gameState.anxiety > 40) {
    anxietyBar.style.background = "linear-gradient(90deg, #f39c12, #e67e22)";
  }
  
  if (gameState.depression > 70) {
    depressionBar.style.background = "linear-gradient(90deg, #8e44ad, #6c5ce7)";
  } else if (gameState.depression > 40) {
    depressionBar.style.background = "linear-gradient(90deg, #3498db, #2980b9)";
  }
}

// Mental health simulation
function startMentalHealthSimulation() {
  setInterval(() => {
    // Gradual deterioration
    if (Math.random() < 0.3) {
      gameState.anxiety = Math.min(100, gameState.anxiety + Math.random() * 5);
    }
    if (Math.random() < 0.25) {
      gameState.depression = Math.min(100, gameState.depression + Math.random() * 4);
    }
    if (Math.random() < 0.2) {
      gameState.sleep = Math.max(0, gameState.sleep - Math.random() * 3);
    }
    
    updateStatusBars();
    checkForCrisis();
  }, 30000); // Every 30 seconds
}

// Schedule intrusive thoughts
function scheduleIntrusiveThoughts() {
  setInterval(() => {
    if (Math.random() < 0.4 && gameState.anxiety > 40) {
      showIntrusiveThought();
    }
  }, 45000); // Every 45 seconds
}

// Show intrusive thought
function showIntrusiveThought() {
  const thought = gameState.intrusiveThoughts[Math.floor(Math.random() * gameState.intrusiveThoughts.length)];
  thoughtText.textContent = thought;
  intrusiveThoughtsOverlay.style.display = "flex";
  
  // Add to current thoughts
  gameState.currentThoughts.push({
    type: 'intrusive',
    text: thought,
    timestamp: new Date()
  });
  
  // Increase anxiety
  gameState.anxiety = Math.min(100, gameState.anxiety + 10);
  updateStatusBars();
  
  setTimeout(() => {
    intrusiveThoughtsOverlay.style.display = "none";
  }, 5000);
}

// Schedule visual distortions
function scheduleVisualDistortions() {
  setInterval(() => {
    if (gameState.anxiety > 60 || gameState.depression > 70) {
      showVisualDistortion();
    }
  }, 60000); // Every minute
}

// Show visual distortion
function showVisualDistortion() {
  visualDistortion.style.display = "block";
  gameState.visualDistortionLevel++;
  
  // Intensify distortion based on level
  const intensity = Math.min(0.3, gameState.visualDistortionLevel * 0.05);
  visualDistortion.style.background = `radial-gradient(circle at 50% 50%, transparent 0%, rgba(231, 76, 60, ${intensity}) 100%)`;
  
  setTimeout(() => {
    visualDistortion.style.display = "none";
  }, 8000);
}

// Check for mental health crisis
function checkForCrisis() {
  if (gameState.anxiety > 85 || gameState.depression > 85) {
    showCrisisWarning();
  }
}

// Show crisis warning
function showCrisisWarning() {
  const warning = document.createElement('div');
  warning.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #e74c3c, #c0392b);
    color: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 2000;
    text-align: center;
    box-shadow: 0 10px 30px rgba(231, 76, 60, 0.5);
  `;
  warning.innerHTML = `
    <h3>⚠️ Mental Health Alert</h3>
    <p>Your symptoms are intensifying. Consider reaching out for help.</p>
    <p>National Crisis Line: 988</p>
    <button onclick="this.parentElement.remove()">I understand</button>
  `;
  document.body.appendChild(warning);
}

// Task functions
function openTask(taskName) {
  switch(taskName) {
    case 'Mood':
      openMoodTracker();
      break;
    case 'Medication':
      openMedicationScreen();
      break;
    case 'Thoughts':
      openThoughtsScreen();
      break;
    default:
      alert("Opening: " + taskName);
  }
}

// Mood tracker
function openMoodTracker() {
  document.getElementById("moodScreen").style.display = "flex";
  updateMoodHistory();
}

function setMood(mood) {
  const moodData = {
    mood: mood,
    timestamp: new Date(),
    anxiety: gameState.anxiety,
    depression: gameState.depression
  };
  
  gameState.moodHistory.push(moodData);
  gameState.lastMoodCheck = new Date();
  
  // Affect mental health based on mood
  switch(mood) {
    case 'happy':
      gameState.depression = Math.max(0, gameState.depression - 5);
      gameState.anxiety = Math.max(0, gameState.anxiety - 3);
      break;
    case 'sad':
      gameState.depression = Math.min(100, gameState.depression + 8);
      break;
    case 'anxious':
      gameState.anxiety = Math.min(100, gameState.anxiety + 10);
      break;
    case 'numb':
      gameState.depression = Math.min(100, gameState.depression + 5);
      gameState.sleep = Math.max(0, gameState.sleep - 5);
      break;
  }
  
  updateStatusBars();
  updateMoodHistory();
}

function updateMoodHistory() {
  const historyContainer = document.getElementById("moodHistory");
  historyContainer.innerHTML = "";
  
  const recentMoods = gameState.moodHistory.slice(-7);
  recentMoods.forEach(entry => {
    const moodEntry = document.createElement('div');
    moodEntry.className = 'mood-entry';
    moodEntry.textContent = `${entry.mood} (${entry.timestamp.toLocaleDateString()})`;
    historyContainer.appendChild(moodEntry);
  });
}

// Medication screen
function openMedicationScreen() {
  document.getElementById("medicationScreen").style.display = "flex";
  updateMedicationSchedule();
}

function takeMedication(medType) {
  gameState.medicationTaken[medType] = true;
  
  // Effects of medication
  if (medType === 'sertraline') {
    gameState.depression = Math.max(0, gameState.depression - 15);
    gameState.anxiety = Math.max(0, gameState.anxiety - 10);
  } else if (medType === 'melatonin') {
    gameState.sleep = Math.min(100, gameState.sleep + 20);
  }
  
  updateStatusBars();
  updateMedicationSchedule();
  
  // Disable button
  document.getElementById(medType + 'Btn').disabled = true;
  document.getElementById(medType + 'Btn').textContent = 'Taken';
}

function updateMedicationSchedule() {
  const scheduleContainer = document.getElementById("medSchedule");
  scheduleContainer.innerHTML = "";
  
  const now = new Date();
  const schedule = [
    { med: 'Sertraline', time: '9:00 AM', taken: gameState.medicationTaken.sertraline },
    { med: 'Melatonin', time: '9:00 PM', taken: gameState.medicationTaken.melatonin }
  ];
  
  schedule.forEach(item => {
    const scheduleItem = document.createElement('div');
    scheduleItem.style.cssText = `
      padding: 10px;
      margin: 5px 0;
      background: rgba(74, 85, 104, 0.3);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    scheduleItem.innerHTML = `
      <span>${item.med} - ${item.time}</span>
      <span style="color: ${item.taken ? '#27ae60' : '#e74c3c'}">${item.taken ? '✓ Taken' : '⏰ Pending'}</span>
    `;
    scheduleContainer.appendChild(scheduleItem);
  });
}

// Thoughts screen
function openThoughtsScreen() {
  document.getElementById("thoughtsScreen").style.display = "flex";
  updateThoughtsLists();
}

function updateThoughtsLists() {
  const intrusiveList = document.getElementById("intrusiveThoughtsList");
  const negativeList = document.getElementById("negativeThoughtsList");
  
  intrusiveList.innerHTML = "";
  negativeList.innerHTML = "";
  
  // Show recent intrusive thoughts
  const recentIntrusive = gameState.currentThoughts.filter(t => t.type === 'intrusive').slice(-3);
  recentIntrusive.forEach(thought => {
    const thoughtItem = document.createElement('div');
    thoughtItem.style.cssText = `
      padding: 8px;
      margin: 5px 0;
      background: rgba(231, 76, 60, 0.2);
      border-radius: 5px;
      border-left: 3px solid #e74c3c;
    `;
    thoughtItem.textContent = thought.text;
    intrusiveList.appendChild(thoughtItem);
  });
  
  // Show negative thoughts based on depression level
  const negativeCount = Math.floor(gameState.depression / 20);
  const selectedNegative = gameState.negativeThoughts.slice(0, negativeCount);
  selectedNegative.forEach(thought => {
    const thoughtItem = document.createElement('div');
    thoughtItem.style.cssText = `
      padding: 8px;
      margin: 5px 0;
      background: rgba(52, 73, 94, 0.3);
      border-radius: 5px;
      border-left: 3px solid #34495e;
    `;
    thoughtItem.textContent = thought;
    negativeList.appendChild(thoughtItem);
  });
}

// Close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Event listeners
window.onload = () => {
  showLineByLine();
};

document.getElementById("startBtn").addEventListener("click", () => {
  gameScreen.style.display = "none";
  deskScreen.style.display = "flex";
  initGame();
});

// Reset medication daily
setInterval(() => {
  if (new Date().getHours() === 0 && new Date().getMinutes() === 0) {
    gameState.medicationTaken = {
      sertraline: false,
      melatonin: false
    };
    gameState.day++;
  }
}, 60000); // Check every minute

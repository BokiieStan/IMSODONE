// Game State
let gameState = {
  anxiety: 30,
  depression: 45,
  sleep: 60,
  day: 1,
  currentTime: 7,
  currentLocation: 'bedroom',
  currentScene: 'wake_up',
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
  lastMoodCheck: null,
  dailyChoices: []
};

// Scene Definitions
const scenes = {
  wake_up: {
    location: 'bedroom',
    time: 7,
    dialogue: "Good morning, Jamie. It's 7:00 AM and your alarm is ringing. How do you feel about starting your day?",
    choices: [
      { text: "😊 I feel ready to take on the day!", effect: { anxiety: -5, depression: -3 } },
      { text: "😐 I'm okay, I guess.", effect: { anxiety: 0, depression: 0 } },
      { text: "😴 I'm so tired, I want to sleep more.", effect: { sleep: -10, depression: 5 } },
      { text: "😰 I'm already worried about today.", effect: { anxiety: 10, depression: 3 } }
    ],
    actions: ['get_up', 'snooze', 'check_phone', 'meditation']
  },
  bathroom_morning: {
    location: 'bathroom',
    time: 7.5,
    dialogue: "You're in the bathroom getting ready. You look in the mirror and...",
    choices: [
      { text: "😊 I look good today!", effect: { anxiety: -3, depression: -2 } },
      { text: "😐 I look okay.", effect: { anxiety: 0, depression: 0 } },
      { text: "😔 I look terrible.", effect: { anxiety: 5, depression: 8 } },
      { text: "😰 I can't even look at myself.", effect: { anxiety: 15, depression: 10 } }
    ],
    actions: ['brush_teeth', 'shower', 'skip_shower', 'take_medication']
  },
  kitchen_breakfast: {
    location: 'kitchen',
    time: 8,
    dialogue: "You're in the kitchen. Your mom left a note saying she's at work. What do you want to do for breakfast?",
    choices: [
      { text: "🍳 I'll make myself a proper breakfast.", effect: { anxiety: -2, depression: -3 } },
      { text: "🥣 I'll just grab some cereal.", effect: { anxiety: 0, depression: 0 } },
      { text: "☕ I'll just have coffee.", effect: { anxiety: 5, sleep: -5 } },
      { text: "😔 I'm not hungry.", effect: { anxiety: 3, depression: 5 } }
    ],
    actions: ['make_breakfast', 'skip_breakfast', 'check_phone', 'take_medication']
  },
  school_morning: {
    location: 'school',
    time: 8.5,
    dialogue: "You arrive at school. You see some classmates in the hallway. How do you feel?",
    choices: [
      { text: "😊 I'm excited to see my friends!", effect: { anxiety: -5, depression: -3 } },
      { text: "😐 I'm just here to get through the day.", effect: { anxiety: 0, depression: 0 } },
      { text: "😰 I hope no one talks to me.", effect: { anxiety: 10, depression: 5 } },
      { text: "😔 I wish I could just go home.", effect: { anxiety: 5, depression: 8 } }
    ],
    actions: ['talk_to_friends', 'avoid_everyone', 'go_to_class', 'hide_in_bathroom']
  },
  class_math: {
    location: 'school',
    time: 9,
    dialogue: "Math class is starting. The teacher announces a pop quiz. Your heart starts racing...",
    choices: [
      { text: "😊 I studied for this, I can do it!", effect: { anxiety: -3, depression: -2 } },
      { text: "😐 I'll just try my best.", effect: { anxiety: 2, depression: 0 } },
      { text: "😰 I'm going to fail this.", effect: { anxiety: 15, depression: 8 } },
      { text: "😔 I can't even think straight.", effect: { anxiety: 20, depression: 10 } }
    ],
    actions: ['take_quiz', 'ask_for_help', 'pretend_sick', 'panic']
  },
  lunch_break: {
    location: 'school',
    time: 12,
    dialogue: "It's lunch time. You see your usual group of friends sitting together. What do you do?",
    choices: [
      { text: "😊 I'll join them, they're my friends!", effect: { anxiety: -5, depression: -3 } },
      { text: "😐 I'll sit with them but stay quiet.", effect: { anxiety: 0, depression: 0 } },
      { text: "😰 I'll sit alone, I don't want to bother them.", effect: { anxiety: 8, depression: 5 } },
      { text: "😔 I'll skip lunch entirely.", effect: { anxiety: 3, depression: 8 } }
    ],
    actions: ['join_friends', 'sit_alone', 'skip_lunch', 'call_parent']
  },
  afternoon_class: {
    location: 'school',
    time: 13,
    dialogue: "English class. The teacher asks you to read your essay out loud to the class. Your hands are shaking...",
    choices: [
      { text: "😊 I practiced this, I can do it!", effect: { anxiety: -2, depression: -1 } },
      { text: "😐 I'll just read it quickly.", effect: { anxiety: 5, depression: 0 } },
      { text: "😰 I can't speak in front of everyone.", effect: { anxiety: 20, depression: 8 } },
      { text: "😔 I want to disappear.", effect: { anxiety: 25, depression: 12 } }
    ],
    actions: ['read_essay', 'ask_to_skip', 'panic_attack', 'leave_class']
  },
  school_end: {
    location: 'school',
    time: 15,
    dialogue: "School is over. You have some free time before you need to go home. What do you want to do?",
    choices: [
      { text: "😊 I'll hang out with friends!", effect: { anxiety: -3, depression: -2 } },
      { text: "😐 I'll just go home.", effect: { anxiety: 0, depression: 0 } },
      { text: "😰 I need to be alone right now.", effect: { anxiety: 5, depression: 3 } },
      { text: "😔 I don't want to see anyone.", effect: { anxiety: 3, depression: 8 } }
    ],
    actions: ['hang_with_friends', 'go_home', 'walk_alone', 'call_parent']
  },
  home_evening: {
    location: 'bedroom',
    time: 16,
    dialogue: "You're back home. You have homework to do, but you're feeling tired. What's your priority?",
    choices: [
      { text: "📚 I'll do my homework first.", effect: { anxiety: -2, depression: -1 } },
      { text: "😴 I'll take a nap first.", effect: { sleep: 10, anxiety: -3 } },
      { text: "📱 I'll just scroll on my phone.", effect: { anxiety: 3, depression: 2 } },
      { text: "😔 I don't feel like doing anything.", effect: { anxiety: 5, depression: 8 } }
    ],
    actions: ['do_homework', 'take_nap', 'scroll_phone', 'skip_homework']
  },
  dinner_time: {
    location: 'kitchen',
    time: 18,
    dialogue: "Your mom is making dinner. She asks how your day was. How do you respond?",
    choices: [
      { text: "😊 It was good, I had fun!", effect: { anxiety: -3, depression: -2 } },
      { text: "😐 It was okay, nothing special.", effect: { anxiety: 0, depression: 0 } },
      { text: "😔 It was rough, I'm tired.", effect: { anxiety: 5, depression: 3 } },
      { text: "😰 I don't want to talk about it.", effect: { anxiety: 8, depression: 5 } }
    ],
    actions: ['talk_about_day', 'give_short_answer', 'avoid_conversation', 'go_to_room']
  },
  bedtime: {
    location: 'bedroom',
    time: 21,
    dialogue: "It's getting late. You should probably go to bed soon. How are you feeling about tomorrow?",
    choices: [
      { text: "😊 Tomorrow will be better!", effect: { anxiety: -3, depression: -2 } },
      { text: "😐 I'll just take it one day at a time.", effect: { anxiety: 0, depression: 0 } },
      { text: "😰 I'm worried about tomorrow.", effect: { anxiety: 10, depression: 5 } },
      { text: "😔 I don't want tomorrow to come.", effect: { anxiety: 5, depression: 12 } }
    ],
    actions: ['go_to_sleep', 'stay_up_late', 'take_medication', 'read_book']
  }
};

// DOM Elements
const introText = document.getElementById("introText");
const gameScreen = document.getElementById("gameScreen");
const mainGame = document.getElementById("mainGame");
const currentLocation = document.getElementById("currentLocation");
const currentTime = document.getElementById("currentTime");
const currentDay = document.getElementById("currentDay");
const sceneBackground = document.getElementById("sceneBackground");
const dialogueText = document.getElementById("dialogueText");
const dialogueChoices = document.getElementById("dialogueChoices");
const actionButtons = document.getElementById("actionButtons");
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
  loadScene('wake_up');
}

// Load scene
function loadScene(sceneId) {
  const scene = scenes[sceneId];
  if (!scene) return;

  gameState.currentScene = sceneId;
  gameState.currentLocation = scene.location;
  gameState.currentTime = scene.time;

  // Update UI
  currentLocation.textContent = getLocationName(scene.location);
  currentTime.textContent = formatTime(scene.time);
  currentDay.textContent = `Day ${gameState.day}`;

  // Update scene background
  sceneBackground.className = `scene-background ${scene.location}-scene`;
  
  // Update dialogue
  dialogueText.textContent = scene.dialogue;
  
  // Update choices
  updateChoices(scene.choices);
  
  // Update actions
  updateActions(scene.actions);
}

// Get location name
function getLocationName(location) {
  const names = {
    bedroom: "Jamie's Bedroom",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
    school: "School",
    park: "Park"
  };
  return names[location] || location;
}

// Format time
function formatTime(time) {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

// Update choices
function updateChoices(choices) {
  dialogueChoices.innerHTML = "";
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.textContent = choice.text;
    button.onclick = () => makeChoice(choice);
    dialogueChoices.appendChild(button);
  });
}

// Update actions
function updateActions(actions) {
  actionButtons.innerHTML = "";
  actions.forEach(action => {
    const button = document.createElement('button');
    button.className = 'action-btn';
    button.textContent = getActionText(action);
    button.onclick = () => performAction(action);
    actionButtons.appendChild(button);
  });
  actionButtons.style.display = 'flex';
}

// Get action text
function getActionText(action) {
  const texts = {
    get_up: "Get Up",
    snooze: "Snooze Alarm",
    check_phone: "Check Phone",
    meditation: "Quick Meditation",
    brush_teeth: "Brush Teeth",
    shower: "Take Shower",
    skip_shower: "Skip Shower",
    take_medication: "Take Medication",
    make_breakfast: "Make Breakfast",
    skip_breakfast: "Skip Breakfast",
    talk_to_friends: "Talk to Friends",
    avoid_everyone: "Avoid Everyone",
    go_to_class: "Go to Class",
    hide_in_bathroom: "Hide in Bathroom",
    take_quiz: "Take Quiz",
    ask_for_help: "Ask for Help",
    pretend_sick: "Pretend Sick",
    panic: "Panic",
    join_friends: "Join Friends",
    sit_alone: "Sit Alone",
    skip_lunch: "Skip Lunch",
    call_parent: "Call Parent",
    read_essay: "Read Essay",
    ask_to_skip: "Ask to Skip",
    panic_attack: "Panic Attack",
    leave_class: "Leave Class",
    hang_with_friends: "Hang with Friends",
    go_home: "Go Home",
    walk_alone: "Walk Alone",
    do_homework: "Do Homework",
    take_nap: "Take Nap",
    scroll_phone: "Scroll Phone",
    skip_homework: "Skip Homework",
    talk_about_day: "Talk About Day",
    give_short_answer: "Give Short Answer",
    avoid_conversation: "Avoid Conversation",
    go_to_room: "Go to Room",
    go_to_sleep: "Go to Sleep",
    stay_up_late: "Stay Up Late",
    read_book: "Read Book"
  };
  return texts[action] || action;
}

// Make choice
function makeChoice(choice) {
  // Apply effects
  if (choice.effect) {
    Object.keys(choice.effect).forEach(key => {
      if (gameState[key] !== undefined) {
        gameState[key] = Math.max(0, Math.min(100, gameState[key] + choice.effect[key]));
      }
    });
  }

  // Record choice
  gameState.dailyChoices.push({
    scene: gameState.currentScene,
    choice: choice.text,
    timestamp: new Date()
  });

  updateStatusBars();
  
  // Progress to next scene
  progressToNextScene();
}

// Perform action
function performAction(action) {
  const effects = {
    get_up: { sleep: -5, anxiety: -2 },
    snooze: { sleep: 5, anxiety: 3 },
    check_phone: { anxiety: 2, depression: 1 },
    meditation: { anxiety: -8, depression: -3 },
    brush_teeth: { anxiety: -1 },
    shower: { anxiety: -3, depression: -2 },
    skip_shower: { anxiety: 2, depression: 1 },
    take_medication: { anxiety: -5, depression: -3 },
    make_breakfast: { anxiety: -2, depression: -1 },
    skip_breakfast: { anxiety: 3, depression: 2 },
    talk_to_friends: { anxiety: -5, depression: -3 },
    avoid_everyone: { anxiety: 5, depression: 3 },
    go_to_class: { anxiety: -1 },
    hide_in_bathroom: { anxiety: 8, depression: 5 },
    take_quiz: { anxiety: 10, depression: 5 },
    ask_for_help: { anxiety: -3, depression: -1 },
    pretend_sick: { anxiety: 15, depression: 8 },
    panic: { anxiety: 25, depression: 10 },
    join_friends: { anxiety: -3, depression: -2 },
    sit_alone: { anxiety: 5, depression: 3 },
    skip_lunch: { anxiety: 3, depression: 5 },
    call_parent: { anxiety: -5, depression: -2 },
    read_essay: { anxiety: 15, depression: 8 },
    ask_to_skip: { anxiety: 10, depression: 5 },
    panic_attack: { anxiety: 30, depression: 15 },
    leave_class: { anxiety: 20, depression: 10 },
    hang_with_friends: { anxiety: -3, depression: -2 },
    go_home: { anxiety: -1 },
    walk_alone: { anxiety: 3, depression: 2 },
    do_homework: { anxiety: -2, depression: -1 },
    take_nap: { sleep: 15, anxiety: -5 },
    scroll_phone: { anxiety: 3, depression: 2 },
    skip_homework: { anxiety: 5, depression: 3 },
    talk_about_day: { anxiety: -3, depression: -2 },
    give_short_answer: { anxiety: 0, depression: 0 },
    avoid_conversation: { anxiety: 5, depression: 3 },
    go_to_room: { anxiety: 3, depression: 2 },
    go_to_sleep: { sleep: 10, anxiety: -3 },
    stay_up_late: { sleep: -10, anxiety: 5 },
    read_book: { anxiety: -2, depression: -1 }
  };

  if (effects[action]) {
    Object.keys(effects[action]).forEach(key => {
      if (gameState[key] !== undefined) {
        gameState[key] = Math.max(0, Math.min(100, gameState[key] + effects[action][key]));
      }
    });
  }

  updateStatusBars();
  
  // Special actions
  if (action === 'take_medication') {
    takeMedication();
  }
  
  // Progress to next scene
  progressToNextScene();
}

// Progress to next scene
function progressToNextScene() {
  const sceneOrder = [
    'wake_up', 'bathroom_morning', 'kitchen_breakfast', 'school_morning',
    'class_math', 'lunch_break', 'afternoon_class', 'school_end',
    'home_evening', 'dinner_time', 'bedtime'
  ];
  
  const currentIndex = sceneOrder.indexOf(gameState.currentScene);
  const nextIndex = currentIndex + 1;
  
  if (nextIndex < sceneOrder.length) {
    showSceneTransition(scenes[sceneOrder[nextIndex]].dialogue.split('.')[0] + '...');
    setTimeout(() => {
      loadScene(sceneOrder[nextIndex]);
    }, 2000);
  } else {
    // End of day
    endDay();
  }
}

// Show scene transition
function showSceneTransition(text) {
  const transition = document.getElementById("sceneTransition");
  const transitionText = document.getElementById("transitionText");
  transitionText.textContent = text;
  transition.style.display = "flex";
  
  setTimeout(() => {
    transition.style.display = "none";
  }, 2000);
}

// End day
function endDay() {
  dialogueText.textContent = "The day is over. Tomorrow is a new day. How do you feel about today?";
  updateChoices([
    { text: "😊 It was a good day!", effect: { anxiety: -5, depression: -3 } },
    { text: "😐 It was okay.", effect: { anxiety: 0, depression: 0 } },
    { text: "😔 It was rough.", effect: { anxiety: 5, depression: 8 } },
    { text: "😰 I can't wait for it to be over.", effect: { anxiety: 10, depression: 12 } }
  ]);
  
  actionButtons.style.display = "none";
  
  // Reset for next day
  gameState.day++;
  gameState.dailyChoices = [];
  gameState.medicationTaken = { sertraline: false, melatonin: false };
}

// Take medication
function takeMedication() {
  if (!gameState.medicationTaken.sertraline) {
    gameState.medicationTaken.sertraline = true;
    gameState.depression = Math.max(0, gameState.depression - 15);
    gameState.anxiety = Math.max(0, gameState.anxiety - 10);
  }
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
      gameState.anxiety = Math.min(100, gameState.anxiety + Math.random() * 3);
    }
    if (Math.random() < 0.25) {
      gameState.depression = Math.min(100, gameState.depression + Math.random() * 2);
    }
    if (Math.random() < 0.2) {
      gameState.sleep = Math.max(0, gameState.sleep - Math.random() * 2);
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
  const warning = document.getElementById("crisisWarning");
  warning.style.display = "flex";
}

// Close crisis warning
function closeCrisisWarning() {
  document.getElementById("crisisWarning").style.display = "none";
}

// Event listeners
window.onload = () => {
  showLineByLine();
};

document.getElementById("startBtn").addEventListener("click", () => {
  gameScreen.style.display = "none";
  mainGame.style.display = "flex";
  initGame();
});

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
  relationships: {
    mom: 70,
    dad: 60,
    bestFriend: 80,
    therapist: 50,
    classmates: 40
  },
  storyFlags: {
    talkedToMom: false,
    talkedToFriend: false,
    calledCrisisLine: false,
    skippedSchool: false,
    hadPanicAttack: false,
    selfHarmed: false,
    attemptedOverdose: false,
    reachedOutForHelp: false
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
    "I'm probably going to mess this up too",
    "Maybe they'd be better off without me",
    "I'm just a waste of space",
    "No one would miss me if I was gone",
    "I deserve to feel this way",
    "I'm broken beyond repair"
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
    "I should just disappear",
    "I'm a burden to everyone",
    "I'm not worth saving",
    "I'm too damaged to fix",
    "I'm just a waste of resources",
    "I'm better off dead"
  ],
  currentThoughts: [],
  visualDistortionLevel: 0,
  lastMoodCheck: null,
  dailyChoices: [],
  dialogueHistory: []
};

// Character Dialogue Database
const characterDialogues = {
  mom: {
    morning: [
      "Good morning, sweetie. How did you sleep?",
      "Jamie, are you feeling okay today?",
      "I made your favorite breakfast if you're hungry.",
      "I'm worried about you, honey. You seem so down lately.",
      "Remember, you can talk to me about anything, okay?"
    ],
    concern: [
      "Jamie, I've noticed you've been really quiet lately.",
      "Are you sure you're okay? You don't seem like yourself.",
      "I'm here for you, no matter what you're going through.",
      "You know you can tell me anything, right?",
      "I love you so much, Jamie. Please talk to me."
    ],
    crisis: [
      "Jamie, I'm really worried about you. Let's get you some help.",
      "I think we should call your therapist today.",
      "You're not alone in this, honey. We'll get through this together.",
      "I'm taking you to the hospital. You need help right now.",
      "Please, Jamie. Let me help you. You don't have to suffer alone."
    ]
  },
  dad: {
    casual: [
      "Hey sport, how's school going?",
      "Want to watch the game together later?",
      "I'm proud of you, you know that?",
      "You're doing great, Jamie.",
      "Need any help with anything?"
    ],
    concern: [
      "Son, I'm worried about you. You seem different lately.",
      "Is everything okay? You can talk to me.",
      "I know I'm not always the best at this, but I'm here for you.",
      "You're my kid, Jamie. I want to help.",
      "Let's figure this out together, okay?"
    ]
  },
  bestFriend: {
    supportive: [
      "Hey Jamie! How are you doing today?",
      "You know I'm always here for you, right?",
      "Want to hang out after school?",
      "You're one of my favorite people, you know that?",
      "I'm worried about you. You seem really down lately."
    ],
    crisis: [
      "Jamie, please talk to me. I'm really worried.",
      "You're not alone in this. I'm here for you.",
      "Please don't do anything to hurt yourself.",
      "Let's get you some help, okay?",
      "I care about you so much. Please let me help."
    ]
  },
  therapist: {
    session: [
      "How have you been feeling since our last session?",
      "Tell me about your week. What's been on your mind?",
      "I'm here to listen, Jamie. What's troubling you?",
      "Have you been taking your medication regularly?",
      "What coping strategies have you been trying?"
    ],
    crisis: [
      "Jamie, I'm very concerned about your safety right now.",
      "I think we need to get you immediate help.",
      "You're having thoughts of hurting yourself, aren't you?",
      "Let's call your parents and get you to the hospital.",
      "You're not alone in this. We'll get you the help you need."
    ]
  },
  classmates: {
    friendly: [
      "Hey Jamie! How's it going?",
      "Want to sit with us at lunch?",
      "You're really good at drawing, Jamie!",
      "How was your weekend?",
      "You seem really quiet lately. Everything okay?"
    ],
    distant: [
      "Oh, hi Jamie.",
      "Yeah, sure, whatever.",
      "I guess you can sit here.",
      "I don't really know what to say.",
      "Are you okay? You seem weird."
    ]
  }
};

// Scene Definitions with Interactive Dialogue
const scenes = {
  wake_up: {
    location: 'bedroom',
    time: 7,
    initialDialogue: "Ugh... should I get out of bed today?",
    characterInteractions: [
      {
        character: 'mom',
        dialogue: "Jamie? Are you up? I made breakfast if you want some.",
        choices: [
          { text: "Yeah, I'm coming down.", effect: { anxiety: -2, depression: -1, relationships: { mom: 3 } } },
          { text: "I'm not hungry.", effect: { anxiety: 2, depression: 3, relationships: { mom: -2 } } },
          { text: "Just give me a minute.", effect: { anxiety: 0, depression: 0 } }
        ]
      },
      {
        character: 'bestFriend',
        dialogue: "Hey Jamie! You awake? We're meeting at the bus stop in 20 minutes.",
        choices: [
          { text: "Yeah, I'll be there!", effect: { anxiety: -3, depression: -2, relationships: { bestFriend: 5 } } },
          { text: "I don't feel like going today.", effect: { anxiety: 5, depression: 8, relationships: { bestFriend: -3 } } },
          { text: "Maybe... I'll text you.", effect: { anxiety: 2, depression: 3 } }
        ]
      }
    ],
    actions: ['get_up', 'snooze', 'check_phone', 'meditation']
  },
  bathroom_morning: {
    location: 'bathroom',
    time: 7.5,
    initialDialogue: "You look in the mirror and see the dark circles under your eyes.",
    characterInteractions: [
      {
        character: 'mom',
        dialogue: "Jamie, are you okay? You look really tired.",
        choices: [
          { text: "I'm fine, just didn't sleep well.", effect: { anxiety: 0, depression: 0, relationships: { mom: 2 } } },
          { text: "I'm just tired, that's all.", effect: { anxiety: 1, depression: 1 } },
          { text: "Leave me alone.", effect: { anxiety: 3, depression: 5, relationships: { mom: -5 } } }
        ]
      }
    ],
    actions: ['brush_teeth', 'shower', 'skip_shower', 'take_medication']
  },
  kitchen_breakfast: {
    location: 'kitchen',
    time: 8,
    initialDialogue: "Your mom left a note: 'Love you, sweetie. Have a good day.'",
    characterInteractions: [
      {
        character: 'mom',
        dialogue: "Jamie, I'm worried about you. You seem so distant lately. Can we talk?",
        choices: [
          { text: "I'm okay, really. Just stressed about school.", effect: { anxiety: -2, depression: -1, relationships: { mom: 5 } } },
          { text: "I don't want to talk about it.", effect: { anxiety: 3, depression: 5, relationships: { mom: -3 } } },
          { text: "Maybe later, Mom.", effect: { anxiety: 1, depression: 2 } }
        ]
      },
      {
        character: 'dad',
        dialogue: "Hey sport, how's school going? You seem quiet.",
        choices: [
          { text: "It's going okay, Dad.", effect: { anxiety: -1, depression: -1, relationships: { dad: 3 } } },
          { text: "I don't want to talk about it.", effect: { anxiety: 2, depression: 3, relationships: { dad: -2 } } },
          { text: "School is fine.", effect: { anxiety: 0, depression: 0 } }
        ]
      }
    ],
    actions: ['make_breakfast', 'skip_breakfast', 'check_phone', 'take_medication']
  },
  school_morning: {
    location: 'school',
    time: 8.5,
    initialDialogue: "You arrive at school and see Alex waiting by your locker.",
    characterInteractions: [
      {
        character: 'bestFriend',
        dialogue: "Jamie! How are you doing? You seem really quiet lately.",
        choices: [
          { text: "I'm okay, just tired.", effect: { anxiety: 0, depression: 0, relationships: { bestFriend: 2 } } },
          { text: "I'm fine, don't worry about it.", effect: { anxiety: 2, depression: 3, relationships: { bestFriend: -1 } } },
          { text: "Actually, I'm not doing great.", effect: { anxiety: -3, depression: -2, relationships: { bestFriend: 5 } } }
        ]
      },
      {
        character: 'classmates',
        dialogue: "Hey Jamie! Want to sit with us at lunch?",
        choices: [
          { text: "Sure, that sounds good!", effect: { anxiety: -2, depression: -1, relationships: { classmates: 5 } } },
          { text: "Maybe another time.", effect: { anxiety: 3, depression: 2, relationships: { classmates: -2 } } },
          { text: "I'll think about it.", effect: { anxiety: 1, depression: 1 } }
        ]
      }
    ],
    actions: ['talk_to_friends', 'avoid_everyone', 'go_to_class', 'hide_in_bathroom']
  },
  class_math: {
    location: 'school',
    time: 9,
    initialDialogue: "The teacher announces a pop quiz. Your heart starts racing.",
    characterInteractions: [
      {
        character: 'teacher',
        dialogue: "Jamie, are you okay? You look pale. Do you need to step out?",
        choices: [
          { text: "I'm fine, I can take the quiz.", effect: { anxiety: -1, depression: -1 } },
          { text: "Can I have a minute to collect myself?", effect: { anxiety: -2, depression: -1 } },
          { text: "I need to go to the bathroom.", effect: { anxiety: 5, depression: 3 } }
        ]
      },
      {
        character: 'bestFriend',
        dialogue: "Jamie, breathe. You've got this. I'll help you study later.",
        choices: [
          { text: "Thanks, Alex. I needed that.", effect: { anxiety: -3, depression: -2, relationships: { bestFriend: 5 } } },
          { text: "I can't do this.", effect: { anxiety: 10, depression: 8, relationships: { bestFriend: -2 } } },
          { text: "I'll be okay.", effect: { anxiety: 2, depression: 1 } }
        ]
      }
    ],
    actions: ['take_quiz', 'ask_for_help', 'pretend_sick', 'panic']
  },
  lunch_break: {
    location: 'school',
    time: 12,
    initialDialogue: "Alex waves you over to their lunch table.",
    characterInteractions: [
      {
        character: 'bestFriend',
        dialogue: "Jamie, come sit with us! We've been missing you.",
        choices: [
          { text: "Thanks, I'd like that.", effect: { anxiety: -3, depression: -2, relationships: { bestFriend: 5 } } },
          { text: "I think I'll sit alone today.", effect: { anxiety: 5, depression: 8, relationships: { bestFriend: -3 } } },
          { text: "Maybe just for a little bit.", effect: { anxiety: 1, depression: 1 } }
        ]
      },
      {
        character: 'classmates',
        dialogue: "Jamie, we're planning a party this weekend. You should come!",
        choices: [
          { text: "That sounds fun, I'll think about it.", effect: { anxiety: -1, depression: -1, relationships: { classmates: 3 } } },
          { text: "I don't think I can make it.", effect: { anxiety: 3, depression: 5, relationships: { classmates: -2 } } },
          { text: "Maybe, I'll let you know.", effect: { anxiety: 0, depression: 0 } }
        ]
      }
    ],
    actions: ['join_friends', 'sit_alone', 'skip_lunch', 'call_parent']
  },
  afternoon_class: {
    location: 'school',
    time: 13,
    initialDialogue: "The English teacher asks you to read your essay out loud.",
    characterInteractions: [
      {
        character: 'teacher',
        dialogue: "Jamie, would you like to read your essay? It's really well-written.",
        choices: [
          { text: "I'll try my best.", effect: { anxiety: 5, depression: 2 } },
          { text: "Can someone else go first?", effect: { anxiety: 3, depression: 1 } },
          { text: "I'm not feeling well, can I skip?", effect: { anxiety: 8, depression: 5 } }
        ]
      },
      {
        character: 'bestFriend',
        dialogue: "Jamie, your essay is amazing. You've got this!",
        choices: [
          { text: "Thanks, Alex. That helps.", effect: { anxiety: -2, depression: -1, relationships: { bestFriend: 3 } } },
          { text: "I don't think I can do it.", effect: { anxiety: 10, depression: 8, relationships: { bestFriend: -1 } } },
          { text: "I'll try.", effect: { anxiety: 2, depression: 1 } }
        ]
      }
    ],
    actions: ['read_essay', 'ask_to_skip', 'panic_attack', 'leave_class']
  },
  school_end: {
    location: 'school',
    time: 15,
    initialDialogue: "School is over. Alex approaches you with concern.",
    characterInteractions: [
      {
        character: 'bestFriend',
        dialogue: "Jamie, you've been really quiet today. Are you okay? You can talk to me.",
        choices: [
          { text: "I'm just having a rough day.", effect: { anxiety: -2, depression: -1, relationships: { bestFriend: 5 } } },
          { text: "I'm fine, don't worry about it.", effect: { anxiety: 2, depression: 3, relationships: { bestFriend: -2 } } },
          { text: "I don't want to talk about it.", effect: { anxiety: 5, depression: 8, relationships: { bestFriend: -5 } } }
        ]
      },
      {
        character: 'mom',
        dialogue: "Jamie, I got a call from school. They're worried about you. Can we talk?",
        choices: [
          { text: "I'm okay, Mom. Just stressed.", effect: { anxiety: -1, depression: -1, relationships: { mom: 3 } } },
          { text: "I don't want to talk about it.", effect: { anxiety: 3, depression: 5, relationships: { mom: -3 } } },
          { text: "Maybe later.", effect: { anxiety: 1, depression: 2 } }
        ]
      }
    ],
    actions: ['hang_with_friends', 'go_home', 'walk_alone', 'call_parent']
  },
  home_evening: {
    location: 'bedroom',
    time: 16,
    initialDialogue: "You're back home. Your phone buzzes with messages.",
    characterInteractions: [
      {
        character: 'bestFriend',
        dialogue: "Jamie, I'm really worried about you. Can we talk? You're not yourself lately.",
        choices: [
          { text: "I'm okay, Alex. Just tired.", effect: { anxiety: 0, depression: 0, relationships: { bestFriend: 2 } } },
          { text: "I don't want to talk about it.", effect: { anxiety: 3, depression: 5, relationships: { bestFriend: -3 } } },
          { text: "Maybe we can talk tomorrow.", effect: { anxiety: 1, depression: 2 } }
        ]
      },
      {
        character: 'mom',
        dialogue: "Jamie, dinner's ready. How was your day?",
        choices: [
          { text: "It was okay, Mom.", effect: { anxiety: -1, depression: -1, relationships: { mom: 2 } } },
          { text: "I'm not hungry.", effect: { anxiety: 3, depression: 5, relationships: { mom: -2 } } },
          { text: "I'll be down in a minute.", effect: { anxiety: 0, depression: 0 } }
        ]
      }
    ],
    actions: ['do_homework', 'take_nap', 'scroll_phone', 'skip_homework']
  },
  dinner_time: {
    location: 'kitchen',
    time: 18,
    initialDialogue: "Your mom is making dinner. She looks worried.",
    characterInteractions: [
      {
        character: 'mom',
        dialogue: "Jamie, I'm really worried about you. You seem so distant lately. Can you tell me what's going on?",
        choices: [
          { text: "I'm just going through a rough patch, Mom.", effect: { anxiety: -2, depression: -1, relationships: { mom: 5 } } },
          { text: "I don't want to talk about it.", effect: { anxiety: 5, depression: 8, relationships: { mom: -5 } } },
          { text: "I'm fine, really.", effect: { anxiety: 2, depression: 3, relationships: { mom: -2 } } }
        ]
      },
      {
        character: 'dad',
        dialogue: "Son, your mom and I are worried about you. We want to help.",
        choices: [
          { text: "I know, Dad. I'm trying.", effect: { anxiety: -1, depression: -1, relationships: { dad: 3 } } },
          { text: "I don't need help.", effect: { anxiety: 3, depression: 5, relationships: { dad: -3 } } },
          { text: "Maybe we can talk later.", effect: { anxiety: 1, depression: 2 } }
        ]
      }
    ],
    actions: ['talk_about_day', 'give_short_answer', 'avoid_conversation', 'go_to_room']
  },
  bedtime: {
    location: 'bedroom',
    time: 21,
    initialDialogue: "It's getting late. Your phone shows several missed calls from Alex.",
    characterInteractions: [
      {
        character: 'bestFriend',
        dialogue: "Jamie, please talk to me. I'm really worried about you. You're not okay.",
        choices: [
          { text: "I'm okay, Alex. Just tired.", effect: { anxiety: 0, depression: 0, relationships: { bestFriend: 2 } } },
          { text: "I don't want to talk about it.", effect: { anxiety: 3, depression: 5, relationships: { bestFriend: -3 } } },
          { text: "Maybe tomorrow.", effect: { anxiety: 1, depression: 2 } }
        ]
      },
      {
        character: 'mom',
        dialogue: "Jamie, I'm here if you need to talk. I love you.",
        choices: [
          { text: "I love you too, Mom.", effect: { anxiety: -2, depression: -1, relationships: { mom: 5 } } },
          { text: "Goodnight, Mom.", effect: { anxiety: 0, depression: 0 } },
          { text: "Whatever.", effect: { anxiety: 3, depression: 5, relationships: { mom: -5 } } }
        ]
      }
    ],
    actions: ['go_to_sleep', 'stay_up_late', 'take_medication', 'read_book']
  }
};

// Multiple Endings System
const endings = {
  recovery: {
    title: "The Road to Healing",
    description: "Jamie sought help, opened up to loved ones, and began the long journey of recovery. While the road ahead isn't easy, there's hope and support.",
    requirements: { depression: "< 40", anxiety: "< 50", relationships: { mom: "> 70", bestFriend: "> 75" } }
  },
  crisis_help: {
    title: "Crisis Averted",
    description: "Jamie reached out during a crisis and got immediate help. The road to recovery begins with professional support and loved ones' care.",
    requirements: { storyFlags: { reachedOutForHelp: true, calledCrisisLine: true } }
  },
  overdose: {
    title: "The Breaking Point",
    description: "Jamie's pain became too much to bear alone. An overdose attempt led to hospitalization and intensive treatment. Recovery is possible, but the journey is long.",
    requirements: { storyFlags: { attemptedOverdose: true } }
  },
  suicide: {
    title: "The Final Goodbye",
    description: "Jamie's internal pain became unbearable. The world lost a beautiful soul who was suffering in silence. This ending highlights the importance of reaching out for help.",
    requirements: { depression: "> 90", anxiety: "> 85", storyFlags: { selfHarmed: true } }
  },
  isolation: {
    title: "Fading Away",
    description: "Jamie withdrew completely, cutting off all support systems. The isolation deepened the depression, creating a cycle that's hard to break alone.",
    requirements: { relationships: { mom: "< 30", bestFriend: "< 20" }, depression: "> 70" }
  },
  partial_recovery: {
    title: "One Day at a Time",
    description: "Jamie is struggling but making small steps forward. Some days are better than others, and that's okay. Recovery isn't linear.",
    requirements: { depression: "< 60", anxiety: "< 70" }
  },
  continued_struggle: {
    title: "The Daily Battle",
    description: "Jamie continues to struggle with mental health issues. Some days are harder than others, but they're still fighting. Hope exists even in darkness.",
    requirements: { depression: "> 50", anxiety: "> 50" }
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

// Load scene with interactive dialogue
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
  
  // Show initial dialogue
  dialogueText.textContent = scene.initialDialogue;
  
  // Start character interactions
  startCharacterInteractions(scene.characterInteractions);
  
  // Update actions
  updateActions(scene.actions);
}

// Show narrative sequence
function showNarrative(narrativeLines, callback) {
  if (!narrativeLines || narrativeLines.length === 0) {
    callback();
    return;
  }

  let currentLine = 0;
  
  function showNextLine() {
    if (currentLine < narrativeLines.length) {
      dialogueText.textContent = narrativeLines[currentLine];
      currentLine++;
      setTimeout(showNextLine, 3000);
    } else {
      callback();
    }
  }
  
  showNextLine();
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
    read_book: "Read Book",
    call_crisis_line: "Call Crisis Line",
    text_friend: "Text Friend",
    self_harm: "Self Harm",
    overdose: "Take All Medication"
  };
  return texts[action] || action;
}

// Make choice with character dialogue
function makeChoice(choice) {
  // Apply effects
  if (choice.effect) {
    Object.keys(choice.effect).forEach(key => {
      if (gameState[key] !== undefined) {
        if (typeof gameState[key] === 'object') {
          Object.keys(choice.effect[key]).forEach(subKey => {
            gameState[key][subKey] = Math.max(0, Math.min(100, gameState[key][subKey] + choice.effect[key][subKey]));
          });
        } else {
          gameState[key] = Math.max(0, Math.min(100, gameState[key] + choice.effect[key]));
        }
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
  
  // Show character response
  showCharacterResponse(choice);
  
  // Progress to next scene after delay
  setTimeout(() => {
    progressToNextScene();
  }, 3000);
}

// Show character response to choice
function showCharacterResponse(choice) {
  const responses = {
    positive: [
      "That's good to hear.",
      "I'm glad you're feeling better.",
      "That makes me happy.",
      "I'm here for you."
    ],
    neutral: [
      "Okay, I understand.",
      "That's fine.",
      "I'm here if you need me.",
      "Take your time."
    ],
    negative: [
      "I'm worried about you.",
      "Are you sure you're okay?",
      "I want to help.",
      "Please talk to me."
    ]
  };
  
  // Determine response type based on choice effect
  let responseType = 'neutral';
  if (choice.effect) {
    const totalEffect = Object.values(choice.effect).reduce((sum, val) => sum + (typeof val === 'object' ? Object.values(val).reduce((a, b) => a + b, 0) : val), 0);
    if (totalEffect > 0) responseType = 'negative';
    else if (totalEffect < 0) responseType = 'positive';
  }
  
  const response = responses[responseType][Math.floor(Math.random() * responses[responseType].length)];
  dialogueText.textContent = response;
}

// Show character reactions based on choices
function showCharacterReactions() {
  const scene = scenes[gameState.currentScene];
  const reactions = [];
  
  if (gameState.anxiety > 70) {
    reactions.push("Alex looks worried and asks if you're okay.");
  }
  
  if (gameState.depression > 70) {
    reactions.push("Your mom notices you're not eating and asks what's wrong.");
  }
  
  if (gameState.relationships.mom < 50) {
    reactions.push("Your mom seems frustrated that you won't talk to her.");
  }
  
  if (gameState.relationships.bestFriend < 50) {
    reactions.push("Alex seems distant, like they don't know how to help.");
  }
  
  if (reactions.length > 0) {
    dialogueText.textContent = reactions[Math.floor(Math.random() * reactions.length)];
  }
}

// Perform action with consequences
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
    talk_to_friends: { anxiety: -5, depression: -3, relationships: { bestFriend: 5 } },
    avoid_everyone: { anxiety: 5, depression: 3, relationships: { bestFriend: -5 } },
    go_to_class: { anxiety: -1 },
    hide_in_bathroom: { anxiety: 8, depression: 5 },
    take_quiz: { anxiety: 10, depression: 5 },
    ask_for_help: { anxiety: -3, depression: -1 },
    pretend_sick: { anxiety: 15, depression: 8 },
    panic: { anxiety: 25, depression: 10 },
    join_friends: { anxiety: -3, depression: -2, relationships: { bestFriend: 3 } },
    sit_alone: { anxiety: 5, depression: 3 },
    skip_lunch: { anxiety: 3, depression: 5 },
    call_parent: { anxiety: -5, depression: -2, relationships: { mom: 5 } },
    read_essay: { anxiety: 15, depression: 8 },
    ask_to_skip: { anxiety: 10, depression: 5 },
    panic_attack: { anxiety: 30, depression: 15, storyFlags: { hadPanicAttack: true } },
    leave_class: { anxiety: 20, depression: 10 },
    hang_with_friends: { anxiety: -3, depression: -2, relationships: { bestFriend: 3 } },
    go_home: { anxiety: -1 },
    walk_alone: { anxiety: 3, depression: 2 },
    do_homework: { anxiety: -2, depression: -1 },
    take_nap: { sleep: 15, anxiety: -5 },
    scroll_phone: { anxiety: 3, depression: 2 },
    skip_homework: { anxiety: 5, depression: 3 },
    talk_about_day: { anxiety: -3, depression: -2, relationships: { mom: 5 } },
    give_short_answer: { anxiety: 0, depression: 0 },
    avoid_conversation: { anxiety: 5, depression: 3, relationships: { mom: -5 } },
    go_to_room: { anxiety: 3, depression: 2 },
    go_to_sleep: { sleep: 10, anxiety: -3 },
    stay_up_late: { sleep: -10, anxiety: 5 },
    read_book: { anxiety: -2, depression: -1 },
    call_crisis_line: { anxiety: -10, depression: -5, storyFlags: { calledCrisisLine: true, reachedOutForHelp: true } },
    text_friend: { anxiety: -3, depression: -2, relationships: { bestFriend: 5 } },
    self_harm: { anxiety: 20, depression: 15, storyFlags: { selfHarmed: true } },
    overdose: { anxiety: 50, depression: 30, storyFlags: { attemptedOverdose: true } }
  };

  if (effects[action]) {
    Object.keys(effects[action]).forEach(key => {
      if (gameState[key] !== undefined) {
        if (typeof gameState[key] === 'object') {
          Object.keys(effects[action][key]).forEach(subKey => {
            gameState[key][subKey] = Math.max(0, Math.min(100, gameState[key][subKey] + effects[action][key][subKey]));
          });
        } else {
          gameState[key] = Math.max(0, Math.min(100, gameState[key] + effects[action][key]));
        }
      }
    });
  }

  // Special story flags
  if (effects[action] && effects[action].storyFlags) {
    Object.keys(effects[action].storyFlags).forEach(flag => {
      gameState.storyFlags[flag] = effects[action].storyFlags[flag];
    });
  }

  updateStatusBars();
  
  // Special actions
  if (action === 'take_medication') {
    takeMedication();
  }
  
  if (action === 'call_crisis_line') {
    showCrisisLineDialogue();
  }
  
  if (action === 'self_harm') {
    showSelfHarmWarning();
  }
  
  if (action === 'overdose') {
    showOverdoseWarning();
  }
  
  // Progress to next scene
  setTimeout(() => {
    progressToNextScene();
  }, 2000);
}

// Show crisis line dialogue
function showCrisisLineDialogue() {
  const crisisDialogues = [
    "The person on the other end of the line is calm and understanding.",
    "'You're not alone in this,' they say. 'We're here to help.'",
    "They help you create a safety plan for when things get really bad.",
    "You feel a little less alone after talking to them.",
    "They remind you that it's okay to ask for help."
  ];
  
  dialogueText.textContent = crisisDialogues[Math.floor(Math.random() * crisisDialogues.length)];
}

// Show self-harm warning
function showSelfHarmWarning() {
  dialogueText.textContent = "The pain feels overwhelming, and you think this might make it stop. But deep down, you know this isn't the answer.";
}

// Show overdose warning
function showOverdoseWarning() {
  dialogueText.textContent = "You look at your medication bottle, thinking about how easy it would be to just... stop feeling. But something inside you hesitates.";
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

// End day and check for endings
function endDay() {
  // Check for immediate crisis endings
  if (gameState.storyFlags.attemptedOverdose) {
    showEnding('overdose');
    return;
  }
  
  if (gameState.depression > 90 && gameState.anxiety > 85 && gameState.storyFlags.selfHarmed) {
    showEnding('suicide');
    return;
  }
  
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

// Show ending
function showEnding(endingType) {
  const ending = endings[endingType];
  if (!ending) return;
  
  const endingScreen = document.createElement('div');
  endingScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    color: white;
  `;
  
  endingScreen.innerHTML = `
    <h1>${ending.title}</h1>
    <p style="max-width: 600px; line-height: 1.6; margin: 20px;">${ending.description}</p>
    <p style="font-size: 14px; margin-top: 20px;">If you or someone you know is struggling, please reach out for help:</p>
    <p style="font-size: 14px;">National Crisis Line: 988</p>
    <p style="font-size: 14px;">Crisis Text Line: Text HOME to 741741</p>
    <button onclick="location.reload()" style="margin-top: 20px;">Start Over</button>
  `;
  
  document.body.appendChild(endingScreen);
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

// Start character interactions
function startCharacterInteractions(interactions) {
  if (!interactions || interactions.length === 0) {
    updateChoices([]);
    return;
  }

  let currentInteraction = 0;
  
  function showNextInteraction() {
    if (currentInteraction < interactions.length) {
      const interaction = interactions[currentInteraction];
      
      // Show character dialogue
      setTimeout(() => {
        dialogueText.textContent = interaction.dialogue;
        
        // Show choices
        updateChoices(interaction.choices);
      }, 2000);
      
      currentInteraction++;
    }
  }
  
  // Start with first interaction
  showNextInteraction();
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

// 20-Step Gradual Progression Scenarios
const progressionScenarios = {
  // Steps 1-5: Early signs and mild symptoms
  1: {
    location: "bedroom",
    name: "Your Room - Morning",
    text: "You wake up feeling tired despite sleeping 8 hours. Everything feels a bit gray today.",
    choices: [
      { text: "Get up and start the day", action: 'healthy_start', anxiety: -2, depression: -1 },
      { text: "Stay in bed a bit longer", action: 'minor_avoidance', depression: 2, selfCareNeglect: 1 },
      { text: "Check social media", action: 'social_comparison', anxiety: 3, depression: 1 },
      { text: "Call a friend", action: 'reach_out', anxiety: -3, supportSystem: 1 }
    ]
  },
  
  2: {
    location: "kitchen",
    name: "Kitchen",
    text: "You haven't been eating much lately. The fridge seems emptier than usual.",
    choices: [
      { text: "Make a proper breakfast", action: 'self_care', depression: -2, selfCareNeglect: -1 },
      { text: "Just grab coffee", action: 'skip_meal', selfCareNeglect: 2, anxiety: 1 },
      { text: "Order takeout again", action: 'convenience_food', selfCareNeglect: 1 },
      { text: "Don't eat anything", action: 'neglect_nutrition', depression: 3, selfCareNeglect: 3 }
    ]
  },
  
  3: {
    location: "school",
    name: "Classroom",
    text: "You're having trouble concentrating in class. The professor's words seem to blur together.",
    choices: [
      { text: "Try to focus harder", action: 'push_through', anxiety: 2 },
      { text: "Take notes anyway", action: 'maintain_routine', depression: -1 },
      { text: "Daydream instead", action: 'mental_escape', academicDecline: 1, depression: 1 },
      { text: "Leave class early", action: 'academic_avoidance', academicDecline: 2, socialWithdrawal: 1 }
    ]
  },
  
  4: {
    location: "social",
    name: "Campus Cafeteria",
    text: "Your friends invite you to lunch, but you feel disconnected from their conversation.",
    choices: [
      { text: "Join in the conversation", action: 'social_effort', anxiety: 1, socialWithdrawal: -1 },
      { text: "Listen quietly", action: 'passive_social', socialWithdrawal: 1 },
      { text: "Make an excuse to leave", action: 'social_avoidance', socialWithdrawal: 2, isolationLevel: 1 },
      { text: "Sit alone instead", action: 'self_isolate', isolationLevel: 2, depression: 2 }
    ]
  },
  
  5: {
    location: "bedroom",
    name: "Your Room - Evening",
    text: "You've been spending more time alone in your room. It feels safer here.",
    choices: [
      { text: "Do some homework", action: 'productive_time', academicDecline: -1, depression: -1 },
      { text: "Watch TV/Netflix", action: 'passive_coping', depression: 1 },
      { text: "Scroll social media", action: 'comparison_trap', anxiety: 2, depression: 2 },
      { text: "Just lie in bed", action: 'withdrawal', isolationLevel: 2, depression: 2 }
    ]
  },
  
  // Steps 6-10: Escalating symptoms
  6: {
    location: "bedroom",
    name: "Your Room - Late Night",
    text: "Sleep doesn't come easily anymore. You lie awake thinking about everything wrong.",
    choices: [
      { text: "Try relaxation techniques", action: 'healthy_coping', anxiety: -2, sleep: 5 },
      { text: "Take a sleeping pill", action: 'medication_reliance', substanceUse: 1, sleep: 3 },
      { text: "Drink alcohol to sleep", action: 'substance_coping', substanceUse: 2, riskBehaviors: 1 },
      { text: "Stay awake all night", action: 'sleep_avoidance', anxiety: 3, sleep: -10 }
    ]
  },
  
  7: {
    location: "bathroom",
    name: "Bathroom Mirror",
    text: "You barely recognize yourself. When did you start looking so tired and hollow?",
    choices: [
      { text: "Try to improve appearance", action: 'self_care_attempt', depression: -1, selfCareNeglect: -1 },
      { text: "Avoid looking in mirrors", action: 'appearance_avoidance', selfCareNeglect: 2 },
      { text: "Criticize your appearance", action: 'self_criticism', depression: 3, anxiety: 2 },
      { text: "Consider self-harm", action: 'first_dark_thought', riskBehaviors: 1, suicidalIdeation: 1 }
    ]
  },
  
  8: {
    location: "social",
    name: "Friend's Text Messages",
    text: "You have 12 unread messages from friends asking if you're okay. You haven't responded in days.",
    choices: [
      { text: "Reply honestly about struggling", action: 'honest_communication', supportSystem: 2, anxiety: -2 },
      { text: "Send a brief 'I'm fine'", action: 'deflect_concern', socialWithdrawal: 1 },
      { text: "Read but don't respond", action: 'passive_isolation', isolationLevel: 2, supportSystem: -1 },
      { text: "Turn off your phone", action: 'complete_withdrawal', isolationLevel: 3, supportSystem: -2 }
    ]
  },
  
  9: {
    location: "school",
    name: "Professor's Office",
    text: "Your professor asks about your declining grades and missed assignments.",
    choices: [
      { text: "Explain you're struggling", action: 'seek_academic_help', academicDecline: -1, supportSystem: 1 },
      { text: "Make excuses", action: 'academic_dishonesty', academicDecline: 1, anxiety: 2 },
      { text: "Promise to do better", action: 'false_commitment', anxiety: 3 },
      { text: "Consider dropping out", action: 'academic_despair', academicDecline: 3, hopelessnessLevel: 2 }
    ]
  },
  
  10: {
    location: "bedroom",
    name: "Your Room - Weekend",
    text: "You've spent the entire weekend in bed. The outside world feels impossible to face.",
    choices: [
      { text: "Force yourself outside", action: 'push_boundaries', anxiety: 2, isolationLevel: -1 },
      { text: "Order food delivery", action: 'minimal_function', selfCareNeglect: 1 },
      { text: "Don't eat at all", action: 'self_neglect', selfCareNeglect: 3, depression: 2 },
      { text: "Research therapy options", action: 'help_seeking', anxiety: 1, hasTherapy: true }
    ]
  },
  
  // Steps 11-15: Serious decline and risky behaviors
  11: {
    location: "party",
    name: "House Party",
    text: "You're at a party, drinking heavily to numb the pain. Everything feels distant and unreal.",
    choices: [
      { text: "Stop drinking and go home", action: 'responsible_choice', substanceUse: -1, anxiety: 2 },
      { text: "Keep drinking to forget", action: 'heavy_drinking', substanceUse: 3, riskBehaviors: 2 },
      { text: "Try drugs someone offers", action: 'drug_experimentation', substanceUse: 4, riskBehaviors: 3 },
      { text: "Drive home drunk", action: 'dangerous_behavior', riskBehaviors: 4, suicidalIdeation: 1 }
    ]
  },
  
  12: {
    location: "bedroom",
    name: "Your Room - 3 AM",
    text: "You're researching self-harm online. The thoughts are getting louder and more persistent.",
    choices: [
      { text: "Close the browser", action: 'resist_urges', suicidalIdeation: -1, anxiety: 2 },
      { text: "Call a crisis hotline", action: 'crisis_help', suicidalIdeation: -2, hasTherapy: true },
      { text: "Keep reading", action: 'self_harm_research', suicidalIdeation: 2, riskBehaviors: 2 },
      { text: "Look for methods", action: 'method_research', suicidalIdeation: 3, hopelessnessLevel: 2 }
    ]
  },
  
  13: {
    location: "bathroom",
    name: "Bathroom - Late Night",
    text: "You're holding a razor blade, feeling the weight of it. The pain inside wants to become physical.",
    choices: [
      { text: "Put it down and leave", action: 'resist_self_harm', suicidalIdeation: -1, anxiety: 3 },
      { text: "Make a small cut", action: 'minor_self_harm', riskBehaviors: 2, suicidalIdeation: 1 },
      { text: "Cut deeper", action: 'serious_self_harm', riskBehaviors: 4, suicidalIdeation: 2 },
      { text: "Call someone for help", action: 'emergency_reach_out', supportSystem: 2, hasTherapy: true }
    ]
  },
  
  14: {
    location: "pharmacy",
    name: "Pharmacy",
    text: "You're staring at bottles of pills, calculating dosages. The pharmacist asks if you need help.",
    choices: [
      { text: "Just buy what you need", action: 'normal_purchase', anxiety: 1 },
      { text: "Buy extra 'just in case'", action: 'stockpile_meds', riskBehaviors: 2, suicidalIdeation: 2 },
      { text: "Ask about overdose risks", action: 'research_overdose', suicidalIdeation: 3, hopelessnessLevel: 2 },
      { text: "Leave without buying", action: 'avoid_temptation', suicidalIdeation: -1, anxiety: 2 }
    ]
  },
  
  15: {
    location: "bridge",
    name: "Highway Overpass",
    text: "You find yourself on a bridge, looking down at traffic. The drop looks so final, so peaceful.",
    choices: [
      { text: "Step back from the edge", action: 'safety_step', suicidalIdeation: -1, anxiety: 3 },
      { text: "Climb over the barrier", action: 'dangerous_position', riskBehaviors: 5, suicidalIdeation: 4 },
      { text: "Call someone", action: 'crisis_call', supportSystem: 2, suicidalIdeation: -2 },
      { text: "Write a goodbye note", action: 'suicide_note', hopelessnessLevel: 4, suicidalIdeation: 3 }
    ]
  },
  
  // Steps 16-20: Critical decision points
  16: {
    location: "bedroom",
    name: "Your Room - Final Night",
    text: "You've written the note. Made the plan. Tonight feels different. Final. But doubt creeps in.",
    choices: [
      { text: "Delete everything", action: 'change_mind', suicidalIdeation: -3, hopelessnessLevel: -2 },
      { text: "Take the pills", action: 'attempt_overdose', riskBehaviors: 8, suicidalIdeation: 6 },
      { text: "Call crisis line", action: 'last_minute_help', supportSystem: 3, hasTherapy: true },
      { text: "Go to the bridge", action: 'final_walk', riskBehaviors: 6, suicidalIdeation: 5 }
    ]
  },
  
  17: {
    location: "hospital",
    name: "Emergency Room",
    text: "You're in the ER after someone found you. Tubes, machines, concerned faces. You're alive.",
    choices: [
      { text: "Cooperate with treatment", action: 'accept_help', hasTherapy: true, supportSystem: 2 },
      { text: "Refuse to talk", action: 'resist_treatment', isolationLevel: 2, hopelessnessLevel: 1 },
      { text: "Ask for help", action: 'genuine_plea', supportSystem: 3, suicidalIdeation: -2 },
      { text: "Plan to try again", action: 'persistent_ideation', suicidalIdeation: 2, hopelessnessLevel: 2 }
    ]
  },
  
  18: {
    location: "therapy",
    name: "Therapist's Office",
    text: "First therapy session. The therapist asks about your feelings. You could lie or tell the truth.",
    choices: [
      { text: "Tell them everything", action: 'honest_therapy', supportSystem: 3, suicidalIdeation: -3 },
      { text: "Minimize your problems", action: 'therapy_resistance', hopelessnessLevel: 1 },
      { text: "Focus on practical issues", action: 'surface_therapy', anxiety: -1 },
      { text: "Walk out", action: 'reject_help', isolationLevel: 3, supportSystem: -2 }
    ]
  },
  
  19: {
    location: "family",
    name: "Family Intervention",
    text: "Your family has gathered. They know about your struggles. Tears, love, and desperation fill the room.",
    choices: [
      { text: "Accept their help", action: 'family_support', supportSystem: 4, suicidalIdeation: -4 },
      { text: "Push them away", action: 'reject_family', isolationLevel: 4, supportSystem: -3 },
      { text: "Promise to get better", action: 'false_promise', anxiety: 2, hopelessnessLevel: 1 },
      { text: "Break down and cry", action: 'emotional_release', depression: -2, supportSystem: 2 }
    ]
  },
  
  20: {
    location: "crossroads",
    name: "The Final Choice",
    text: "This is it. The culmination of everything. Your choices have led you here. What will you choose?",
    choices: [
      { text: "Choose to live and fight", action: 'choose_life', suicidalIdeation: -5, supportSystem: 2 },
      { text: "Give up completely", action: 'final_surrender', hopelessnessLevel: 8, suicidalIdeation: 8 },
      { text: "Seek intensive help", action: 'intensive_treatment', hasTherapy: true, supportSystem: 4 },
      { text: "Make one last attempt", action: 'final_attempt', riskBehaviors: 10, suicidalIdeation: 10 }
    ]
  }
};

// Game State - Gradual Progression
// Game state with 20-step progression system
let gameState = {
  // Original metrics
  anxiety: 50,
  depression: 50,
  sleep: 50,
  
  // New detailed progression metrics
  isolationLevel: 0,
  substanceUse: 0,
  selfCareNeglect: 0,
  socialWithdrawal: 0,
  academicDecline: 0,
  riskBehaviors: 0,
  hopelessnessLevel: 0,
  suicidalIdeation: 0,
  supportSystem: 0,
  
  // Game state tracking
  currentLocation: 'bedroom',
  timeOfDay: 'morning',
  dayCount: 1,
  progressionStep: 1, // 1-20 step progression
  hasCalledForHelp: false,
  hasTherapy: false,
  inCrisis: false,
  gameOver: false,
  
  // Story progression tracking
  choicesMade: [],
  negativeChoices: 0,
  helpSeekingAttempts: 0
};

// Function to get current progression scenario
function getCurrentScenario() {
  return progressionScenarios[gameState.progressionStep] || progressionScenarios[20];
}

// Function to advance to next progression step
function advanceProgression() {
  if (gameState.progressionStep < 20) {
    gameState.progressionStep++;
  }
}

// Horror intrusive thoughts and triggers
const intrusiveThoughts = [
  "DO IT. END THE SUFFERING.",
  "THEY'RE ALL WATCHING YOU DIE INSIDE",
  "THE PILLS ARE CALLING YOUR NAME",
  "JUMP. JUST JUMP.",
  "CUT DEEPER THIS TIME",
  "NOBODY WILL MISS YOU",
  "THE VOICES KNOW THE TRUTH",
  "YOU'RE ALREADY DEAD INSIDE",
  "EMBRACE THE DARKNESS",
  "LET GO. LET GO. LET GO.",
  "THE RAZOR BLADE UNDERSTANDS",
  "ONE FINAL BREATH"
];

// Expanded game over scenarios with varied and realistic outcomes
const gameOverScenarios = {
  // Suicide completion - realistic aftermath
  suicide_complete: {
    title: "THE END",
    text: "You are gone. The pain you felt was real, but so was the love others had for you. Your family finds your body three days later. Your mother collapses. Your father hasn't spoken since. Your best friend blames themselves for not seeing the signs. The funeral is small but heartbroken. People share memories of your laugh, your kindness, the way you helped them through their own dark times. They wish they could have helped you through yours. The world is a little darker without you in it.",
    outcome: "SUICIDE - PERMANENT SOLUTION TO TEMPORARY PAIN"
  },
  
  // Overdose completion
  overdose_complete: {
    title: "OVERDOSE",
    text: "The pills take you slowly. Your roommate finds you unconscious, foam at your lips. The paramedics work frantically, but it's too late. Your parents get the call at 3 AM. Your mother screams. The hospital room is sterile and cold. Your friends gather, crying, sharing stories of who you used to be before the darkness took hold. They start a scholarship in your name, hoping to help others get the mental health support you never received.",
    outcome: "ACCIDENTAL OVERDOSE - A LIFE CUT SHORT"
  },
  
  // Complete isolation
  complete_isolation: {
    title: "ALONE",
    text: "You disappear from everyone's life completely. No calls, no texts, no social media. You become a ghost in your own existence. Months pass. You survive on delivery food and online shopping. Your body weakens, your mind fragments. Eventually, your landlord finds you after neighbors complain about the smell. You died alone, but you had been dead inside for much longer.",
    outcome: "SOCIAL DEATH FOLLOWED BY PHYSICAL DEATH"
  },
  
  // Recovery path - positive ending
  recovery_path: {
    title: "HOPE",
    text: "It wasn't easy. Therapy was painful, medication had side effects, and some days you still wanted to give up. But slowly, very slowly, the fog began to lift. You learned coping strategies, rebuilt relationships, found purpose again. Two years later, you volunteer at a crisis hotline, helping others who feel the way you once did. You still have bad days, but now you have tools to handle them. You're alive, and you're grateful for it.",
    outcome: "RECOVERY - THE LONG ROAD TO HEALING"
  },
  
  // Hospitalization
  hospitalization: {
    title: "INTERVENTION",
    text: "The 72-hour hold becomes a week, then two weeks. The psychiatric ward is stark and institutional, but the staff care. You meet others fighting similar battles. Group therapy is awkward at first, but you begin to open up. Your family visits daily, their eyes red from crying. Slowly, you start to believe that maybe, just maybe, you're worth saving. Discharge comes with a treatment plan and a network of support you didn't know existed.",
    outcome: "PSYCHIATRIC HOSPITALIZATION - CRISIS INTERVENTION"
  },
  
  // Academic failure path
  academic_failure: {
    title: "DROPOUT",
    text: "You stop going to classes entirely. Emails from professors pile up unread. Your GPA plummets. Eventually, you're placed on academic probation, then suspended. Your parents are devastated - they sacrificed so much for your education. You move back home, sleeping in your childhood bedroom, feeling like a failure. The degree you worked toward for years is gone, and with it, your sense of future.",
    outcome: "ACADEMIC FAILURE - DREAMS DEFERRED"
  },
  
  // Addiction path
  addiction_spiral: {
    title: "ADDICTION",
    text: "What started as coping became dependence, then addiction. You lose your job, your apartment, your relationships. Your family stages interventions you ignore. You steal from friends to buy substances. Rock bottom has a basement, and you keep digging. Years pass in a haze of highs and withdrawals. Some addicts recover; others don't. Your story is still being written, but each day makes recovery harder.",
    outcome: "SUBSTANCE ADDICTION - THE SLOW DESTRUCTION"
  },
  
  // Legacy endings for compatibility
  suicide_jump: {
    title: "THE END",
    text: "The wind rushes past. For a moment, you feel free. Then... nothing.\n\nYou are gone now. Your mother finds your note three days later. She screams until her voice breaks. Your father doesn't speak for weeks. Your little sister keeps asking when you're coming home. Your best friend blames themselves for not calling that night. The funeral is small but devastating. Everyone wonders what they could have done differently. The pain you wanted to end has only transferred to everyone who loved you. They will carry this weight forever.",
    outcome: "SUICIDE"
  },
  overdose_complete: {
    title: "FADE TO BLACK",
    text: "The pills take effect. Your vision blurs. The pain finally stops.\n\nYour roommate finds you the next morning. The paramedics try for twenty minutes but it's too late. Your parents drive through the night, crying and praying. Your mom keeps calling your phone just to hear your voicemail. Your dad cleans out your room and breaks down holding your childhood stuffed animal. Your friends share memories on social media, wishing they had reached out more. The college holds a memorial service. Everyone talks about mental health awareness now, but you're not here to see the change you wanted.",
    outcome: "OVERDOSE"
  },
  complete_madness: {
    title: "CONSUMED",
    text: "The voices have won. You are no longer you. You are theirs now.\n\nYou're found three days later, catatonic and unresponsive. The psychiatric ward becomes your new home. Your family visits every day at first, then every week, then monthly. You don't recognize them anymore. The medications help sometimes, but the real you is buried deep beneath layers of broken synapses and chemical imbalances. Your mother still talks to you like you're listening. Sometimes, in brief moments of clarity, you remember who you used to be. But those moments fade quickly back into the endless gray.",
    outcome: "OVERTAKEN"
  },
  self_harm_fatal: {
    title: "CRIMSON RELEASE",
    text: "The blade goes too deep. The red flows like a river. Peace at last.\n\nYour neighbor hears the music playing too loud for too long and calls for a wellness check. The police break down the door. The scene haunts the first responder for years. Your therapist blames themselves for missing the signs. Your scars told a story of pain that no one fully understood until it was too late. Your journal, found beside you, reveals the depth of your struggle. Your family starts a foundation in your name, hoping to help others like you. But they would trade it all to have you back.",
    outcome: "SELF-HARM"
  },
  drowning_complete: {
    title: "BENEATH THE SURFACE",
    text: "The water fills your lungs. The struggle ends. Silence.\n\nThe bathtub overflows for hours before anyone notices. Your landlord finds you when the downstairs neighbor complains about water damage. Your phone has seventeen missed calls from people who cared. Your last text, unsent, says 'I'm sorry.' Your funeral is held by the lake where you used to go as a child. Your grandmother, who taught you to swim, can't stop crying. The water you once loved became your escape. Everyone wishes they had known how to throw you a lifeline.",
    outcome: "DROWNING"
  }
};

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
  showIntroScreen();
  setupEventListeners();
});

function setupEventListeners() {
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }
}

function showIntroScreen() {
  const introText = document.getElementById('introText');
  const introMessage = `"The Final Day?" - A Horror Experience

Descent into the abyss of a mind consumed by darkness.

⚠️ EXTREME CONTENT WARNING ⚠️

This experience contains explicit depictions of:
- Suicide and self-harm
- Drug overdose
- Mental breakdown and psychosis
- Graphic descriptions of death
- Psychological horror

This is not suitable for anyone under 18 or those currently struggling with mental health.

If you are in crisis:
- National Crisis Line: 988
- Crisis Text Line: Text HOME to 741741

This is a work of horror fiction.
Proceed at your own risk.`;
  
  if (introText) {
    typeText(introText, introMessage, () => {
      setTimeout(() => {
        document.getElementById('introScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'flex';
        // Update game screen text
        const gameScreenH1 = document.querySelector('#gameScreen h1');
        const startBtn = document.getElementById('startBtn');
        if (gameScreenH1) gameScreenH1.textContent = 'Enter the Abyss';
        if (startBtn) startBtn.textContent = 'Descend Into Darkness';
      }, 3000);
    });
  }
}

function typeText(element, text, callback) {
  element.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, 30);
}

function startGame() {
  gameState.gameStarted = true;
  document.getElementById('gameScreen').style.display = 'none';
  document.getElementById('mainGame').style.display = 'block';
  
  // Initialize progression system
  gameState.progressionStep = 1;
  gameState.anxiety = 50;
  gameState.depression = 50;
  
  updateUI();
  
  // Show the first scenario choices
  setTimeout(() => {
    showChoices();
  }, 100);
  
  startRandomEvents();
  startHorrorEffects();
}

function startHorrorEffects() {
  // More frequent and intense effects
  setInterval(() => {
    if (gameState.gameStarted && Math.random() < 0.1) {
      showHorrorDistortion();
    }
  }, 8000);
  
  // Whispers and static
  setInterval(() => {
    if (gameState.gameStarted && Math.random() < 0.1) {
      playStaticNoise();
    }
  }, 12000);
}

function showHorrorDistortion() {
  document.body.style.filter = 'invert(1) contrast(2)';
  setTimeout(() => {
    document.body.style.filter = 'contrast(1.2) brightness(0.9) grayscale(1)';
  }, 200);
}

function playStaticNoise() {
  // Visual static effect
  const static = document.createElement('div');
  static.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.1) 0px,
      rgba(255,255,255,0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 9999;
    animation: staticFlicker 0.1s infinite;
  `;
  
  document.body.appendChild(static);
  setTimeout(() => static.remove(), 1000);
}

function triggerGameOver(scenario) {
  const gameOver = gameOverScenarios[scenario];
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    text-align: center;
    font-family: 'Courier New', monospace;
  `;
  
  overlay.innerHTML = `
    <h1 style="font-size: 48px; margin-bottom: 30px; text-shadow: 0 0 20px #ffffff;">${gameOver.title}</h1>
    <p style="font-size: 24px; max-width: 600px; line-height: 1.6; margin-bottom: 40px;">${gameOver.text}</p>
    <p style="font-size: 18px; color: #cccccc; margin-bottom: 30px;">OUTCOME: ${gameOver.outcome}</p>
    <button onclick="location.reload()" style="
      padding: 15px 30px;
      font-size: 18px;
      background: #333333;
      border: 2px solid #ffffff;
      color: #ffffff;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 2px;
    ">RESTART</button>
  `;
  
  document.body.appendChild(overlay);
  gameState.gameStarted = false;
}


function updateUI() {
  if (!gameState.currentTime) gameState.currentTime = '7:00 AM';

  document.getElementById('anxietyBar').style.width = gameState.anxiety + '%';
  document.getElementById('depressionBar').style.width = gameState.depression + '%';
  document.getElementById('sleepBar').style.width = gameState.sleep + '%';

  document.getElementById('currentTime').textContent = gameState.currentTime;
  document.getElementById('currentDay').textContent = `Day ${gameState.dayCount}`;

  const scenario = getCurrentScenario();
  document.getElementById('currentLocation').textContent = scenario.name;

  const sceneBackground = document.getElementById('sceneBackground');
  sceneBackground.className = `scene-background ${scenario.location}-scene`;

  checkMentalHealthStatus();
}


function loadScenario(locationKey) {
  gameState.location = locationKey;
  const location = locations[locationKey];
  const scenario = location.scenarios[Math.floor(Math.random() * location.scenarios.length)];
  
  const dialogueText = document.getElementById('dialogueText');
  const dialogueChoices = document.getElementById('dialogueChoices');
  
  dialogueText.textContent = scenario.text;
  
  // Clear previous choices
  dialogueChoices.innerHTML = '';
  
  // Add new choices
  scenario.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.textContent = choice.text;
    button.onclick = () => makeChoice(choice);
    dialogueChoices.appendChild(button);
  });
}

function makeChoice(choice) {
  // Update all mental health stats including new progression metrics
  if (choice.anxiety) gameState.anxiety = Math.max(0, Math.min(100, gameState.anxiety + choice.anxiety));
  if (choice.depression) gameState.depression = Math.max(0, Math.min(100, gameState.depression + choice.depression));
  if (choice.sleep) gameState.sleep = Math.max(0, Math.min(100, gameState.sleep + choice.sleep));
  
  // Update new progression metrics
  if (choice.isolationLevel) gameState.isolationLevel = Math.max(0, Math.min(10, gameState.isolationLevel + choice.isolationLevel));
  if (choice.substanceUse) gameState.substanceUse = Math.max(0, Math.min(10, gameState.substanceUse + choice.substanceUse));
  if (choice.selfCareNeglect) gameState.selfCareNeglect = Math.max(0, Math.min(10, gameState.selfCareNeglect + choice.selfCareNeglect));
  if (choice.socialWithdrawal) gameState.socialWithdrawal = Math.max(0, Math.min(10, gameState.socialWithdrawal + choice.socialWithdrawal));
  if (choice.academicDecline) gameState.academicDecline = Math.max(0, Math.min(10, gameState.academicDecline + choice.academicDecline));
  if (choice.riskBehaviors) gameState.riskBehaviors = Math.max(0, Math.min(10, gameState.riskBehaviors + choice.riskBehaviors));
  if (choice.hopelessnessLevel) gameState.hopelessnessLevel = Math.max(0, Math.min(10, gameState.hopelessnessLevel + choice.hopelessnessLevel));
  if (choice.suicidalIdeation) gameState.suicidalIdeation = Math.max(0, Math.min(10, gameState.suicidalIdeation + choice.suicidalIdeation));
  if (choice.supportSystem) gameState.supportSystem = Math.max(0, Math.min(10, gameState.supportSystem + choice.supportSystem));
  
  // Handle specific actions
  handleAction(choice.action);
  
  // Track choices for progression
  gameState.choicesMade.push(choice.action);
  
  updateUI();
  
  // Check for ending conditions
  if (checkForEnding()) {
    return;
  }
  
  // Progress to next step after a delay
  setTimeout(() => {
    advanceProgression();
    loadCurrentScenario();
  }, 2000);
}

// Simple and clean choice button implementation
function showChoices() {
  // Get the current scenario
  const scenario = progressionScenarios[gameState.progressionStep];
  if (!scenario) {
    console.error('No scenario found for step:', gameState.progressionStep);
    return;
  }
  
  // Update the dialogue text and location
  const dialogueText = document.getElementById('dialogueText');
  const locationHeader = document.getElementById('currentLocation');
  const choicesContainer = document.getElementById('dialogueChoices');
  
  if (dialogueText) dialogueText.textContent = scenario.text;
  if (locationHeader) locationHeader.textContent = scenario.name;
  
  // Clear and create choice buttons
  if (choicesContainer && scenario.choices) {
    choicesContainer.innerHTML = '';
    
    scenario.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.textContent = choice.text;
      button.className = 'choice-btn';
      button.addEventListener('click', () => handleChoice(choice));
      choicesContainer.appendChild(button);
    });
  }
}

// Handle choice selection
function handleChoice(choice) {
  // Apply choice effects to game state
  if (choice.anxiety) gameState.anxiety += choice.anxiety;
  if (choice.depression) gameState.depression += choice.depression;
  if (choice.sleep) gameState.sleep += choice.sleep;
  if (choice.isolationLevel) gameState.isolationLevel += choice.isolationLevel;
  if (choice.substanceUse) gameState.substanceUse += choice.substanceUse;
  if (choice.selfCareNeglect) gameState.selfCareNeglect += choice.selfCareNeglect;
  if (choice.socialWithdrawal) gameState.socialWithdrawal += choice.socialWithdrawal;
  if (choice.academicDecline) gameState.academicDecline += choice.academicDecline;
  if (choice.riskBehaviors) gameState.riskBehaviors += choice.riskBehaviors;
  if (choice.hopelessnessLevel) gameState.hopelessnessLevel += choice.hopelessnessLevel;
  if (choice.suicidalIdeation) gameState.suicidalIdeation += choice.suicidalIdeation;
  if (choice.supportSystem) gameState.supportSystem += choice.supportSystem;
  
  // Clamp values to reasonable ranges
  gameState.anxiety = Math.max(0, Math.min(100, gameState.anxiety));
  gameState.depression = Math.max(0, Math.min(100, gameState.depression));
  gameState.sleep = Math.max(0, Math.min(100, gameState.sleep));
  
  // Advance to next scenario
  if (gameState.progressionStep < 20) {
    gameState.progressionStep++;
  }
  
  // Update UI and show next scenario
  updateUI();
  setTimeout(() => {
    showChoices();
  }, 500);
}

function handleAction(action) {
  const dialogueText = document.getElementById('dialogueText');
  
  switch(action) {
    // New progression-based actions
    case 'healthy_start':
      dialogueText.textContent = "You force yourself up. Small victories matter.";
      break;
    case 'minor_avoidance':
      dialogueText.textContent = "Just a few more minutes... the world can wait.";
      break;
    case 'social_comparison':
      dialogueText.textContent = "Everyone else seems so happy. What's wrong with you?";
      break;
    case 'reach_out':
      dialogueText.textContent = "You call a friend. Their voice brings a moment of warmth.";
      break;
    case 'self_care':
      dialogueText.textContent = "A proper meal. It's been a while since you cared for yourself.";
      break;
    case 'skip_meal':
      dialogueText.textContent = "Coffee will do. You don't deserve more anyway.";
      break;
    case 'push_through':
      dialogueText.textContent = "You try to focus, but the fog in your mind grows thicker.";
      break;
    case 'academic_avoidance':
      dialogueText.textContent = "You slip out early. The walls were closing in.";
      break;
    case 'social_effort':
      dialogueText.textContent = "You try to join in, but feel like you're watching from outside.";
      break;
    case 'self_isolate':
      dialogueText.textContent = "Alone feels safer. People are too much right now.";
      break;
    case 'substance_coping':
      dialogueText.textContent = "The alcohol burns, but it quiets the noise in your head.";
      break;
    case 'first_dark_thought':
      dialogueText.textContent = "The thought crosses your mind. It's terrifying how appealing it seems.";
      break;
    case 'honest_communication':
      dialogueText.textContent = "You tell them the truth. It feels both terrifying and relieving.";
      break;
    case 'help_seeking':
      dialogueText.textContent = "You look up therapists. Maybe it's time to get help.";
      gameState.hasTherapy = true;
      break;
    case 'crisis_help':
      dialogueText.textContent = "The crisis counselor listens. You're not alone in this.";
      gameState.hasCalledForHelp = true;
      break;
    case 'choose_life':
      dialogueText.textContent = "You choose to fight. It won't be easy, but you're worth it.";
      break;
    case 'final_attempt':
      triggerGameOver('suicide_complete');
      return;
    
    // Legacy actions for compatibility
    case 'suicide_jump':
    case 'traffic_suicide':
      triggerGameOver('suicide_complete');
      break;
    case 'overdose_attempt':
      triggerGameOver('overdose_complete');
      break;
    case 'self_harm':
      dialogueText.textContent = "The blade kisses your skin. The pain feels real. You feel real.";
      break;
    case 'emergency_call':
      dialogueText.textContent = "You dial the crisis line. Someone answers.";
      gameState.hasCalledForHelp = true;
      break;
    case 'dissociate':
      dialogueText.textContent = "You float above yourself, watching. This isn't real. You aren't real.";
      gameState.anxiety += 15;
      break;
    case 'break_mirror':
      dialogueText.textContent = "Glass shards reflect a thousand broken selves. Which one is real?";
      gameState.anxiety += 10;
      break;
    case 'memory_fragment':
      dialogueText.textContent = "A flash of sunlight. A laugh. Someone who cared. It's gone.";
      gameState.depression -= 5;
      break;
    case 'final_scream':
      dialogueText.textContent = "Your voice echoes in the void. Even your scream sounds empty.";
      break;
    
    default:
      dialogueText.textContent = "The darkness consumes your choice.";
      break;
  }
}

function progressTime() {
  // Simple time progression
  const times = ['7:00 AM', '9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];
  const currentIndex = times.indexOf(gameState.currentTime);
  
  if (currentIndex < times.length - 1) {
    gameState.currentTime = times[currentIndex + 1];
  } else {
    gameState.currentTime = times[0];
    gameState.currentDay++;
  }
}

function changeLocation() {
  const locationKeys = Object.keys(locations);
  let newLocation;
  
  // Progressive descent into darker locations based on mental state
  if (gameState.depression > 90 || gameState.anxiety > 90) {
    newLocation = 'void';
  } else if (gameState.depression > 70) {
    newLocation = Math.random() < 0.2 ? 'street' : 'bathroom';
  } else {
    newLocation = locationKeys[Math.floor(Math.random() * locationKeys.length)];
  }
  
  if (newLocation !== gameState.location) {
    showSceneTransition(locations[newLocation].name);
    setTimeout(() => {
      loadScenario(newLocation);
    }, 2000);
  }
}

function showSceneTransition(locationName) {
  const transition = document.getElementById('sceneTransition');
  const transitionText = document.getElementById('transitionText');
  
  transitionText.textContent = `Moving to ${locationName}...`;
  transition.style.display = 'flex';
  
  setTimeout(() => {
    transition.style.display = 'none';
  }, 2000);
}

function checkMentalHealthStatus() {
  if (gameState.anxiety > 80 || gameState.depression > 80) {
    if (Math.random() < 0.1) {
      showCrisisWarning();
    }
  }
  
  if (gameState.anxiety > 90) {
    if (Math.random() < 0.1) {
      triggerPanicAttack();
    }
  }
}

function triggerPanicAttack() {
  const panicScreen = document.getElementById('panicAttackScreen');
  panicScreen.style.display = 'flex';
  
  // Add visual effects
  document.body.classList.add('panic-mode');
}

function handlePanicAttack(action) {
  const panicScreen = document.getElementById('panicAttackScreen');
  
  switch(action) {
    case 'breathe':
      gameState.anxiety = Math.max(0, gameState.anxiety - 20);
      break;
    case 'leave':
      gameState.anxiety = Math.max(0, gameState.anxiety - 10);
      gameState.depression += 5;
      break;
    case 'help':
      gameState.anxiety = Math.max(0, gameState.anxiety - 25);
      gameState.depression = Math.max(0, gameState.depression - 10);
      break;
  }
  
  panicScreen.style.display = 'none';
  document.body.classList.remove('panic-mode');
  updateUI();
}

function showCrisisWarning() { /* removed for simplicity */ }

function closeCrisisWarning() {
  const crisisWarning = document.getElementById('crisisWarning');
  crisisWarning.style.display = 'none';
}

function startRandomEvents() {
  // More frequent intrusive thoughts
  setInterval(() => {
    if (gameState.gameStarted && Math.random() < 0.2) {
      showIntrusiveThought();
    }
  }, 8000);
  
  // More frequent visual distortions
  setInterval(() => {
    if (gameState.gameStarted && gameState.anxiety > 50 && Math.random() < 0.2) {
      showVisualDistortion();
    }
  }, 10000);
  
  // Horror whispers
  setInterval(() => {
    if (gameState.gameStarted && Math.random() < 0.1) {
      showHorrorWhisper();
    }
  }, 12000);
}

function showHorrorWhisper() {
  const whisper = document.createElement('div');
  whisper.style.cssText = `
    position: fixed;
    top: ${Math.random() * 80 + 10}%;
    left: ${Math.random() * 80 + 10}%;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-family: 'Courier New', monospace;
    z-index: 1000;
    pointer-events: none;
    text-shadow: 0 0 10px #ffffff;
    animation: fadeInOut 3s ease;
  `;
  
  const whispers = ['die', 'end it', 'give up', 'no hope', 'worthless', 'alone'];
  whisper.textContent = whispers[Math.floor(Math.random() * whispers.length)];
  
  document.body.appendChild(whisper);
  setTimeout(() => whisper.remove(), 3000);
}

function showIntrusiveThought() {
  const thoughtOverlay = document.getElementById('intrusiveThoughts');
  const thoughtText = document.getElementById('thoughtText');
  
  const thought = intrusiveThoughts[Math.floor(Math.random() * intrusiveThoughts.length)];
  thoughtText.textContent = thought;
  
  // Horror effect - make the screen flash
  document.body.style.filter = 'invert(1)';
  setTimeout(() => {
    document.body.style.filter = 'contrast(1.2) brightness(0.9) grayscale(1)';
  }, 100);
  
  thoughtOverlay.style.display = 'flex';
  
  setTimeout(() => {
    thoughtOverlay.style.display = 'none';
  }, 4000);
  
  // Increase anxiety more significantly
  gameState.anxiety = Math.min(100, gameState.anxiety + 15);
  gameState.depression = Math.min(100, gameState.depression + 10);
  updateUI();
}

function showVisualDistortion() {
  const distortion = document.getElementById('visualDistortion');
  distortion.style.display = 'block';
  
  setTimeout(() => {
    distortion.style.display = 'none';
  }, 2000);
}

// Legacy functions for compatibility
function performAction(action) {
  handleAction(action);
}

function showSelfHarmScene() {
  document.getElementById('selfHarmWarning').style.display = 'none';
  // Implementation would go here - keeping it minimal for safety
}

function skipSelfHarmScene() {
  document.getElementById('selfHarmWarning').style.display = 'none';
  loadScenario(gameState.location);
}

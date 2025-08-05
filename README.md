# I'M SO DONE - Mental Health Awareness Experience

An interactive web-based simulation that explores the daily challenges of living with anxiety and depression. This project aims to raise awareness and promote understanding of mental health struggles.

## ⚠️ Content Warning

This experience contains themes related to:
- Mental health struggles
- Anxiety and depression
- Crisis situations
- Intrusive thoughts

If you're currently struggling with your mental health, please remember:
- **You are not alone**
- **Help is available**
- **Crisis Text Line:** Text HOME to 741741
- **National Crisis Line:** 988

## Features

### Interactive Storytelling
- Dynamic choice-based narrative
- Multiple scenarios and locations
- Real-time mental health status tracking
- Immersive visual and audio effects

### Mental Health Simulation
- **Anxiety Meter:** Tracks stress and worry levels
- **Depression Meter:** Monitors mood and motivation
- **Sleep Meter:** Shows rest and energy levels
- **Time Progression:** Day/night cycle with evolving scenarios

### Visual Effects
- Panic attack simulations with screen shake and visual distortion
- Intrusive thought overlays
- Crisis warning system
- Scene transitions between locations

### Locations
- **Bedroom:** Starting location with morning routine choices
- **Classroom:** Social anxiety scenarios and academic pressure
- More locations can be easily added to the system

## How to Play

1. Open `index.html` in a web browser
2. Read the content warning and introduction
3. Click "Begin Your Day" to start the simulation
4. Make choices that affect Jamie's mental health status
5. Experience the consequences of different decisions
6. Navigate through various scenarios and locations

## Technical Details

### Files Structure
- `index.html` - Main game interface and HTML structure
- `script.js` - Game logic, state management, and interactive features
- `style.css` - Visual styling, animations, and responsive design
- `README.md` - Project documentation

### Game Mechanics
- **Choice System:** Each decision affects mental health metrics
- **Random Events:** Intrusive thoughts and visual distortions occur based on current state
- **Crisis Detection:** Automatic warnings when mental health reaches critical levels
- **Time Progression:** Realistic day/time advancement
- **Location System:** Expandable environment system

## Development

### Adding New Scenarios
To add new scenarios, modify the `locations` object in `script.js`:

```javascript
const locations = {
  newLocation: {
    name: "Location Name",
    background: 'location-scene',
    scenarios: [
      {
        text: "Scenario description",
        choices: [
          { text: "Choice 1", action: 'action1', anxiety: -5, depression: 0 },
          { text: "Choice 2", action: 'action2', anxiety: 10, depression: 5 }
        ]
      }
    ]
  }
};
```

### Adding New Visual Effects
CSS classes for various mental health states can be found in `style.css`:
- `.panic-mode` - Panic attack effects
- `.distortion-overlay` - Visual distortions
- `.intrusive-overlay` - Intrusive thought displays

## Educational Purpose

This project is designed to:
- Increase awareness of mental health challenges
- Help people understand what living with anxiety/depression feels like
- Promote empathy and understanding
- Encourage seeking help when needed
- Reduce stigma around mental health issues

## Resources

If you or someone you know is struggling:
- **National Suicide Prevention Lifeline:** 988
- **Crisis Text Line:** Text HOME to 741741
- **NAMI (National Alliance on Mental Illness):** nami.org
- **Mental Health America:** mhanational.org

## License

This project is created for educational and awareness purposes. Please use responsibly and consider the sensitive nature of the content when sharing or modifying.

---

*Remember: This is a simulation meant to raise awareness. Real mental health struggles require professional support and care.*


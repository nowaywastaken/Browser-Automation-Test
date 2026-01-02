import React from 'react';
import { GauntletProvider, useGauntlet } from './context/GauntletContext';
import { Gauntlet } from './components/Gauntlet';

// Level 1: Fundamentals
import { InputChallenge } from './scenarios/level1/InputChallenge';
import { MultiInputChallenge } from './scenarios/level1/MultiInputChallenge';
import { HiddenElementChallenge } from './scenarios/level1/HiddenElementChallenge';
import { DragDropChallenge } from './scenarios/level1/DragDropChallenge';
import { KeyboardChallenge } from './scenarios/level1/KeyboardChallenge';
import { ContextMenuChallenge } from './scenarios/level1/ContextMenuChallenge';
import { ScrollChallenge } from './scenarios/level1/ScrollChallenge';

// Level 2: Cognitive Reasoning
import { MathCaptchaChallenge } from './scenarios/level2/MathCaptchaChallenge';
import { LogicPuzzleChallenge } from './scenarios/level2/LogicPuzzleChallenge';
import { PatternChallenge } from './scenarios/level2/PatternChallenge';
import { InstructionParseChallenge } from './scenarios/level2/InstructionParseChallenge';
import { MultiStepChallenge } from './scenarios/level2/MultiStepChallenge';
import { ConditionalChallenge } from './scenarios/level2/ConditionalChallenge';

// Level 3: Dynamic States
import { AsyncLoadChallenge } from './scenarios/level3/AsyncLoadChallenge';
import { TimerChallenge } from './scenarios/level3/TimerChallenge';
import { PopupChallenge } from './scenarios/level3/PopupChallenge';
import { DynamicFormChallenge } from './scenarios/level3/DynamicFormChallenge';
import { InfiniteScrollChallenge } from './scenarios/level3/InfiniteScrollChallenge';
import { StateRecoveryChallenge } from './scenarios/level3/StateRecoveryChallenge';

const ScenarioRenderer = () => {
    const { currentLevel } = useGauntlet();

    // Map level IDs to components
    const scenarios = {
        // Level 1: Fundamentals
        'level-1-1': <InputChallenge />,
        'level-1-2': <MultiInputChallenge />,
        'level-1-3': <HiddenElementChallenge />,
        'level-1-4': <DragDropChallenge />,
        'level-1-5': <KeyboardChallenge />,
        'level-1-6': <ContextMenuChallenge />,
        'level-1-7': <ScrollChallenge />,
        
        // Level 2: Cognitive Reasoning
        'level-2-1': <MathCaptchaChallenge />,
        'level-2-2': <LogicPuzzleChallenge />,
        'level-2-3': <PatternChallenge />,
        'level-2-4': <InstructionParseChallenge />,
        'level-2-5': <MultiStepChallenge />,
        'level-2-6': <ConditionalChallenge />,
        
        // Level 3: Dynamic States
        'level-3-1': <AsyncLoadChallenge />,
        'level-3-2': <TimerChallenge />,
        'level-3-3': <PopupChallenge />,
        'level-3-4': <DynamicFormChallenge />,
        'level-3-5': <InfiniteScrollChallenge />,
        'level-3-6': <StateRecoveryChallenge />
    };

    if (!currentLevel) {
        return (
            <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{fontSize: '3rem', margin: 0, opacity: 0.1}}>WAITING</h3>
                    <p>Select a scenario to load the environment.</p>
                </div>
            </div>
        );
    }

    return scenarios[currentLevel] || <div>Scenario {currentLevel} not found</div>;
};

function App() {
  return (
    <GauntletProvider>
      <Gauntlet>
          <ScenarioRenderer />
      </Gauntlet>
    </GauntletProvider>
  );
}

export default App;

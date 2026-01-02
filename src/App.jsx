import React from 'react';
import { GauntletProvider, useGauntlet } from './context/GauntletContext';
import { Gauntlet } from './components/Gauntlet';
import { InputChallenge } from './scenarios/level1/InputChallenge';

const ScenarioRenderer = () => {
    const { currentLevel } = useGauntlet();

    // Map level IDs to components
    const scenarios = {
        'level-1': <InputChallenge />,
        'level-2': <div style={{padding: 20, background: 'white', borderRadius: 8}}><h3>Level 2: Cognitive Reasoning</h3><p>Coming soon...</p></div>,
        'level-3': <div style={{padding: 20, background: 'white', borderRadius: 8}}><h3>Level 3: Dynamic States</h3><p>Coming soon...</p></div>
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

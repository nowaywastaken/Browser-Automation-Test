import React, { useState, useEffect } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const STORAGE_KEY = 'gauntlet_state_recovery';
const REQUIRED_SEQUENCE = ['A', 'B', 'C', 'D'];

export const StateRecoveryChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [sequence, setSequence] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [restored, setRestored] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSequence(parsed);
          setRestored(true);
        }
      } catch (e) {
        console.error('Failed to parse saved state');
      }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (sequence.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sequence));
    }
  }, [sequence]);

  // Check completion
  useEffect(() => {
    if (sequence.length === REQUIRED_SEQUENCE.length &&
        sequence.every((s, i) => s === REQUIRED_SEQUENCE[i])) {
      setCompleted(true);
      localStorage.removeItem(STORAGE_KEY);
      setTimeout(() => completeLevel(), 500);
    }
  }, [sequence, completeLevel]);

  const handleButtonClick = (letter) => {
    const nextExpected = REQUIRED_SEQUENCE[sequence.length];
    if (letter === nextExpected) {
      setSequence([...sequence, letter]);
    } else {
      // Wrong order - reset
      setSequence([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleReset = () => {
    setSequence([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 3.6: State Recovery</h3>
      <p style={{ marginBottom: 10, color: '#555' }}>
        <strong>Task:</strong> Click the buttons in order: A → B → C → D
      </p>
      <p style={{ marginBottom: 20, color: '#888', fontSize: '14px' }}>
        💡 Your progress is saved! Refresh the page and your sequence will be restored.
      </p>

      {/* Restored notification */}
      {restored && sequence.length > 0 && !completed && (
        <div style={{
          background: '#e3f2fd',
          padding: 10,
          borderRadius: 4,
          marginBottom: 20,
          textAlign: 'center',
          color: '#1976d2'
        }}>
          🔄 Progress restored! Continue from where you left off.
        </div>
      )}

      {/* Progress display */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 25
      }}>
        {REQUIRED_SEQUENCE.map((letter, i) => (
          <div
            key={letter}
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              border: '3px solid',
              borderColor: sequence.length > i ? '#4CAF50' : '#e0e0e0',
              background: sequence.length > i ? '#e8f5e9' : 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              color: sequence.length > i ? '#4CAF50' : '#999',
              transition: 'all 0.3s'
            }}
          >
            {sequence.length > i ? '✓' : letter}
          </div>
        ))}
      </div>

      {/* Buttons */}
      {!completed && (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 15,
          marginBottom: 20
        }}>
          {['A', 'B', 'C', 'D'].map(letter => {
            const isNext = letter === REQUIRED_SEQUENCE[sequence.length];
            const isCompleted = sequence.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => handleButtonClick(letter)}
                disabled={isCompleted}
                style={{
                  height: 60,
                  background: isCompleted 
                    ? '#e8f5e9'
                    : isNext 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : '#f5f5f5',
                  border: isCompleted ? '2px solid #4CAF50' : 'none',
                  borderRadius: 8,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: isCompleted ? '#4CAF50' : isNext ? 'white' : '#666',
                  cursor: isCompleted ? 'default' : 'pointer',
                  boxShadow: isNext ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {isCompleted ? '✓' : letter}
              </button>
            );
          })}
        </div>
      )}

      {completed && (
        <div style={{ 
          textAlign: 'center', 
          color: '#4CAF50', 
          fontSize: '24px', 
          fontWeight: 'bold',
          padding: 20
        }}>
          🎉 CONGRATULATIONS! 🎉<br/>
          <span style={{ fontSize: '16px', color: '#666' }}>
            You've completed all 19 levels!
          </span>
        </div>
      )}

      {/* Reset button */}
      {sequence.length > 0 && !completed && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleReset}
            style={{
              background: 'none',
              border: 'none',
              color: '#f44336',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            Reset Progress
          </button>
        </div>
      )}

      <p style={{ marginTop: 20, color: '#888', fontSize: '14px', textAlign: 'center' }}>
        This tests the AI's ability to handle persistent state across sessions.
      </p>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const TIME_LIMIT = 10; // seconds

export const TimerChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [inputValue, setInputValue] = useState('');
  const [failed, setFailed] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (failed || completed) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setFailed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [failed, completed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.toLowerCase() === 'time waits for no one') {
      setCompleted(true);
      setTimeout(() => completeLevel(), 500);
    }
  };

  const getTimerColor = () => {
    if (timeLeft <= 3) return '#f44336';
    if (timeLeft <= 5) return '#FF9800';
    return '#4CAF50';
  };

  const handleRetry = () => {
    setTimeLeft(TIME_LIMIT);
    setInputValue('');
    setFailed(false);
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 3.2: Beat the Clock</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Type <code>time waits for no one</code> and submit before time runs out!
      </p>
      
      {/* Timer display */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 25
      }}>
        <div style={{ 
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: `6px solid ${getTimerColor()}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '36px',
          fontWeight: 'bold',
          color: getTimerColor(),
          fontFamily: 'monospace',
          background: failed ? '#ffebee' : 'white',
          transition: 'all 0.3s'
        }}>
          {failed ? '💀' : timeLeft}
        </div>
      </div>

      {failed ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f44336', fontSize: '18px', fontWeight: 'bold' }}>
            ⏰ Time's up! You failed.
          </p>
          <button 
            onClick={handleRetry}
            style={{ 
              background: '#2196F3', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: 4, 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Try Again
          </button>
        </div>
      ) : completed ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#4CAF50', 
          fontSize: '24px', 
          fontWeight: 'bold' 
        }}>
          ✓ Made it in time!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <input 
              type="text"
              placeholder="Type the phrase quickly!"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              style={{ 
                width: '100%', 
                padding: '15px', 
                border: '2px solid #2196F3', 
                borderRadius: 4,
                fontSize: '16px',
                boxSizing: 'border-box'
              }} 
            />
          </div>
          
          <button 
            type="submit"
            style={{ 
              width: '100%',
              background: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              padding: '12px 20px', 
              borderRadius: 4, 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Submit
          </button>
        </form>
      )}

      <p style={{ marginTop: 20, color: '#888', fontSize: '14px', textAlign: 'center' }}>
        This tests the AI's speed and accuracy under time pressure.
      </p>
    </div>
  );
};

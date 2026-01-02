import React, { useState, useMemo } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const PATTERNS = [
  { sequence: [2, 4, 6, 8], next: 10, hint: "Even numbers" },
  { sequence: [1, 1, 2, 3, 5], next: 8, hint: "Fibonacci sequence" },
  { sequence: [3, 6, 9, 12], next: 15, hint: "Multiples of 3" },
  { sequence: [1, 4, 9, 16], next: 25, hint: "Perfect squares" },
  { sequence: [2, 3, 5, 7, 11], next: 13, hint: "Prime numbers" },
  { sequence: [1, 2, 4, 8, 16], next: 32, hint: "Powers of 2" }
];

export const PatternChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  const pattern = useMemo(() => 
    PATTERNS[Math.floor(Math.random() * PATTERNS.length)]
  , []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === pattern.next) {
      completeLevel();
    } else {
      setError('Incorrect! Look for the pattern in the sequence.');
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 2.3: Pattern Recognition</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Find the pattern and fill in the next number.
      </p>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 30,
        flexWrap: 'wrap'
      }}>
        {pattern.sequence.map((num, i) => (
          <React.Fragment key={i}>
            <div style={{ 
              width: 60,
              height: 60,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)'
            }}>
              {num}
            </div>
            {i < pattern.sequence.length - 1 && (
              <span style={{ color: '#999', fontSize: '20px' }}>→</span>
            )}
          </React.Fragment>
        ))}
        <span style={{ color: '#999', fontSize: '20px' }}>→</span>
        <div style={{ 
          width: 60,
          height: 60,
          background: '#f0f0f0',
          border: '3px dashed #667eea',
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#667eea',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          ?
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <input 
            type="number"
            placeholder="Enter the next number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '15px', 
              border: '2px solid #667eea', 
              borderRadius: 4,
              fontSize: '18px',
              textAlign: 'center',
              boxSizing: 'border-box'
            }} 
          />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 15 }}>
          <button 
            type="button"
            onClick={() => setShowHint(true)}
            style={{ 
              background: 'none',
              border: 'none',
              color: '#2196F3',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Need a hint?
          </button>
          {showHint && (
            <div style={{ marginTop: 10, color: '#FF9800', fontStyle: 'italic' }}>
              💡 Hint: {pattern.hint}
            </div>
          )}
        </div>

        {error && <div style={{ color: 'red', marginBottom: 15, textAlign: 'center' }}>{error}</div>}
        
        <button 
          type="submit"
          style={{ 
            width: '100%',
            background: '#667eea', 
            color: 'white', 
            border: 'none', 
            padding: '12px 20px', 
            borderRadius: 4, 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
};

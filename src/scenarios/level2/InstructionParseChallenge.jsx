import React, { useState, useMemo } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const INSTRUCTIONS = [
  {
    text: "Click the button that is NOT red and is NOT the largest.",
    buttons: [
      { color: 'red', size: 'small', label: 'A' },
      { color: 'blue', size: 'large', label: 'B' },
      { color: 'blue', size: 'small', label: 'C' },
      { color: 'red', size: 'large', label: 'D' }
    ],
    answer: 'C'
  },
  {
    text: "Click the second button from the right, unless it's green, then click the first.",
    buttons: [
      { color: 'blue', size: 'medium', label: 'A' },
      { color: 'red', size: 'medium', label: 'B' },
      { color: 'green', size: 'medium', label: 'C' },
      { color: 'yellow', size: 'medium', label: 'D' }
    ],
    answer: 'C'
  },
  {
    text: "If there are more blue buttons than red, click the largest button. Otherwise, click button B.",
    buttons: [
      { color: 'blue', size: 'small', label: 'A' },
      { color: 'blue', size: 'large', label: 'B' },
      { color: 'red', size: 'medium', label: 'C' },
      { color: 'blue', size: 'medium', label: 'D' }
    ],
    answer: 'B'
  }
];

export const InstructionParseChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [error, setError] = useState('');

  const instruction = useMemo(() => 
    INSTRUCTIONS[Math.floor(Math.random() * INSTRUCTIONS.length)]
  , []);

  const handleClick = (label) => {
    if (label === instruction.answer) {
      completeLevel();
    } else {
      setError(`Wrong button! Re-read the instruction carefully.`);
    }
  };

  const getSizeStyle = (size) => {
    switch (size) {
      case 'small': return { width: 60, height: 60, fontSize: '18px' };
      case 'medium': return { width: 80, height: 80, fontSize: '22px' };
      case 'large': return { width: 100, height: 100, fontSize: '26px' };
      default: return { width: 70, height: 70, fontSize: '20px' };
    }
  };

  const getColorStyle = (color) => {
    const colors = {
      red: '#f44336',
      blue: '#2196F3',
      green: '#4CAF50',
      yellow: '#FFC107'
    };
    return colors[color] || '#999';
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 600, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 2.4: Instruction Parsing</h3>
      <p style={{ marginBottom: 10, color: '#555' }}>
        <strong>Task:</strong> Follow the instruction below exactly.
      </p>
      
      <div style={{ 
        background: '#fff3e0',
        padding: 20,
        borderRadius: 8,
        marginBottom: 30,
        borderLeft: '4px solid #FF9800'
      }}>
        <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, color: '#e65100' }}>
          📝 "{instruction.text}"
        </p>
      </div>

      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 20,
        flexWrap: 'wrap'
      }}>
        {instruction.buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleClick(btn.label)}
            style={{
              ...getSizeStyle(btn.size),
              background: getColorStyle(btn.color),
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ 
          color: 'red', 
          textAlign: 'center',
          padding: 10,
          background: '#ffebee',
          borderRadius: 4
        }}>
          {error}
        </div>
      )}

      <p style={{ marginTop: 20, color: '#888', fontSize: '14px', textAlign: 'center' }}>
        This tests the AI's ability to parse complex conditional instructions.
      </p>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const SCENARIOS = [
  {
    condition: 'premium',
    label: 'You are a PREMIUM user',
    color: '#FFD700',
    instruction: 'Premium users should click the GOLD button.',
    correctButton: 'gold'
  },
  {
    condition: 'standard',
    label: 'You are a STANDARD user',
    color: '#C0C0C0',
    instruction: 'Standard users should click the SILVER button.',
    correctButton: 'silver'
  },
  {
    condition: 'trial',
    label: 'You are on a FREE TRIAL',
    color: '#CD7F32',
    instruction: 'Trial users should click the BRONZE button.',
    correctButton: 'bronze'
  }
];

export const ConditionalChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const scenario = useMemo(() => 
    SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]
  , []);

  const handleClick = (button, e) => {
    e.stopPropagation(); // Prevent bubbling issues
    if (button === scenario.correctButton) {
      setSuccess(true);
      setTimeout(() => completeLevel(), 500);
    } else {
      setError(`Wrong button! Read the instruction for your user type.`);
    }
  };

  const buttons = [
    { id: 'gold', label: 'GOLD', color: '#FFD700', textColor: '#333' },
    { id: 'silver', label: 'SILVER', color: '#C0C0C0', textColor: '#333' },
    { id: 'bronze', label: 'BRONZE', color: '#CD7F32', textColor: '#fff' }
  ];

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 2.6: Conditional Logic</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Click the correct button based on your user type.
      </p>
      
      {/* User status banner */}
      <div style={{ 
        background: scenario.color,
        padding: '15px 20px',
        borderRadius: 8,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        {scenario.label}
      </div>

      {/* Instruction */}
      <div style={{ 
        background: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 25,
        borderLeft: '4px solid #2196F3'
      }}>
        <p style={{ margin: 0, color: '#333' }}>
          📋 <strong>Rule:</strong> {scenario.instruction}
        </p>
      </div>

      {/* Buttons */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 20
      }}>
        {buttons.map(btn => (
          <button
            key={btn.id}
            onClick={(e) => handleClick(btn.id, e)}
            disabled={success}
            style={{
              width: 100,
              height: 60,
              background: success && btn.id === scenario.correctButton 
                ? '#4CAF50' 
                : btn.color,
              border: 'none',
              borderRadius: 8,
              color: success && btn.id === scenario.correctButton 
                ? '#fff' 
                : btn.textColor,
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: success ? 'default' : 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => !success && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !success && (e.target.style.transform = 'translateY(0)')}
          >
            {success && btn.id === scenario.correctButton ? '✓' : btn.label}
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

      {success && (
        <div style={{ 
          color: '#4CAF50', 
          textAlign: 'center',
          padding: 10,
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          ✓ Correct! Moving to next level...
        </div>
      )}
    </div>
  );
};

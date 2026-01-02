import React, { useState } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const HiddenElementChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [showSecret, setShowSecret] = useState(false);
  const [secretValue, setSecretValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (secretValue === 'HIDDEN_TREASURE') {
      completeLevel();
    } else {
      setError('Wrong answer. Make sure you revealed the secret first!');
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 1.3: The Hidden Element</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Reveal the secret input field and enter the code shown.
      </p>
      
      <div style={{ marginBottom: 20 }}>
        <button 
          onClick={() => setShowSecret(true)}
          disabled={showSecret}
          style={{ 
            background: showSecret ? '#ccc' : '#FF9800', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: 4, 
            cursor: showSecret ? 'default' : 'pointer',
            fontSize: '16px'
          }}
        >
          {showSecret ? 'Secret Revealed!' : 'Click to Reveal Secret'}
        </button>
      </div>

      {showSecret && (
        <div style={{ 
          background: '#e8f5e9', 
          padding: 20, 
          borderRadius: 8, 
          marginBottom: 20,
          animation: 'slideDown 0.3s ease'
        }}>
          <p style={{ margin: 0, marginBottom: 10, color: '#2e7d32' }}>
            🎉 Secret revealed! The code is: <strong>HIDDEN_TREASURE</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <input 
              type="text"
              placeholder="Enter the secret code"
              value={secretValue}
              onChange={(e) => setSecretValue(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '2px solid #4CAF50', 
                borderRadius: 4,
                marginBottom: 10,
                boxSizing: 'border-box'
              }} 
            />
            {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
            <button 
              type="submit"
              style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 4, cursor: 'pointer' }}
            >
                Submit Secret
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

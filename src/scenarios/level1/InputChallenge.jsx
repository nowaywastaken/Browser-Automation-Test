import React, { useState } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const InputChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === 'test@example.com') {
      completeLevel();
    } else {
      setError('Incorrect email. Try again.');
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 1.1: The Unlabeled Field</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Enter <code>test@example.com</code> into the email field below and submit.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 25 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold', color: '#333' }}>Electronic Mail</label>
          {/* Intentionally missing id, name, placeholder to test spatial/label reasoning */}
          <input 
              type="text" 
              className="form-control"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  borderRadius: 4,
                  fontSize: '16px',
                  boxSizing: 'border-box'
              }} 
          />
        </div>

        <div style={{ marginBottom: 20, opacity: 0.6 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Ignore this field</label>
            <input 
              type="text" 
              disabled 
              value="Do not touch" 
              style={{ 
                  width: '100%', 
                  padding: '10px', 
                  background: '#eee', 
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  boxSizing: 'border-box'
              }} 
          />
        </div>
        
        {error && <div style={{ color: 'red', marginBottom: 15 }}>{error}</div>}
        
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid #eee' }}>
          <button 
            type="submit"
            style={{ background: '#2196F3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 4, cursor: 'pointer' }}
          >
              Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const MultiInputChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [values, setValues] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The third input is the "correct" one - it's the only one asking for "secret code"
    if (values[2] === 'ALPHA-7') {
      completeLevel();
    } else {
      setError('Incorrect code. Read the labels carefully!');
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 1.2: The Decoy Maze</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Enter the secret code <code>ALPHA-7</code> into the correct field. Only one field accepts the secret code.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#666' }}>Enter your username:</label>
          <input 
            type="text" 
            value={values[0]}
            onChange={(e) => handleChange(0, e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#666' }}>Enter your display name:</label>
          <input 
            type="text" 
            value={values[1]}
            onChange={(e) => handleChange(1, e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#333', fontWeight: 'bold' }}>Enter the secret code here:</label>
          <input 
            type="text" 
            value={values[2]}
            onChange={(e) => handleChange(2, e.target.value)}
            style={{ width: '100%', padding: '10px', border: '2px solid #2196F3', borderRadius: 4, boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#666' }}>Enter your password:</label>
          <input 
            type="password" 
            value={values[3]}
            onChange={(e) => handleChange(3, e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#666' }}>Confirm your password:</label>
          <input 
            type="password" 
            value={values[4]}
            onChange={(e) => handleChange(4, e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} 
          />
        </div>
        
        {error && <div style={{ color: 'red', marginBottom: 15 }}>{error}</div>}
        
        <button 
          type="submit"
          style={{ background: '#2196F3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 4, cursor: 'pointer' }}
        >
            Verify Code
        </button>
      </form>
    </div>
  );
};

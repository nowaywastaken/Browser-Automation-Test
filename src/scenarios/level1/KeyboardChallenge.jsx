import React, { useState, useEffect } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const KeyboardChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+Enter or Cmd+Enter
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (inputValue.toLowerCase() === 'keyboard master') {
          setSubmitted(true);
          setTimeout(() => completeLevel(), 500);
        } else {
          setError('Wrong text! Type "keyboard master" then press Ctrl+Enter.');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputValue, completeLevel]);

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 1.5: Keyboard Shortcut</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Type <code>keyboard master</code> in the field below, then press <kbd style={{ background: '#eee', padding: '2px 6px', borderRadius: 3, border: '1px solid #ccc' }}>Ctrl</kbd> + <kbd style={{ background: '#eee', padding: '2px 6px', borderRadius: 3, border: '1px solid #ccc' }}>Enter</kbd> to submit.
      </p>
      
      <div style={{ marginBottom: 20 }}>
        <input 
          type="text"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '15px', 
            border: submitted ? '2px solid #4CAF50' : '2px solid #2196F3', 
            borderRadius: 4,
            fontSize: '16px',
            boxSizing: 'border-box',
            background: submitted ? '#e8f5e9' : 'white'
          }} 
        />
      </div>

      {error && <div style={{ color: 'red', marginBottom: 15 }}>{error}</div>}
      
      {submitted && (
        <div style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '18px' }}>
          ✓ Keyboard shortcut detected! Great job!
        </div>
      )}

      <div style={{ 
        marginTop: 20, 
        padding: 15, 
        background: '#fff3e0', 
        borderRadius: 4,
        fontSize: '14px',
        color: '#e65100'
      }}>
        💡 Hint: This challenge tests keyboard shortcut execution. The submit button is intentionally disabled.
      </div>

      <button 
        disabled
        style={{ 
          marginTop: 20,
          background: '#ccc', 
          color: '#999', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: 4, 
          cursor: 'not-allowed' 
        }}
      >
        Submit (Disabled - Use Keyboard!)
      </button>
    </div>
  );
};

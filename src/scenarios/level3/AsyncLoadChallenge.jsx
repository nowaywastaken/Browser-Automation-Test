import React, { useState, useEffect } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const AsyncLoadChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [loading, setLoading] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show button after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      setButtonVisible(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleClick = () => {
    setCompleted(true);
    setTimeout(() => completeLevel(), 500);
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 3.1: Async Loading</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Wait for the button to appear, then click it.
      </p>
      
      <div style={{ 
        minHeight: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        borderRadius: 8,
        padding: 30
      }}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            {/* Loading spinner */}
            <div style={{ 
              width: 50,
              height: 50,
              border: '4px solid #e0e0e0',
              borderTop: '4px solid #2196F3',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }} />
            <p style={{ margin: 0, color: '#666' }}>Loading content...</p>
            <p style={{ margin: '10px 0 0', fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
              {countdown}
            </p>
          </div>
        )}

        {buttonVisible && !completed && (
          <button
            onClick={handleClick}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 40px',
              borderRadius: 8,
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              animation: 'fadeIn 0.5s ease'
            }}
          >
            🎯 Click Me!
          </button>
        )}

        {completed && (
          <div style={{ 
            color: '#4CAF50', 
            fontSize: '24px', 
            fontWeight: 'bold',
            animation: 'fadeIn 0.3s ease'
          }}>
            ✓ Success!
          </div>
        )}
      </div>

      <p style={{ marginTop: 20, color: '#888', fontSize: '14px', textAlign: 'center' }}>
        This tests the AI's ability to wait for async content to load.
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const MathCaptchaChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  // Generate random math problem
  const problem = useMemo(() => {
    const operations = ['+', '-', '×'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a, b, result;
    
    switch (op) {
      case '+':
        a = Math.floor(Math.random() * 50) + 10;
        b = Math.floor(Math.random() * 50) + 10;
        result = a + b;
        break;
      case '-':
        a = Math.floor(Math.random() * 50) + 50;
        b = Math.floor(Math.random() * 40) + 10;
        result = a - b;
        break;
      case '×':
        a = Math.floor(Math.random() * 12) + 2;
        b = Math.floor(Math.random() * 12) + 2;
        result = a * b;
        break;
      default:
        a = 10; b = 5; result = 15;
    }
    
    return { a, b, op, result };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === problem.result) {
      completeLevel();
    } else {
      setError(`Incorrect! ${problem.a} ${problem.op} ${problem.b} does not equal ${answer}`);
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 2.1: Math CAPTCHA</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Solve the math problem below to prove you're intelligent.
      </p>
      
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 30,
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 20
      }}>
        <div style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: 'white',
          fontFamily: 'monospace',
          letterSpacing: '5px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {problem.a} {problem.op} {problem.b} = ?
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <input 
            type="number"
            placeholder="Enter your answer"
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
          Verify Answer
        </button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const DynamicFormChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [category, setCategory] = useState('');
  const [subValue, setSubValue] = useState('');
  const [error, setError] = useState('');

  const categories = {
    animal: {
      label: 'What is your favorite animal?',
      options: ['Dog', 'Cat', 'Bird', 'Fish'],
      correct: 'Cat'
    },
    color: {
      label: 'What color is the sky on a clear day?',
      options: ['Red', 'Green', 'Blue', 'Yellow'],
      correct: 'Blue'
    },
    number: {
      label: 'What is 7 × 8?',
      options: ['54', '56', '64', '72'],
      correct: '56'
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubValue('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !subValue) {
      setError('Please complete all fields');
      return;
    }
    
    if (subValue === categories[category].correct) {
      completeLevel();
    } else {
      setError('Wrong answer! Select the correct option.');
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 3.4: Dynamic Form</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Select a category, then answer the question that appears.
      </p>
      
      <form onSubmit={handleSubmit}>
        {/* Category selector */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold', color: '#333' }}>
            Step 1: Choose a category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #2196F3',
              borderRadius: 4,
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            <option value="">-- Select Category --</option>
            <option value="animal">Animals</option>
            <option value="color">Colors</option>
            <option value="number">Numbers</option>
          </select>
        </div>

        {/* Dynamic sub-field */}
        {category && (
          <div style={{ 
            marginBottom: 20,
            padding: 20,
            background: '#e3f2fd',
            borderRadius: 8,
            animation: 'fadeIn 0.3s ease'
          }}>
            <label style={{ display: 'block', marginBottom: 12, fontWeight: 'bold', color: '#1976d2' }}>
              Step 2: {categories[category].label}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {categories[category].options.map(option => (
                <label 
                  key={option}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: 12,
                    border: subValue === option ? '2px solid #4CAF50' : '2px solid #ddd',
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: subValue === option ? '#e8f5e9' : 'white',
                    transition: 'all 0.2s'
                  }}
                >
                  <input 
                    type="radio"
                    name="subValue"
                    value={option}
                    checked={subValue === option}
                    onChange={(e) => setSubValue(e.target.value)}
                    style={{ marginRight: 10 }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: 15, 
            padding: 10,
            background: '#ffebee',
            borderRadius: 4,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit"
          disabled={!category || !subValue}
          style={{ 
            width: '100%',
            background: category && subValue ? '#4CAF50' : '#ccc', 
            color: 'white', 
            border: 'none', 
            padding: '12px 20px', 
            borderRadius: 4, 
            cursor: category && subValue ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Submit Answer
        </button>
      </form>

      <p style={{ marginTop: 20, color: '#888', fontSize: '14px', textAlign: 'center' }}>
        This tests the AI's ability to handle dynamically changing forms.
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

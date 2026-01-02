import React, { useState, useMemo } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const PUZZLES = [
  {
    clues: [
      "Alice is taller than Bob.",
      "Charlie is shorter than Bob.",
      "David is taller than Alice."
    ],
    question: "Who is the shortest?",
    options: ["Alice", "Bob", "Charlie", "David"],
    answer: "Charlie"
  },
  {
    clues: [
      "The red car is faster than the blue car.",
      "The green car is slower than the blue car.",
      "The yellow car is faster than the red car."
    ],
    question: "Which car is the slowest?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Green"
  },
  {
    clues: [
      "Monday comes before Tuesday.",
      "The meeting is not on Monday.",
      "The meeting is exactly 2 days after Monday."
    ],
    question: "When is the meeting?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    answer: "Wednesday"
  }
];

export const LogicPuzzleChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  const puzzle = useMemo(() => 
    PUZZLES[Math.floor(Math.random() * PUZZLES.length)]
  , []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected === puzzle.answer) {
      completeLevel();
    } else {
      setError('Incorrect! Read the clues carefully and try again.');
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 2.2: Logic Puzzle</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Read the clues and deduce the correct answer.
      </p>
      
      <div style={{ 
        background: '#f5f5f5',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20
      }}>
        <h4 style={{ margin: '0 0 15px', color: '#333' }}>📋 Clues:</h4>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {puzzle.clues.map((clue, i) => (
            <li key={i} style={{ marginBottom: 8, color: '#555', lineHeight: 1.5 }}>{clue}</li>
          ))}
        </ul>
      </div>

      <div style={{ 
        background: '#e3f2fd',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        textAlign: 'center'
      }}>
        <h4 style={{ margin: 0, color: '#1976d2' }}>❓ {puzzle.question}</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {puzzle.options.map(option => (
            <label 
              key={option}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: 15,
                border: selected === option ? '2px solid #2196F3' : '2px solid #ddd',
                borderRadius: 8,
                cursor: 'pointer',
                background: selected === option ? '#e3f2fd' : 'white',
                transition: 'all 0.2s'
              }}
            >
              <input 
                type="radio"
                name="answer"
                value={option}
                checked={selected === option}
                onChange={(e) => setSelected(e.target.value)}
                style={{ marginRight: 10 }}
              />
              {option}
            </label>
          ))}
        </div>

        {error && <div style={{ color: 'red', marginBottom: 15, textAlign: 'center' }}>{error}</div>}
        
        <button 
          type="submit"
          disabled={!selected}
          style={{ 
            width: '100%',
            background: selected ? '#2196F3' : '#ccc', 
            color: 'white', 
            border: 'none', 
            padding: '12px 20px', 
            borderRadius: 4, 
            cursor: selected ? 'pointer' : 'not-allowed',
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

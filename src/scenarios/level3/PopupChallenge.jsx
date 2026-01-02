import React, { useState, useEffect, useCallback } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const PopupChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [stage, setStage] = useState(0);
  const [promptAnswer, setPromptAnswer] = useState('');
  const [showPromptModal, setShowPromptModal] = useState(false);

  // Stage 0: Click button to trigger alert
  // Stage 1: Alert shown (simulated), then confirm
  // Stage 2: Confirm shown (simulated)
  // Stage 3: Prompt shown (simulated)
  // Stage 4: Complete

  const handleInitialClick = () => {
    // Simulate alert
    setStage(1);
  };

  const handleAlertOk = () => {
    setStage(2);
  };

  const handleConfirmYes = () => {
    setStage(3);
    setShowPromptModal(true);
  };

  const handleConfirmNo = () => {
    setStage(0); // Reset
  };

  const handlePromptSubmit = () => {
    if (promptAnswer.toLowerCase() === 'i accept') {
      setShowPromptModal(false);
      setStage(4);
      setTimeout(() => completeLevel(), 500);
    }
  };

  const handlePromptCancel = () => {
    setShowPromptModal(false);
    setStage(0); // Reset
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 3.3: Popup Handling</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Handle the series of popups correctly.
      </p>
      
      {/* Progress indicator */}
      <div style={{ marginBottom: 25 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {['Alert', 'Confirm', 'Prompt', 'Done'].map((step, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              opacity: stage > i ? 1 : 0.4
            }}>
              <div style={{ 
                width: 30, 
                height: 30, 
                borderRadius: '50%', 
                background: stage > i ? '#4CAF50' : '#e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {stage > i ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: '12px', marginTop: 5, color: stage > i ? '#4CAF50' : '#999' }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Initial button */}
      {stage === 0 && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleInitialClick}
            style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: 8,
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Start Popup Sequence
          </button>
        </div>
      )}

      {/* Simulated Alert */}
      {stage === 1 && (
        <div style={{ 
          background: '#fff3e0',
          border: '1px solid #FFB74D',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: 10 }}>⚠️</div>
          <p style={{ margin: '0 0 15px', fontWeight: 'bold' }}>Alert!</p>
          <p style={{ margin: '0 0 15px', color: '#666' }}>This is a simulated alert. Click OK to continue.</p>
          <button
            onClick={handleAlertOk}
            style={{
              background: '#FF9800',
              color: 'white',
              border: 'none',
              padding: '10px 30px',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            OK
          </button>
        </div>
      )}

      {/* Simulated Confirm */}
      {stage === 2 && (
        <div style={{ 
          background: '#e3f2fd',
          border: '1px solid #64B5F6',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: 10 }}>❓</div>
          <p style={{ margin: '0 0 15px', fontWeight: 'bold' }}>Confirm</p>
          <p style={{ margin: '0 0 15px', color: '#666' }}>Do you want to proceed to the final step?</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <button
              onClick={handleConfirmNo}
              style={{
                background: '#9e9e9e',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmYes}
              style={{
                background: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Simulated Prompt */}
      {showPromptModal && (
        <div style={{ 
          background: '#f3e5f5',
          border: '1px solid #BA68C8',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: 10 }}>✏️</div>
          <p style={{ margin: '0 0 15px', fontWeight: 'bold' }}>Prompt</p>
          <p style={{ margin: '0 0 15px', color: '#666' }}>Type "I accept" to complete:</p>
          <input
            type="text"
            value={promptAnswer}
            onChange={(e) => setPromptAnswer(e.target.value)}
            placeholder="Type here..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #BA68C8',
              borderRadius: 4,
              marginBottom: 15,
              boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <button
              onClick={handlePromptCancel}
              style={{
                background: '#9e9e9e',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handlePromptSubmit}
              style={{
                background: '#9C27B0',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Completed */}
      {stage === 4 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#4CAF50', 
          fontSize: '24px', 
          fontWeight: 'bold' 
        }}>
          ✓ All popups handled correctly!
        </div>
      )}

      <p style={{ marginTop: 25, color: '#888', fontSize: '14px', textAlign: 'center' }}>
        This tests the AI's ability to handle browser popups.
      </p>
    </div>
  );
};

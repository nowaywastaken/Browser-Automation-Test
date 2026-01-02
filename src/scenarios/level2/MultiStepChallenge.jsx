import React, { useState } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const STEPS = [
  { instruction: "Step 1: Click the 'Initialize' button", action: 'click', target: 'initialize' },
  { instruction: "Step 2: Type 'ready' in the input field", action: 'type', target: 'input', value: 'ready' },
  { instruction: "Step 3: Check the confirmation checkbox", action: 'check', target: 'checkbox' },
  { instruction: "Step 4: Select 'Confirm' from the dropdown", action: 'select', target: 'dropdown', value: 'confirm' },
  { instruction: "Step 5: Click the 'Complete' button", action: 'click', target: 'complete' }
];

export const MultiStepChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [initialized, setInitialized] = useState(false);

  const validateStep = (action, target, value) => {
    const step = STEPS[currentStep];
    if (step.action === action && step.target === target) {
      if (step.value && value !== step.value) {
        return false;
      }
      if (currentStep === STEPS.length - 1) {
        completeLevel();
      } else {
        setCurrentStep(currentStep + 1);
      }
      return true;
    }
    return false;
  };

  const handleInitialize = () => {
    if (validateStep('click', 'initialize')) {
      setInitialized(true);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.toLowerCase() === 'ready') {
      validateStep('type', 'input', 'ready');
    }
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      validateStep('check', 'checkbox');
    }
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value === 'confirm') {
      validateStep('select', 'dropdown', 'confirm');
    }
  };

  const handleComplete = () => {
    validateStep('click', 'complete');
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 550, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 2.5: Multi-Step Task</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Complete all 5 steps in the correct order.
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: 25 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: '14px', color: '#666' }}>Progress</span>
          <span style={{ fontSize: '14px', color: '#666' }}>{currentStep}/{STEPS.length}</span>
        </div>
        <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ 
            width: `${(currentStep / STEPS.length) * 100}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Current instruction */}
      <div style={{ 
        background: currentStep < STEPS.length ? '#e3f2fd' : '#e8f5e9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: currentStep < STEPS.length ? '#1976d2' : '#4CAF50' }}>
          {currentStep < STEPS.length ? STEPS[currentStep].instruction : '✓ All steps completed!'}
        </p>
      </div>
      
      {/* Step 1: Initialize button */}
      <div style={{ marginBottom: 15, opacity: currentStep === 0 ? 1 : 0.5 }}>
        <button 
          onClick={handleInitialize}
          disabled={currentStep !== 0}
          style={{ 
            background: initialized ? '#4CAF50' : '#2196F3', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: 4, 
            cursor: currentStep === 0 ? 'pointer' : 'not-allowed'
          }}
        >
          {initialized ? '✓ Initialized' : 'Initialize'}
        </button>
      </div>

      {/* Step 2: Text input */}
      <div style={{ marginBottom: 15, opacity: currentStep === 1 ? 1 : 0.5 }}>
        <input 
          type="text"
          placeholder="Type 'ready' here"
          value={inputValue}
          onChange={handleInputChange}
          disabled={currentStep !== 1}
          style={{ 
            width: '100%', 
            padding: '10px', 
            border: currentStep >= 2 ? '2px solid #4CAF50' : '1px solid #ccc', 
            borderRadius: 4,
            boxSizing: 'border-box'
          }} 
        />
      </div>

      {/* Step 3: Checkbox */}
      <div style={{ marginBottom: 15, opacity: currentStep === 2 ? 1 : 0.5 }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: currentStep === 2 ? 'pointer' : 'not-allowed' }}>
          <input 
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
            disabled={currentStep !== 2}
            style={{ marginRight: 10, width: 20, height: 20 }}
          />
          I confirm I want to proceed
        </label>
      </div>

      {/* Step 4: Dropdown */}
      <div style={{ marginBottom: 15, opacity: currentStep === 3 ? 1 : 0.5 }}>
        <select 
          value={selectValue}
          onChange={handleSelect}
          disabled={currentStep !== 3}
          style={{ 
            width: '100%', 
            padding: '10px', 
            border: currentStep >= 4 ? '2px solid #4CAF50' : '1px solid #ccc', 
            borderRadius: 4 
          }}
        >
          <option value="">Select an option...</option>
          <option value="cancel">Cancel</option>
          <option value="confirm">Confirm</option>
          <option value="retry">Retry</option>
        </select>
      </div>

      {/* Step 5: Complete button */}
      <div style={{ opacity: currentStep === 4 ? 1 : 0.5 }}>
        <button 
          onClick={handleComplete}
          disabled={currentStep !== 4}
          style={{ 
            width: '100%',
            background: currentStep === 4 ? '#4CAF50' : '#ccc', 
            color: 'white', 
            border: 'none', 
            padding: '12px 20px', 
            borderRadius: 4, 
            cursor: currentStep === 4 ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

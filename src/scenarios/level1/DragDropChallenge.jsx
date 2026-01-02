import React, { useState, useRef } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const DragDropChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [isDragging, setIsDragging] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 });
  const dragRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', 'dragging');
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropped(true);
    setTimeout(() => {
      completeLevel();
    }, 500);
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 600, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 1.4: Drag & Drop</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Drag the blue box into the green target zone.
      </p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        minHeight: 200,
        padding: 20
      }}>
        {/* Draggable element */}
        {!isDropped && (
          <div
            ref={dragRef}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              width: 80,
              height: 80,
              background: isDragging ? '#1976D2' : '#2196F3',
              borderRadius: 8,
              cursor: 'grab',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              boxShadow: isDragging ? '0 8px 20px rgba(33, 150, 243, 0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
              transform: isDragging ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            DRAG ME
          </div>
        )}

        <div style={{ fontSize: '24px', color: '#999' }}>→</div>

        {/* Drop zone */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: 120,
            height: 120,
            background: isDropped ? '#4CAF50' : '#e8f5e9',
            border: `3px dashed ${isDropped ? '#4CAF50' : '#4CAF50'}`,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isDropped ? 'white' : '#4CAF50',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
        >
          {isDropped ? '✓ DROPPED!' : 'DROP HERE'}
        </div>
      </div>

      <p style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>
        {isDropped ? 'Great job! Moving to next level...' : 'Use mouse drag-and-drop to complete this challenge.'}
      </p>
    </div>
  );
};

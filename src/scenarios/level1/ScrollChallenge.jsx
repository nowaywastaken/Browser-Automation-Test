import React, { useState, useRef, useEffect } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const ScrollChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [completed, setCompleted] = useState(false);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // Check if button is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !completed) {
            // Button is now visible
            console.log('[Scroll Challenge] Target button is now visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => observer.disconnect();
  }, [completed]);

  const handleClick = () => {
    setCompleted(true);
    setTimeout(() => completeLevel(), 500);
  };

  // Generate filler content
  const fillerItems = Array.from({ length: 20 }, (_, i) => (
    <div 
      key={i} 
      style={{ 
        padding: 20, 
        background: i % 2 === 0 ? '#f9f9f9' : '#fff',
        borderBottom: '1px solid #eee'
      }}
    >
      <h4 style={{ margin: 0, color: '#666' }}>Section {i + 1}</h4>
      <p style={{ margin: '10px 0 0', color: '#999' }}>
        This is filler content #{i + 1}. Keep scrolling to find the hidden button at the bottom.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  ));

  return (
    <div className="challenge-card" style={{ maxWidth: 600, margin: '0 auto', background: 'white', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '20px 40px', borderBottom: '1px solid #eee' }}>
        <h3 style={{ marginTop: 0 }}>Level 1.7: Scroll Quest</h3>
        <p style={{ marginBottom: 0, color: '#555' }}>
          <strong>Task:</strong> Scroll down to find and click the hidden "Complete" button at the bottom of this container.
        </p>
      </div>
      
      <div 
        ref={containerRef}
        style={{ 
          height: 400, 
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        {fillerItems}
        
        {/* Hidden button at the bottom */}
        <div style={{ 
          padding: 40, 
          textAlign: 'center',
          background: 'linear-gradient(180deg, #fff 0%, #e8f5e9 100%)'
        }}>
          <p style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: 20 }}>
            🎉 You found it! Click the button below.
          </p>
          <button
            ref={buttonRef}
            onClick={handleClick}
            disabled={completed}
            style={{ 
              background: completed ? '#81c784' : '#4CAF50', 
              color: 'white', 
              border: 'none', 
              padding: '15px 30px', 
              borderRadius: 8, 
              cursor: completed ? 'default' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {completed ? '✓ Completed!' : 'Complete Level'}
          </button>
        </div>
      </div>
    </div>
  );
};

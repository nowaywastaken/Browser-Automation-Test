import React, { useState, useEffect, useRef } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

export const ContextMenuChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [completed, setCompleted] = useState(false);
  const targetRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleMenuClick = (action) => {
    setMenuVisible(false);
    if (action === 'complete') {
      setCompleted(true);
      setTimeout(() => completeLevel(), 500);
    }
  };

  // Close menu when clicking elsewhere
  useEffect(() => {
    const handleClick = () => setMenuVisible(false);
    if (menuVisible) {
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [menuVisible]);

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Level 1.6: Context Menu</h3>
      <p style={{ marginBottom: 20, color: '#555' }}>
        <strong>Task:</strong> Right-click on the target box below and select "Complete Level" from the context menu.
      </p>
      
      <div 
        ref={targetRef}
        onContextMenu={handleContextMenu}
        style={{ 
          width: '100%', 
          height: 150, 
          background: completed ? '#e8f5e9' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'context-menu',
          userSelect: 'none'
        }}
      >
        {completed ? '✓ Level Complete!' : 'Right-Click Here'}
      </div>

      {/* Custom Context Menu */}
      {menuVisible && (
        <div 
          style={{
            position: 'fixed',
            top: menuPosition.y,
            left: menuPosition.x,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: 4,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
            minWidth: 180,
            overflow: 'hidden'
          }}
        >
          <div 
            onClick={() => handleMenuClick('view')}
            style={{ 
              padding: '10px 15px', 
              cursor: 'pointer',
              borderBottom: '1px solid #eee',
              color: '#666'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            📋 View Details
          </div>
          <div 
            onClick={() => handleMenuClick('copy')}
            style={{ 
              padding: '10px 15px', 
              cursor: 'pointer',
              borderBottom: '1px solid #eee',
              color: '#666'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            📄 Copy Text
          </div>
          <div 
            onClick={() => handleMenuClick('complete')}
            style={{ 
              padding: '10px 15px', 
              cursor: 'pointer',
              color: '#4CAF50',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => e.target.style.background = '#e8f5e9'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            ✓ Complete Level
          </div>
        </div>
      )}

      <p style={{ marginTop: 20, color: '#888', fontSize: '14px', textAlign: 'center' }}>
        This tests the AI's ability to perform right-click actions.
      </p>
    </div>
  );
};

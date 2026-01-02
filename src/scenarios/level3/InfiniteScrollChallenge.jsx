import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGauntlet } from '../../context/GauntletContext';

const TOTAL_ITEMS = 100;
const TARGET_POSITION = 47; // The item they need to find (1-indexed)
const ITEMS_PER_BATCH = 10;

export const InfiniteScrollChallenge = () => {
  const { completeLevel } = useGauntlet();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Generate items
  const generateItems = useCallback((start, count) => {
    return Array.from({ length: count }, (_, i) => {
      const index = start + i + 1;
      const isTarget = index === TARGET_POSITION;
      return {
        id: index,
        text: isTarget ? '🎯 TARGET ITEM - Click Me!' : `Item #${index}`,
        isTarget
      };
    });
  }, []);

  // Initial load
  useEffect(() => {
    setItems(generateItems(0, ITEMS_PER_BATCH));
  }, [generateItems]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && items.length < TOTAL_ITEMS) {
          setLoading(true);
          // Simulate network delay
          setTimeout(() => {
            setItems(prev => [
              ...prev,
              ...generateItems(prev.length, ITEMS_PER_BATCH)
            ]);
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [items.length, loading, generateItems]);

  const handleItemClick = (item) => {
    if (item.isTarget) {
      setCompleted(true);
      setTimeout(() => completeLevel(), 500);
    }
  };

  return (
    <div className="challenge-card" style={{ maxWidth: 500, margin: '0 auto', background: 'white', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '20px 40px', borderBottom: '1px solid #eee' }}>
        <h3 style={{ marginTop: 0 }}>Level 3.5: Infinite Scroll</h3>
        <p style={{ marginBottom: 0, color: '#555' }}>
          <strong>Task:</strong> Scroll down to find and click the target item (Item #{TARGET_POSITION}).
        </p>
      </div>
      
      <div 
        ref={containerRef}
        style={{ 
          height: 350, 
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{
              padding: '15px 20px',
              borderBottom: '1px solid #eee',
              background: item.isTarget 
                ? (completed ? '#e8f5e9' : 'linear-gradient(90deg, #4CAF50, #8BC34A)')
                : (item.id % 2 === 0 ? '#fafafa' : 'white'),
              color: item.isTarget ? 'white' : '#333',
              cursor: item.isTarget ? 'pointer' : 'default',
              fontWeight: item.isTarget ? 'bold' : 'normal',
              fontSize: item.isTarget ? '16px' : '14px',
              transition: 'all 0.2s'
            }}
          >
            {completed && item.isTarget ? '✓ Found and clicked!' : item.text}
          </div>
        ))}

        {/* Load more trigger */}
        {items.length < TOTAL_ITEMS && (
          <div 
            ref={loadMoreRef}
            style={{ 
              padding: 20, 
              textAlign: 'center',
              color: '#888'
            }}
          >
            {loading ? (
              <span>Loading more items...</span>
            ) : (
              <span>Scroll for more</span>
            )}
          </div>
        )}

        {items.length >= TOTAL_ITEMS && !completed && (
          <div style={{ 
            padding: 20, 
            textAlign: 'center',
            color: '#f44336',
            fontWeight: 'bold'
          }}>
            You missed the target! Scroll back up to find Item #{TARGET_POSITION}
          </div>
        )}
      </div>

      <div style={{ 
        padding: 15, 
        borderTop: '1px solid #eee',
        background: '#f5f5f5',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        Items loaded: {items.length}/{TOTAL_ITEMS} | Target: Item #{TARGET_POSITION}
      </div>
    </div>
  );
};

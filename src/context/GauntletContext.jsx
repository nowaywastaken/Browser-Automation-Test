import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Define the level order for automatic progression
const LEVEL_ORDER = [
  'level-1-1', 'level-1-2', 'level-1-3', 'level-1-4', 'level-1-5', 'level-1-6', 'level-1-7',
  'level-2-1', 'level-2-2', 'level-2-3', 'level-2-4', 'level-2-5', 'level-2-6',
  'level-3-1', 'level-3-2', 'level-3-3', 'level-3-4', 'level-3-5', 'level-3-6'
];

const GauntletContext = createContext();

export const GauntletProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [levelComplete, setLevelComplete] = useState(false);

  // Read level from URL hash on mount and on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash && LEVEL_ORDER.includes(hash)) {
        setCurrentLevel(hash);
        setIsRunning(true);
        setLevelComplete(false);
        if (!startTime) {
          setStartTime(Date.now());
        }
        console.log(`[Gauntlet] Level ${hash} loaded from URL.`);
      }
    };

    // Initial check
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [startTime]);

  const startLevel = useCallback((levelId) => {
    setLogs([]);
    setCurrentLevel(levelId);
    setIsRunning(true);
    setStartTime(Date.now());
    setLevelComplete(false);
    // Update URL
    window.location.hash = levelId;
    console.log(`[Gauntlet] Level ${levelId} started.`);
  }, []);

  const stopLevel = useCallback(() => {
    setIsRunning(false);
    window.location.hash = '';
    console.log(`[Gauntlet] Level ${currentLevel} stopped.`);
  }, [currentLevel]);

  // Mark current level as complete and REDIRECT to next level URL
  const completeLevel = useCallback(() => {
    if (!currentLevel || levelComplete) return;
    
    setLevelComplete(true);
    console.log(`[Gauntlet] Level ${currentLevel} COMPLETED!`);
    
    // Add completion event to logs
    setLogs(prev => [...prev, {
      type: 'level_complete',
      level: currentLevel,
      timestamp: Date.now(),
      relativeTime: Date.now() - startTime
    }]);
    
    // Find next level
    const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
    if (currentIndex >= 0 && currentIndex < LEVEL_ORDER.length - 1) {
      const nextLevel = LEVEL_ORDER[currentIndex + 1];
      console.log(`[Gauntlet] Redirecting to ${nextLevel}...`);
      
      // DIRECTLY redirect via URL change after short delay
      setTimeout(() => {
        window.location.hash = nextLevel;
      }, 800);
    } else {
      // All levels complete
      console.log(`[Gauntlet] ALL LEVELS COMPLETE! Congratulations!`);
      setTimeout(() => {
        window.location.hash = 'complete';
        setIsRunning(false);
      }, 800);
    }
  }, [currentLevel, levelComplete, startTime]);

  // Start from the beginning
  const startGauntlet = useCallback(() => {
    const firstLevel = LEVEL_ORDER[0];
    startLevel(firstLevel);
  }, [startLevel]);

  const addLog = useCallback((event) => {
    const logEntry = { 
      ...event, 
      timestamp: Date.now(), 
      relativeTime: startTime ? Date.now() - startTime : 0,
      level: currentLevel
    };
    console.log('[Gauntlet Log]', logEntry);
    setLogs(prev => [...prev, logEntry]);
  }, [startTime, currentLevel]);

  // Get current progress
  const getCurrentProgress = useCallback(() => {
    if (!currentLevel) return { current: 0, total: LEVEL_ORDER.length };
    const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
    return { current: currentIndex + 1, total: LEVEL_ORDER.length };
  }, [currentLevel]);

  return (
    <GauntletContext.Provider value={{ 
      logs, 
      isRunning, 
      startLevel, 
      stopLevel, 
      addLog, 
      currentLevel, 
      startTime,
      completeLevel,
      levelComplete,
      startGauntlet,
      getCurrentProgress,
      LEVEL_ORDER
    }}>
      {children}
    </GauntletContext.Provider>
  );
};

export const useGauntlet = () => useContext(GauntletContext);

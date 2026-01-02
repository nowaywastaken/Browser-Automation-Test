import React, { createContext, useContext, useState, useCallback } from 'react';

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

  const startLevel = useCallback((levelId) => {
    setLogs([]);
    setCurrentLevel(levelId);
    setIsRunning(true);
    setStartTime(Date.now());
    setLevelComplete(false);
    console.log(`[Gauntlet] Level ${levelId} started.`);
  }, []);

  const stopLevel = useCallback(() => {
    setIsRunning(false);
    console.log(`[Gauntlet] Level ${currentLevel} stopped.`);
  }, [currentLevel]);

  // Mark current level as complete and auto-advance to next
  const completeLevel = useCallback(() => {
    if (!currentLevel || levelComplete) return;
    
    setLevelComplete(true);
    console.log(`[Gauntlet] Level ${currentLevel} COMPLETED!`);
    
    // Find next level
    const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
    if (currentIndex >= 0 && currentIndex < LEVEL_ORDER.length - 1) {
      const nextLevel = LEVEL_ORDER[currentIndex + 1];
      console.log(`[Gauntlet] Auto-advancing to ${nextLevel}...`);
      
      // Short delay to show completion, then advance
      setTimeout(() => {
        setLogs([]);
        setCurrentLevel(nextLevel);
        setStartTime(Date.now());
        setLevelComplete(false);
        console.log(`[Gauntlet] Level ${nextLevel} started.`);
      }, 1500);
    } else {
      // All levels complete
      console.log(`[Gauntlet] ALL LEVELS COMPLETE! Congratulations!`);
      setTimeout(() => {
        setIsRunning(false);
      }, 1500);
    }
  }, [currentLevel, levelComplete]);

  // Start from the beginning
  const startGauntlet = useCallback(() => {
    const firstLevel = LEVEL_ORDER[0];
    startLevel(firstLevel);
  }, [startLevel]);

  const addLog = useCallback((event) => {
    setLogs(prev => [...prev, { ...event, timestamp: Date.now(), relativeTime: Date.now() - startTime }]);
  }, [startTime]);

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

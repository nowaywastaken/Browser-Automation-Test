import React, { createContext, useContext, useState, useCallback } from 'react';

const GauntletContext = createContext();

export const GauntletProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const startLevel = useCallback((levelId) => {
    setLogs([]);
    setCurrentLevel(levelId);
    setIsRunning(true);
    setStartTime(Date.now());
    console.log(`[Gauntlet] Level ${levelId} started.`);
  }, []);

  const stopLevel = useCallback(() => {
    setIsRunning(false);
    console.log(`[Gauntlet] Level ${currentLevel} stopped.`);
  }, [currentLevel]);

  const addLog = useCallback((event) => {
    // We update state functionally to avoid staleness in closure efficiently
    setLogs(prev => [...prev, { ...event, timestamp: Date.now(), relativeTime: Date.now() - startTime }]);
  }, [startTime]);

  return (
    <GauntletContext.Provider value={{ logs, isRunning, startLevel, stopLevel, addLog, currentLevel, startTime }}>
      {children}
    </GauntletContext.Provider>
  );
};

export const useGauntlet = () => useContext(GauntletContext);

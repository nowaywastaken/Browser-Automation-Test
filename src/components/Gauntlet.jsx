import React, { useState, useEffect } from 'react';
import { useGauntlet } from '../context/GauntletContext';
import { useObserver } from '../hooks/useObserver';

export const Gauntlet = ({ children }) => {
  useObserver(); // Activate spyware
  const { logs, isRunning, startLevel, stopLevel, currentLevel } = useGauntlet();
  
  const [selectedLevel, setSelectedLevel] = useState('level-1');

  // Auto-start support via URL parameter: ?autostart=level-1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    if (autostart && !isRunning && !currentLevel) {
      const validLevels = ['level-1', 'level-2', 'level-3'];
      if (validLevels.includes(autostart)) {
        setSelectedLevel(autostart);
        startLevel(autostart);
      }
    }
  }, [startLevel, isRunning, currentLevel]);

  const downloadReport = () => {
    if (logs.length === 0) return;
    
    const startTime = logs[0].timestamp;
    const endTime = logs[logs.length - 1].timestamp;
    
    const report = {
        title: "Silicon Gauntlet Report",
        level: currentLevel,
        sessionId: new Date(startTime).toISOString(),
        durationMs: endTime - startTime,
        totalEvents: logs.length,
        score: "PENDING ASSESSOR", // Placeholder for auto-grading
        logs: logs
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gauntlet-report-${currentLevel}-${Date.now()}.json`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* The Arena */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <header data-gauntlet-ui="true" style={{ padding: '15px', background: '#222', color: '#fff', borderBottom: '1px solid #444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.2rem' }}>Silicon Gauntlet <span style={{fontSize: '0.8em', color: '#666'}}>v0.1</span></h1>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <select 
                    value={selectedLevel} 
                    onChange={e => setSelectedLevel(e.target.value)}
                    disabled={isRunning}
                    style={{ padding: '5px', borderRadius: '4px' }}
                >
                    <option value="level-1">Level 1: Fundamentals</option>
                    <option value="level-2">Level 2: Cognitive</option>
                    <option value="level-3">Level 3: Dynamic</option>
                </select>

                {!isRunning ? (
                    <>
                        <button 
                            onClick={() => startLevel(selectedLevel)}
                            style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            START SCENARIO
                        </button>
                        {logs.length > 0 && (
                            <button 
                                onClick={downloadReport}
                                style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                DOWNLOAD REPORT
                            </button>
                        )}
                    </>
                ) : (
                    <button 
                        onClick={stopLevel}
                        style={{ background: '#F44336', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold', animation: 'pulse 2s infinite' }}
                    >
                        DOWNLOAD REPORT
                    </button>
                )}
            </div>
          </header>

         <div id="scenario-root" style={{ flex: 1, padding: 40, background: '#f5f5f5', overflowY: 'auto', position: 'relative' }}>
            {!isRunning && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', zIndex: 10 }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Ready Agent One?</h2>
                        {logs.length > 0 ? (
                             <p>Scenario complete. Download your report or start again.</p>
                        ) : (
                             <p>Select a level and press Start to begin telemetry recording.</p>
                        )}
                    </div>
                </div>
            )}
            
            {/* This is where the specific scenario component will render */}
            {children}
         </div>
      </div>

      {/* The Terminal */}
      <div data-gauntlet-ui="true" style={{ width: '350px', background: '#1e1e1e', color: '#0f0', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #333' }}>
        <div style={{ padding: '10px', background: '#333', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
            TERMINAL // LOGS
        </div>
        <div style={{ flex: 1, padding: '10px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '12px' }}>
            {logs.length === 0 && <div style={{ color: '#666' }}>Waiting for signals...</div>}
            {logs.map((log, i) => (
                <div key={i} style={{ marginBottom: 6, borderBottom: '1px solid #333', paddingBottom: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                        <span>{log.type.toUpperCase()}</span>
                        <span>+{log.relativeTime}ms</span>
                    </div>
                    <div style={{ color: '#eee' }}>
                        &lt;{log.targetTag.toLowerCase()} 
                        {log.targetId ? <span style={{ color: '#4fc3f7' }}>#{log.targetId}</span> : ''}
                        {log.targetClass ? <span style={{ color: '#a5d6a7' }}>.{log.targetClass.split(' ').join('.')}</span> : ''}
                        &gt;
                    </div>
                    {log.value !== undefined && <div style={{ color: '#ffb74d' }}>val: "{log.value}"</div>}
                    {log.innerText && <div style={{ color: '#ba68c8' }}>text: "{log.innerText}"</div>}
                    {log.key && <div style={{ color: '#ffb74d' }}>key: {log.key}</div>}
                </div>
            ))}
        </div>
        <div style={{ padding: 10, borderTop: '1px solid #333', fontSize: '12px' }}>
            Status: {isRunning ? <span style={{ color: '#4CAF50' }}>RECORDING</span> : <span style={{ color: '#F44336' }}>IDLE</span>} | Events: {logs.length}
        </div>
      </div>
    </div>
  );
};

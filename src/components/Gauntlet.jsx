import React, { useEffect } from 'react';
import { useGauntlet } from '../context/GauntletContext';
import { useObserver } from '../hooks/useObserver';

export const Gauntlet = ({ children }) => {
  useObserver(); // Activate spyware
  const { logs, isRunning, startGauntlet, stopLevel, currentLevel, levelComplete, getCurrentProgress, LEVEL_ORDER } = useGauntlet();
  
  const progress = getCurrentProgress();

  // Auto-start support via URL parameter: ?autostart=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    if (autostart === 'true' && !isRunning && !currentLevel) {
      startGauntlet();
    }
  }, [startGauntlet, isRunning, currentLevel]);

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
        score: "PENDING ASSESSOR",
        logs: logs
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gauntlet-report-${currentLevel}-${Date.now()}.json`;
    a.click();
  };

  // Get level display name
  const getLevelDisplayName = (levelId) => {
    if (!levelId) return '';
    const parts = levelId.split('-');
    return `Level ${parts[1]}.${parts[2]}`;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* The Arena */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <header data-gauntlet-ui="true" style={{ padding: '15px', background: '#222', color: '#fff', borderBottom: '1px solid #444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.2rem' }}>Silicon Gauntlet <span style={{fontSize: '0.8em', color: '#666'}}>v0.2</span></h1>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Progress indicator */}
                {isRunning && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      background: '#333', 
                      padding: '5px 12px', 
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{ color: '#4CAF50' }}>{getLevelDisplayName(currentLevel)}</span>
                      <span style={{ color: '#666', marginLeft: '10px' }}>
                        ({progress.current}/{progress.total})
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div style={{ 
                      width: '100px', 
                      height: '6px', 
                      background: '#444', 
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${(progress.current / progress.total) * 100}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                )}

                {!isRunning ? (
                    <>
                        <button 
                            onClick={startGauntlet}
                            style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            START GAUNTLET
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
                        onClick={() => {
                          stopLevel();
                          downloadReport();
                        }}
                        style={{ background: '#F44336', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold', animation: 'pulse 2s infinite' }}
                    >
                        STOP & DOWNLOAD
                    </button>
                )}
            </div>
          </header>

         <div id="scenario-root" style={{ flex: 1, padding: 40, background: '#f5f5f5', overflowY: 'auto', position: 'relative' }}>
            {/* Level Complete Overlay */}
            {levelComplete && (
                <div style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, right: 0, bottom: 0, 
                  background: 'rgba(76, 175, 80, 0.95)', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  color: 'white', 
                  zIndex: 20,
                  animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', margin: 0 }}>✓ LEVEL COMPLETE</h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                          {progress.current < progress.total 
                            ? 'Loading next challenge...' 
                            : '🎉 ALL LEVELS COMPLETE! 🎉'}
                        </p>
                    </div>
                </div>
            )}
            
            {/* Waiting Overlay */}
            {!isRunning && !levelComplete && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', zIndex: 10 }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Ready Agent One?</h2>
                        {logs.length > 0 ? (
                             <p>Scenario complete. Download your report or start again.</p>
                        ) : (
                             <p>Press START GAUNTLET to begin the challenge.<br/>
                             <span style={{fontSize: '0.9em', color: '#888'}}>
                               {LEVEL_ORDER.length} levels await. No manual level selection—just survive.
                             </span>
                             </p>
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

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

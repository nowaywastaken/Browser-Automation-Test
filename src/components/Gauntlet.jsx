import React, { useEffect } from 'react';
import { useGauntlet } from '../context/GauntletContext';
import { useObserver } from '../hooks/useObserver';

export const Gauntlet = ({ children }) => {
  useObserver(); // Activate event logging
  const { logs, isRunning, startGauntlet, stopLevel, currentLevel, levelComplete, getCurrentProgress, LEVEL_ORDER } = useGauntlet();
  
  const progress = getCurrentProgress();
  const isComplete = window.location.hash === '#complete';

  // Download report automatically
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
      {/* ========== MAIN CHALLENGE AREA ========== */}
      {/* This is the ONLY area the AI should interact with */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
         <div 
           id="challenge-area" 
           style={{ 
             flex: 1, 
             padding: 40, 
             background: '#f5f5f5', 
             overflowY: 'auto', 
             position: 'relative' 
           }}
         >
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
                          Redirecting to next level...
                        </p>
                    </div>
                </div>
            )}

            {/* All Levels Complete */}
            {isComplete && (
                <div style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, right: 0, bottom: 0, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  color: 'white', 
                  zIndex: 20
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', margin: 0 }}>🎉 ALL LEVELS COMPLETE! 🎉</h2>
                        <p style={{ fontSize: '1.5rem', marginTop: 20 }}>
                          Congratulations! You've mastered all 19 challenges.
                        </p>
                    </div>
                </div>
            )}
            
            {/* Waiting state - no level selected */}
            {!isRunning && !isComplete && !currentLevel && (
                <div style={{ 
                  display: 'flex', 
                  height: '100%', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}>
                    <div style={{ textAlign: 'center', maxWidth: 500 }}>
                        <h2 style={{ color: '#333' }}>AI Browser Automation Test</h2>
                        <p style={{ color: '#666', marginBottom: 30 }}>
                          This test contains {LEVEL_ORDER.length} challenges to evaluate browser automation capabilities.
                        </p>
                        <p style={{ color: '#888', fontSize: '14px' }}>
                          To start: Navigate to <code style={{ background: '#eee', padding: '2px 6px', borderRadius: 3 }}>#level-1-1</code> in the URL
                        </p>
                        <p style={{ color: '#888', fontSize: '14px', marginTop: 10 }}>
                          Example: <code style={{ background: '#eee', padding: '2px 6px', borderRadius: 3 }}>http://localhost:5174/#level-1-1</code>
                        </p>
                    </div>
                </div>
            )}
            
            {/* Challenge content renders here */}
            {children}
         </div>
      </div>

      {/* ========== MONITORING PANEL ========== */}
      {/* This panel is for HUMAN observation only. AI should NOT interact with this. */}
      {/* All elements marked with data-gauntlet-ui="true" and aria-hidden="true" */}
      <div 
        data-gauntlet-ui="true" 
        aria-hidden="true"
        style={{ 
          width: '320px', 
          background: '#1a1a1a', 
          color: '#0f0', 
          display: 'flex', 
          flexDirection: 'column', 
          borderLeft: '3px solid #333',
          userSelect: 'none',
          pointerEvents: 'none' // Prevent any interaction
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: '12px 15px', 
          background: '#000', 
          borderBottom: '2px solid #333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ color: '#666', fontSize: '10px', letterSpacing: '2px' }}>MONITORING PANEL</span>
            <h1 style={{ margin: '5px 0 0', fontSize: '1rem', color: '#fff' }}>
              Silicon Gauntlet <span style={{ color: '#666', fontSize: '0.8em' }}>v0.3</span>
            </h1>
          </div>
          {isRunning && (
            <div style={{ 
              background: '#4CAF50', 
              color: 'white', 
              padding: '4px 10px', 
              borderRadius: 4,
              fontSize: '11px',
              fontWeight: 'bold',
              animation: 'pulse 2s infinite'
            }}>
              ● REC
            </div>
          )}
        </div>

        {/* Progress */}
        {currentLevel && (
          <div style={{ padding: '15px', borderBottom: '1px solid #333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{getLevelDisplayName(currentLevel)}</span>
              <span style={{ color: '#666' }}>{progress.current}/{progress.total}</span>
            </div>
            <div style={{ height: 4, background: '#333', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ 
                width: `${(progress.current / progress.total) * 100}%`, 
                height: '100%', 
                background: '#4CAF50',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* Event Log */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ padding: '10px 15px', background: '#222', color: '#888', fontSize: '11px', borderBottom: '1px solid #333' }}>
            EVENT LOG ({logs.length})
          </div>
          <div style={{ 
            flex: 1, 
            padding: '10px', 
            overflowY: 'auto', 
            fontFamily: 'monospace', 
            fontSize: '11px',
            pointerEvents: 'auto' // Allow scrolling log
          }}>
            {logs.length === 0 && <div style={{ color: '#444' }}>No events recorded...</div>}
            {logs.slice(-50).map((log, i) => (
              <div key={i} style={{ 
                marginBottom: 8, 
                padding: '6px 8px',
                background: '#222',
                borderRadius: 4,
                borderLeft: `3px solid ${
                  log.type === 'level_complete' ? '#4CAF50' :
                  log.type === 'click' ? '#2196F3' :
                  log.type === 'input' ? '#FF9800' :
                  log.type === 'keydown' ? '#9C27B0' :
                  '#666'
                }`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: 4 }}>
                  <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{log.type}</span>
                  <span>+{log.relativeTime}ms</span>
                </div>
                {log.targetTag && (
                  <div style={{ color: '#aaa' }}>
                    &lt;{log.targetTag.toLowerCase()}
                    {log.targetId && <span style={{ color: '#4fc3f7' }}> #{log.targetId}</span>}
                    {log.targetName && <span style={{ color: '#81c784' }}> name="{log.targetName}"</span>}
                    &gt;
                  </div>
                )}
                {log.value !== undefined && log.value !== '' && (
                  <div style={{ color: '#ffb74d', wordBreak: 'break-all' }}>
                    value: "{log.value.substring(0, 50)}{log.value.length > 50 ? '...' : ''}"
                  </div>
                )}
                {log.key && <div style={{ color: '#ce93d8' }}>key: {log.key}</div>}
                {log.innerText && log.type === 'click' && (
                  <div style={{ color: '#90caf9', fontSize: '10px' }}>
                    text: "{log.innerText.substring(0, 30)}..."
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 15px', borderTop: '1px solid #333', fontSize: '11px', color: '#666' }}>
          <div>Status: {isRunning ? <span style={{ color: '#4CAF50' }}>RECORDING</span> : <span style={{ color: '#666' }}>IDLE</span>}</div>
          <div style={{ marginTop: 5 }}>
            <button 
              onClick={(e) => { e.stopPropagation(); downloadReport(); }}
              disabled={logs.length === 0}
              style={{ 
                background: logs.length > 0 ? '#2196F3' : '#333', 
                color: logs.length > 0 ? 'white' : '#666', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: 4, 
                cursor: logs.length > 0 ? 'pointer' : 'not-allowed',
                fontSize: '11px',
                pointerEvents: 'auto'
              }}
            >
              Download Report
            </button>
          </div>
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
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

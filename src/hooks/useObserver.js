import { useEffect, useRef } from 'react';
import { useGauntlet } from '../context/GauntletContext';

export const useObserver = () => {
  const { addLog, isRunning } = useGauntlet();
  const isRunningRef = useRef(isRunning);

  // Keep ref updated
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    const handleEvent = (e) => {
      // Don't log if not running
      if (!isRunningRef.current) return;

      // Ignore interactions with the Gauntlet monitoring UI
      // Check for data-gauntlet-ui attribute on target or any parent
      if (e.target.closest('[data-gauntlet-ui="true"]')) return;
      
      // Also ignore if target has aria-hidden (screen reader hidden = monitoring UI)
      if (e.target.closest('[aria-hidden="true"]')) return;

      const eventData = {
        type: e.type,
        targetTag: e.target.tagName,
        targetId: e.target.id || null,
        targetClass: e.target.className || null,
        targetName: e.target.name || null,
        targetType: e.target.type || null,
        targetPlaceholder: e.target.placeholder || null,
      };
      
      // Get text content for identification (limited)
      if (e.target.innerText) {
        eventData.innerText = e.target.innerText.substring(0, 100);
      }
      
      // Get parent context for better identification
      const parent = e.target.parentElement;
      if (parent) {
        const label = parent.querySelector('label');
        if (label) {
          eventData.associatedLabel = label.innerText?.substring(0, 50);
        }
      }

      // For associated label elements
      if (e.target.labels && e.target.labels.length > 0) {
        eventData.labels = Array.from(e.target.labels).map(l => l.innerText?.substring(0, 50));
      }
      
      if (e.type === 'keydown') {
        eventData.key = e.key;
        eventData.code = e.code;
        eventData.ctrlKey = e.ctrlKey;
        eventData.metaKey = e.metaKey;
        eventData.shiftKey = e.shiftKey;
        eventData.altKey = e.altKey;
      }
      
      if (e.type === 'click') {
        eventData.x = e.clientX;
        eventData.y = e.clientY;
        eventData.button = e.button; // 0=left, 2=right
      }
      
      if (e.type === 'input' || e.type === 'change') {
        eventData.value = e.target.value;
        eventData.checked = e.target.checked;
        eventData.selectedIndex = e.target.selectedIndex;
        if (e.target.selectedOptions) {
          eventData.selectedText = Array.from(e.target.selectedOptions).map(o => o.text);
        }
      }

      // Add special handling for form submission
      if (e.type === 'submit') {
        eventData.formId = e.target.id;
        eventData.formAction = e.target.action;
      }
      
      // Drag events
      if (e.type === 'dragstart' || e.type === 'drop' || e.type === 'dragend') {
        eventData.dataTransfer = true;
      }

      // Context menu (right click)
      if (e.type === 'contextmenu') {
        eventData.rightClick = true;
      }

      addLog(eventData);
    };

    // Capture ALL relevant events
    const events = [
      'click', 
      'input', 
      'change', 
      'keydown', 
      'submit',
      'dragstart',
      'drop',
      'dragend',
      'contextmenu',
      'focus',
      'blur'
    ];
    
    // Use capture phase to get events before they're handled
    events.forEach(ev => window.addEventListener(ev, handleEvent, { capture: true }));

    return () => {
      events.forEach(ev => window.removeEventListener(ev, handleEvent, { capture: true }));
    };
  }, [addLog]);
};

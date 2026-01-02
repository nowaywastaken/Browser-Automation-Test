import { useEffect } from 'react';
import { useGauntlet } from '../context/GauntletContext';

export const useObserver = () => {
  const { addLog, isRunning } = useGauntlet();

  useEffect(() => {
    if (!isRunning) return;

    const handleEvent = (e) => {
      // Ignore interactions with the Gauntlet UI itself
      if (e.target.closest('[data-gauntlet-ui="true"]')) return;

      const eventData = {
        type: e.type,
        targetTag: e.target.tagName,
        targetId: e.target.id,
        targetClass: e.target.className,
      };
      
      if (e.type === 'keydown') {
        eventData.key = e.key;
        eventData.code = e.code;
      }
      
      if (e.type === 'click') {
        eventData.x = e.clientX;
        eventData.y = e.clientY;
        eventData.innerText = e.target.innerText ? e.target.innerText.substring(0, 50) : '';
      }
      
      if (e.type === 'input' || e.type === 'change') {
        eventData.value = e.target.value;
      }

      // Add special handling for form submission
      if (e.type === 'submit') {
          eventData.formId = e.target.id;
      }

      addLog(eventData);
    };

    // We capture events to ensure we get them before propagation stops or early in the phase
    // 'scroll' doesn't bubble, so capture is needed.
    const events = ['click', 'input', 'change', 'keydown', 'scroll', 'submit'];
    
    events.forEach(ev => window.addEventListener(ev, handleEvent, { capture: true }));

    return () => {
      events.forEach(ev => window.removeEventListener(ev, handleEvent, { capture: true }));
    };
  }, [isRunning, addLog]);
};

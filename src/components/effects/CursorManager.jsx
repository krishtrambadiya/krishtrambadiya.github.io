import React, { useEffect, useState } from 'react';

const CursorManager = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [laggingPos, setLaggingPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isTouchLikeDevice = () => {
      if (typeof window === 'undefined') return false;
      return (
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches ||
        navigator.maxTouchPoints > 0
      );
    };

    const syncEnabled = () => {
      setEnabled(!isTouchLikeDevice());
    };

    syncEnabled();
    window.addEventListener('resize', syncEnabled);
    return () => window.removeEventListener('resize', syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;
    let animationFrameId;
    const render = () => {
      setLaggingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [enabled, position]);

  if (!enabled) return null;

  return (
    <>
      <div 
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-orange)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          mixBlendMode: 'screen'
        }} 
      />
      <div 
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: laggingPos.y,
          left: laggingPos.x,
          width: '40px',
          height: '40px',
          border: '1px solid var(--accent-orange-glow)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
          zIndex: 9998,
        }} 
      />
    </>
  );
};

export default CursorManager;

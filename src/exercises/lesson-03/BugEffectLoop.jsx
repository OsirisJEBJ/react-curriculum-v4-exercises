//src/exercises/lesson-03/BugEffectLoop.jsx

/* 
  BUG #1 — Effect Issue 

  This component uses useState and useEffect to update a value.
  The effect is running on every render, which causes the
  component to behave incorrectly.
  */

import { useEffect, useState } from 'react';

export default function BugEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Efecto corriendo');
    setCount((prev) => prev + 1);
  }, []);

  return <p>Bug 1 Count: {count}</p>;
}

// Explanation:
// The original useEffect caused an infinite loop because setCount triggered a re-render,
// and the effect ran again on every render. Adding [] ensures the effect runs only on mount.
// Using the functional form of setState (prev => prev + 1) avoids stale closures.

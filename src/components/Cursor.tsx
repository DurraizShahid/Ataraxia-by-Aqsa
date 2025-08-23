"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isMounted) {
    return null; // Don't render on the server
  }

  return (
    <div
      className={cn(
        "fixed z-[9999] pointer-events-none rounded-full bg-blue-500 opacity-70",
        "w-4 h-4 md:w-6 md:h-6", // Responsive sizing
        "transition-transform duration-100 ease-out" // Smooth, bouncy transition
      )}
      style={{
        transform: `translate(${position.x - (window.innerWidth >= 768 ? 12 : 8)}px, ${position.y - (window.innerWidth >= 768 ? 12 : 8)}px)`,
      }}
    />
  );
};

export default Cursor;
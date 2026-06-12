import React from 'react';
import { PreviewFooter } from './SharedComponents';

export function IsolatedFooterPreview() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-grow" />
      <PreviewFooter />
    </div>
  );
}
import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { PreviewNavbar } from './SharedComponents';

export function IsolatedNavbarPreview() {
  return (
    <div className="bg-white min-h-screen">
      <PreviewNavbar />
    </div>
  );
}
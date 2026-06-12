import React from 'react';
import { useLiveEditor } from '../../../contexts/LiveEditorContext';

interface EditableImageOverlayProps {
  id: string;
  children: React.ReactNode;
}

export function EditableImageOverlay({ id, children }: EditableImageOverlayProps) {
  const { setSelectedSection } = useLiveEditor();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Open image properties in left panel
    console.log('Edit image:', id);
  };

  return (
    <div onClick={handleClick} className="group relative cursor-pointer">
      {children}
      <div className="absolute inset-0 ring-2 ring-blue-500 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

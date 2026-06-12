import React from 'react';
import { useLiveEditor } from '../../../contexts/LiveEditorContext';
import { GripVertical } from 'lucide-react';

interface EditableSectionOverlayProps {
  id: string;
  page: string;
  children: React.ReactNode;
}

export function EditableSectionOverlay({ id, page, children }: EditableSectionOverlayProps) {
  const { state, updateSection, setSelectedSection } = useLiveEditor();
  const section = state.sections[id];

  if (!section) return null;

  if (!section.visible) {
    return (
      <div
        style={{
          paddingTop: section.paddingTop,
          paddingBottom: section.paddingBottom,
          backgroundColor: '#f3f4f6',
          border: '2px dashed #9ca3af',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
        }}
        onClick={() => updateSection(id, { visible: true })}
        className="cursor-pointer"
      >
        <span>Hidden Section: {section.label} (click to show)</span>
      </div>
    );
  }

  return (
    <section
      style={{
        paddingTop: section.paddingTop,
        paddingBottom: section.paddingBottom,
        backgroundColor: section.bgColor,
      }}
      className="group relative"
    >
      {/* Drag handle and edit bar */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded">
          <GripVertical className="h-4 w-4 cursor-grab" />
          <span className="text-sm">{section.label}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSection(id);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Edit Section
        </button>
      </div>
      {/* Blue outline on hover */}
      <div className="absolute inset-0 ring-2 ring-blue-500 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {children}
    </section>
  );
}

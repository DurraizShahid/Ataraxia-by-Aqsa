import React, { useState, useRef, useEffect } from 'react';
import { useLiveEditor } from '../../../contexts/LiveEditorContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Check, X } from 'lucide-react';

interface EditableTextOverlayProps {
  id: string;
  children: React.ReactNode;
}

export function EditableTextOverlay({ id, children }: EditableTextOverlayProps) {
  const { state, updateText } = useLiveEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const text = state.texts[id];
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  if (!text) return <>{children}</>;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(text.value);
    setIsEditing(true);
  };

  const handleDone = () => {
    updateText(id, tempValue);
    setIsEditing(false);
  };

  const handleEscape = () => {
    setTempValue(text.value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && text.type !== 'paragraph' && text.type !== 'subheading') {
      handleDone();
    }
    if (e.key === 'Escape') {
      handleEscape();
    }
  };

  const isMultiLine = text.type === 'paragraph' || text.type === 'subheading';

  return (
    <div
      className="group relative cursor-pointer"
      style={{ display: 'inline' }}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <div
          className="absolute inset-0 z-50 flex flex-col gap-2 p-1 bg-white shadow-lg rounded border border-blue-500"
          onClick={(e) => e.stopPropagation()}
        >
          {isMultiLine ? (
            <Textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-black w-full h-32"
            />
          ) : (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-black"
            />
          )}
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={handleEscape}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleDone}>
              <Check className="h-4 w-4 mr-1" />
              Done
            </Button>
          </div>
        </div>
      ) : (
        <>
          {children}
          <div className="absolute inset-0 ring-2 ring-blue-500 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded" />
        </>
      )}
    </div>
  );
}

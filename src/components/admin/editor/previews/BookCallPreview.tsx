import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function BookCallPreview() {
  const { state, getTextStyle } = useLiveEditor();

  const bookCallSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'book-call' } => section.page === 'book-call')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {bookCallSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="book-call"
        >
          {!section.visible ? (
            <div className="flex items-center justify-center py-20 text-[#A09880]">
              Hidden Section: {section.label} (click to show)
            </div>
          ) : (
            <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-20">
              <EditableTextOverlay id="book-call-heading">
                <h1
                  style={{
                    ...getTextStyle('book-call-heading'),
                    fontFamily: 'Palatino Linotype, serif',
                  }}
                  className="text-5xl"
                >
                  {state.texts['book-call-heading']?.value || 'Book a Call'}
                </h1>
              </EditableTextOverlay>
              <EditableTextOverlay id="book-call-intro">
                <p
                  style={getTextStyle('book-call-intro')}
                  className="mt-6 text-[#A09880] leading-8"
                >
                  {state.texts['book-call-intro']?.value || 'Schedule your free discovery call.'}
                </p>
              </EditableTextOverlay>
            </div>
          )}
        </EditableSectionOverlay>
      ))}

      <PreviewFooter />
    </div>
  );
}
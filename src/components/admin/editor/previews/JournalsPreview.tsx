import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function JournalsPreview() {
  const { state, getTextStyle } = useLiveEditor();

  const journalsSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'journals' } => section.page === 'journals')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {journalsSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="journals"
        >
          {!section.visible ? (
            <div className="flex items-center justify-center py-20 text-[#A09880]">
              Hidden Section: {section.label} (click to show)
            </div>
          ) : (
            <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-20">
              <EditableTextOverlay id="journals-heading">
                <h1
                  style={{
                    ...getTextStyle('journals-heading'),
                    fontFamily: 'Palatino Linotype, serif',
                  }}
                  className="text-5xl"
                >
                  {state.texts['journals-heading']?.value || 'Journals'}
                </h1>
              </EditableTextOverlay>
              <EditableTextOverlay id="journals-intro">
                <p
                  style={getTextStyle('journals-intro')}
                  className="mt-6 text-[#A09880] leading-8"
                >
                  {state.texts['journals-intro']?.value || 'Explore our journals for self-reflection.'}
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
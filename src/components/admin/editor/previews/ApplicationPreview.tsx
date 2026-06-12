import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function ApplicationPreview() {
  const { state, getTextStyle } = useLiveEditor();

  const applicationSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'apply' } => section.page === 'apply')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {applicationSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="apply"
        >
          {!section.visible ? (
            <div className="flex items-center justify-center py-20 text-[#A09880]">
              Hidden Section: {section.label} (click to show)
            </div>
          ) : (
            <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-20">
              <EditableTextOverlay id="application-heading">
                <h1
                  style={{
                    ...getTextStyle('application-heading'),
                    fontFamily: 'Palatino Linotype, serif',
                  }}
                  className="text-5xl"
                >
                  {state.texts['application-heading']?.value || 'Apply'}
                </h1>
              </EditableTextOverlay>
              <EditableTextOverlay id="application-intro">
                <p
                  style={getTextStyle('application-intro')}
                  className="mt-6 text-[#A09880] leading-8"
                >
                  {state.texts['application-intro']?.value || 'Apply for our programs.'}
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
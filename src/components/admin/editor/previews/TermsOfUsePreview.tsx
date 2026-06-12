import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function TermsOfUsePreview() {
  const { state, getTextStyle } = useLiveEditor();

  const termsOfUseSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'terms-of-use' } => section.page === 'terms-of-use')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {termsOfUseSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="terms-of-use"
        >
          {!section.visible ? (
            <div className="flex items-center justify-center py-20 text-[#A09880]">
              Hidden Section: {section.label} (click to show)
            </div>
          ) : (
            <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-20">
              <EditableTextOverlay id="terms-of-use-heading">
                <h1
                  style={{
                    ...getTextStyle('terms-of-use-heading'),
                    fontFamily: 'Palatino Linotype, serif',
                  }}
                  className="text-5xl"
                >
                  {state.texts['terms-of-use-heading']?.value || 'Terms of Use'}
                </h1>
              </EditableTextOverlay>
              <EditableTextOverlay id="terms-of-use-intro">
                <p
                  style={getTextStyle('terms-of-use-intro')}
                  className="mt-6 text-[#A09880] leading-8"
                >
                  {state.texts['terms-of-use-intro']?.value || 'Read our terms of use.'}
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
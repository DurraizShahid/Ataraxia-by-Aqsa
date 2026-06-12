import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function AboutPreview() {
  const { state, getTextStyle } = useLiveEditor();

  const aboutSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'about' } => section.page === 'about')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {aboutSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="about"
        >
          {!section.visible ? (
            <div className="flex items-center justify-center py-20 text-[#A09880]">
              Hidden Section: {section.label} (click to show)
            </div>
          ) : (
            <SectionContent sectionId={section.id} />
          )}
        </EditableSectionOverlay>
      ))}

      <PreviewFooter />
    </div>
  );
}

function SectionContent({ sectionId }: { sectionId: string }) {
  const { state, getTextStyle } = useLiveEditor();

  switch (sectionId) {
    case 'about-intro':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
          <EditableTextOverlay id="about-heading">
            <h1
              style={{
                ...getTextStyle('about-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-5xl"
            >
              {state.texts['about-heading'].value}
            </h1>
          </EditableTextOverlay>
          <EditableTextOverlay id="about-intro-text">
            <p
              style={getTextStyle('about-intro-text')}
              className="italic text-[#A09880] mt-8 leading-8"
              dangerouslySetInnerHTML={{
                __html: state.texts['about-intro-text'].value.replace(/\n/g, '<br /><br />'),
              }}
            />
          </EditableTextOverlay>
          <div className="relative rounded-xl overflow-hidden my-12">
            <EditableImageOverlay id="about-journey-path">
              <img
                src={state.images['about-journey-path'].src}
                alt={state.images['about-journey-path'].alt}
                className="w-full"
              />
            </EditableImageOverlay>
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <hr className="border-[#B8962E] opacity-40" />
        </section>
      );

    case 'about-origin':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
          <EditableTextOverlay id="about-origin-section-label">
            <p
              style={getTextStyle('about-origin-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['about-origin-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="about-origin-heading">
            <h2
              style={{
                ...getTextStyle('about-origin-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['about-origin-heading'].value}
            </h2>
          </EditableTextOverlay>
          <EditableTextOverlay id="about-origin-text-1">
            <p
              style={getTextStyle('about-origin-text-1')}
              className="mt-6 text-[#A09880] leading-8 whitespace-pre-line"
            >
              {state.texts['about-origin-text-1'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="about-origin-text-2">
            <p
              style={getTextStyle('about-origin-text-2')}
              className="text-xl font-semibold mt-6"
            >
              {state.texts['about-origin-text-2'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="about-origin-text-3">
            <p
              style={getTextStyle('about-origin-text-3')}
              className="mt-6 text-[#A09880] leading-8 whitespace-pre-line"
            >
              {state.texts['about-origin-text-3'].value}
            </p>
          </EditableTextOverlay>
          <div className="mt-8 border-l-2 border-[#B8962E] pl-8">
            <EditableTextOverlay id="about-pullquote">
              <p
                style={getTextStyle('about-pullquote')}
                className="text-2xl italic text-[#F5F0E8]"
              >
                "{state.texts['about-pullquote'].value}"
              </p>
            </EditableTextOverlay>
            <EditableTextOverlay id="about-pullquote-author">
              <p style={getTextStyle('about-pullquote-author')} className="text-[#A09880] mt-2">
                — {state.texts['about-pullquote-author'].value}
              </p>
            </EditableTextOverlay>
          </div>
          <EditableTextOverlay id="about-origin-text-4">
            <p
              style={getTextStyle('about-origin-text-4')}
              className="text-[#A09880] leading-8 mt-8 whitespace-pre-line"
            >
              {state.texts['about-origin-text-4'].value}
            </p>
          </EditableTextOverlay>
          <EditableImageOverlay id="about-group-session">
            <img
              src={state.images['about-group-session'].src}
              alt={state.images['about-group-session'].alt}
              className="w-full rounded-xl my-14 object-cover"
            />
          </EditableImageOverlay>
          <hr className="border-[#B8962E] opacity-40" />
        </section>
      );

    case 'about-credentials':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 pb-16">
          <EditableTextOverlay id="about-credentials-section-label">
            <p
              style={getTextStyle('about-credentials-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['about-credentials-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="about-credentials-heading">
            <h2
              style={{
                ...getTextStyle('about-credentials-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['about-credentials-heading'].value}
            </h2>
          </EditableTextOverlay>
          <div className="space-y-3 mt-8">
            {['about-credential-1', 'about-credential-2', 'about-credential-3', 'about-credential-4', 'about-credential-5'].map((id) => (
              <EditableTextOverlay key={id} id={id}>
                <p style={getTextStyle(id)} className="text-[#F5F0E8]">
                  {state.texts[id].value}
                </p>
              </EditableTextOverlay>
            ))}
          </div>
          <div className="mt-8 flex gap-3 flex-wrap">
            {['about-cta-1', 'about-cta-2'].map((id) => (
              <EditableTextOverlay key={id} id={id}>
                <button
                  style={getTextStyle(id)}
                  className="px-6 py-3 border border-[#B8962E] text-[#B8962E] hover:bg-[#B8962E] hover:text-[#0A0A0A] transition-colors uppercase tracking-widest text-sm"
                >
                  {state.texts[id].value}
                </button>
              </EditableTextOverlay>
            ))}
          </div>
        </section>
      );

    default:
      return null;
  }
}

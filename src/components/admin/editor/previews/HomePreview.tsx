import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function HomePreview() {
  const { state, getTextStyle } = useLiveEditor();

  // Get sorted sections for home page
  const homeSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'home' } => section.page === 'home')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {homeSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="home"
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
    case 'home-hero':
      return (
        <section className="relative min-h-screen flex items-center">
          <EditableImageOverlay id="home-hero-bg">
            <img
              src={state.images['home-hero-bg'].src}
              alt={state.images['home-hero-bg'].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </EditableImageOverlay>
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-28">
            <EditableTextOverlay id="home-hero-section-label">
              <p
                style={getTextStyle('home-hero-section-label')}
                className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
              >
                {state.texts['home-hero-section-label'].value}
              </p>
            </EditableTextOverlay>
            <EditableTextOverlay id="home-hero-headline-1">
              <h1
                style={{
                  ...getTextStyle('home-hero-headline-1'),
                  fontFamily: 'Palatino Linotype, serif',
                }}
                className="text-5xl md:text-7xl leading-[1.2]"
              >
                {state.texts['home-hero-headline-1'].value}
                <br />
                {state.texts['home-hero-headline-2'].value}
              </h1>
            </EditableTextOverlay>
            <EditableTextOverlay id="home-hero-subtitle">
              <p
                style={{
                  ...getTextStyle('home-hero-subtitle'),
                  color: '#B8962E',
                }}
                className="mt-6 italic text-xl"
              >
                {state.texts['home-hero-subtitle'].value}
              </p>
            </EditableTextOverlay>
            <EditableTextOverlay id="home-hero-description">
              <p
                style={getTextStyle('home-hero-description')}
                className="mt-8 text-[#A09880] max-w-3xl leading-8"
                dangerouslySetInnerHTML={{
                  __html: state.texts['home-hero-description'].value.replace(/\n/g, '<br /><br />'),
                }}
              />
            </EditableTextOverlay>
            <div className="mt-8 flex flex-wrap gap-3">
              {['home-hero-cta-1', 'home-hero-cta-2', 'home-hero-cta-3'].map((id) => (
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
          </div>
        </section>
      );

    case 'home-4x-framework':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-20">
          <EditableTextOverlay id="home-4x-section-label">
            <p
              style={getTextStyle('home-4x-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['home-4x-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="home-4x-heading">
            <h2
              style={{
                ...getTextStyle('home-4x-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['home-4x-heading'].value}
            </h2>
          </EditableTextOverlay>
          {/* 4X Flow Bar placeholder */}
          <div className="mt-8 flex items-center justify-center gap-4 text-[#A09880]">
            <span className="text-[#B8962E]">EXPLORE</span>
            <span className="text-[#B8962E]">→</span>
            <span className="text-[#B8962E]">UNDERSTAND</span>
            <span className="text-[#B8962E]">→</span>
            <span className="text-[#B8962E]">EVOLVE</span>
            <span className="text-[#B8962E]">→</span>
            <span className="text-[#B8962E]">EXCEL</span>
          </div>
          <EditableImageOverlay id="home-4x-framework">
            <img
              src={state.images['home-4x-framework'].src}
              alt={state.images['home-4x-framework'].alt}
              className="mx-auto max-w-2xl w-full mt-12 opacity-90"
            />
          </EditableImageOverlay>
          <EditableTextOverlay id="home-4x-description">
            <p
              style={getTextStyle('home-4x-description')}
              className="mt-8 text-[#A09880] leading-8"
            >
              {state.texts['home-4x-description'].value}
            </p>
          </EditableTextOverlay>
          <hr className="border-[#B8962E] opacity-40 mt-8" />
        </section>
      );

    case 'home-why-stuck':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
          <EditableTextOverlay id="home-stuck-section-label">
            <p
              style={getTextStyle('home-stuck-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['home-stuck-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="home-stuck-heading">
            <h2
              style={{
                ...getTextStyle('home-stuck-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['home-stuck-heading'].value}
            </h2>
          </EditableTextOverlay>
          <EditableTextOverlay id="home-stuck-description">
            <p
              style={getTextStyle('home-stuck-description')}
              className="mt-6 text-[#A09880] leading-8"
              dangerouslySetInnerHTML={{
                __html: state.texts['home-stuck-description'].value.replace(/\n/g, '<br /><br />'),
              }}
            />
          </EditableTextOverlay>
          <div className="mt-8 border-l-2 border-[#B8962E] pl-8">
            <EditableTextOverlay id="home-stuck-pullquote">
              <p
                style={getTextStyle('home-stuck-pullquote')}
                className="text-2xl italic text-[#F5F0E8]"
              >
                "{state.texts['home-stuck-pullquote'].value}"
              </p>
            </EditableTextOverlay>
            <EditableTextOverlay id="home-stuck-pullquote-author">
              <p style={getTextStyle('home-stuck-pullquote-author')} className="text-[#A09880] mt-2">
                — {state.texts['home-stuck-pullquote-author'].value}
              </p>
            </EditableTextOverlay>
          </div>
          <EditableTextOverlay id="home-stuck-description-2">
            <p
              style={getTextStyle('home-stuck-description-2')}
              className="text-[#A09880] leading-8 mt-8"
            >
              {state.texts['home-stuck-description-2'].value}
            </p>
          </EditableTextOverlay>
          <EditableImageOverlay id="home-layers-depth">
            <img
              src={state.images['home-layers-depth'].src}
              alt={state.images['home-layers-depth'].alt}
              className="w-full rounded-xl border border-[#B8962E]/30 mt-10"
            />
          </EditableImageOverlay>
          <hr className="border-[#B8962E] opacity-40 mt-8" />
        </section>
      );

    case 'home-cta':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 pb-20">
          <EditableTextOverlay id="home-cta-section-label">
            <p
              style={getTextStyle('home-cta-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['home-cta-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="home-cta-heading">
            <h2
              style={{
                ...getTextStyle('home-cta-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['home-cta-heading'].value}
            </h2>
          </EditableTextOverlay>
          <EditableTextOverlay id="home-cta-description">
            <p
              style={getTextStyle('home-cta-description')}
              className="mt-6 text-[#A09880] leading-8"
              dangerouslySetInnerHTML={{
                __html: state.texts['home-cta-description'].value.replace(/\n/g, '<br /><br />'),
              }}
            />
          </EditableTextOverlay>
          <div className="mt-8 flex flex-wrap gap-3">
            {['home-cta-button-1', 'home-cta-button-2', 'home-cta-button-3'].map((id) => (
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

import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function ServicesPreview() {
  const { state, getTextStyle } = useLiveEditor();

  const servicesSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'services' } => section.page === 'services')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {servicesSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="services"
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
    case 'services-intro':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
          <EditableTextOverlay id="services-heading">
            <h1
              style={{
                ...getTextStyle('services-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-5xl"
            >
              {state.texts['services-heading'].value}
            </h1>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-intro-text">
            <p
              style={getTextStyle('services-intro-text')}
              className="text-[#A09880] mt-6 leading-8"
            >
              {state.texts['services-intro-text'].value}
            </p>
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
          <EditableImageOverlay id="services-triad-integration">
            <img
              src={state.images['services-triad-integration'].src}
              alt={state.images['services-triad-integration'].alt}
              className="mx-auto max-w-2xl w-full mt-12 mb-4"
            />
          </EditableImageOverlay>
          <hr className="border-[#B8962E] opacity-40" />
        </section>
      );

    case 'services-service1':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
          <EditableTextOverlay id="services-service1-section-label">
            <p
              style={getTextStyle('services-service1-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['services-service1-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-heading">
            <h2
              style={{
                ...getTextStyle('services-service1-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['services-service1-heading'].value}
            </h2>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-subtitle">
            <p
              style={{
                ...getTextStyle('services-service1-subtitle'),
                color: '#B8962E',
              }}
              className="italic mt-3"
            >
              {state.texts['services-service1-subtitle'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-text-1">
            <p
              style={getTextStyle('services-service1-text-1')}
              className="text-[#A09880] mt-4"
            >
              {state.texts['services-service1-text-1'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-day1">
            <p
              style={getTextStyle('services-service1-day1')}
              className="mt-4 text-[#A09880]"
            >
              {state.texts['services-service1-day1'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-day2">
            <p
              style={getTextStyle('services-service1-day2')}
              className="mt-3 text-[#A09880]"
            >
              {state.texts['services-service1-day2'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-day3">
            <p
              style={getTextStyle('services-service1-day3')}
              className="mt-3 text-[#A09880]"
            >
              {state.texts['services-service1-day3'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-text-2">
            <p
              style={getTextStyle('services-service1-text-2')}
              className="mt-4"
            >
              {state.texts['services-service1-text-2'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service1-tiers">
            <p
              style={getTextStyle('services-service1-tiers')}
              className="text-[#A09880] mt-2 whitespace-pre-line"
            >
              {state.texts['services-service1-tiers'].value}
            </p>
          </EditableTextOverlay>
          <div className="mt-5">
            <EditableTextOverlay id="services-service1-cta">
              <button
                style={getTextStyle('services-service1-cta')}
                className="px-6 py-3 border border-[#B8962E] text-[#B8962E] hover:bg-[#B8962E] hover:text-[#0A0A0A] transition-colors uppercase tracking-widest text-sm"
              >
                {state.texts['services-service1-cta'].value}
              </button>
            </EditableTextOverlay>
          </div>
          <EditableImageOverlay id="services-5-modalities">
            <img
              src={state.images['services-5-modalities'].src}
              alt={state.images['services-5-modalities'].alt}
              className="w-full rounded-xl mt-12"
            />
          </EditableImageOverlay>
          <hr className="border-[#B8962E] opacity-40 mt-8" />
        </section>
      );

    case 'services-service2':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
          <EditableTextOverlay id="services-service2-section-label">
            <p
              style={getTextStyle('services-service2-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['services-service2-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service2-heading">
            <h2
              style={{
                ...getTextStyle('services-service2-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['services-service2-heading'].value}
            </h2>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service2-text-1">
            <p
              style={getTextStyle('services-service2-text-1')}
              className="text-[#A09880] mt-4"
            >
              {state.texts['services-service2-text-1'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service2-bullets">
            <p
              style={getTextStyle('services-service2-bullets')}
              className="text-[#A09880] mt-3 whitespace-pre-line"
            >
              {state.texts['services-service2-bullets'].value}
            </p>
          </EditableTextOverlay>
          <div className="mt-5">
            <EditableTextOverlay id="services-service2-cta">
              <button
                style={getTextStyle('services-service2-cta')}
                className="px-6 py-3 border border-[#B8962E] text-[#B8962E] hover:bg-[#B8962E] hover:text-[#0A0A0A] transition-colors uppercase tracking-widest text-sm"
              >
                {state.texts['services-service2-cta'].value}
              </button>
            </EditableTextOverlay>
          </div>
          <hr className="border-[#B8962E] opacity-40 mt-8" />
        </section>
      );

    case 'services-service3':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
          <EditableTextOverlay id="services-service3-section-label">
            <p
              style={getTextStyle('services-service3-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['services-service3-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service3-heading">
            <h2
              style={{
                ...getTextStyle('services-service3-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['services-service3-heading'].value}
            </h2>
          </EditableTextOverlay>
          <div className="border border-[#D4AF37]/50 p-4 mt-4 text-[#D4AF37]">
            <EditableTextOverlay id="services-service3-badge">
              <p style={getTextStyle('services-service3-badge')}>
                {state.texts['services-service3-badge'].value}
              </p>
            </EditableTextOverlay>
          </div>
          <EditableTextOverlay id="services-service3-text-1">
            <p
              style={getTextStyle('services-service3-text-1')}
              className="text-[#A09880] mt-4 whitespace-pre-line"
            >
              {state.texts['services-service3-text-1'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service3-bullets">
            <p
              style={getTextStyle('services-service3-bullets')}
              className="text-[#A09880] mt-3 whitespace-pre-line"
            >
              {state.texts['services-service3-bullets'].value}
            </p>
          </EditableTextOverlay>
          <div className="mt-5">
            <EditableTextOverlay id="services-service3-cta">
              <button
                style={getTextStyle('services-service3-cta')}
                className="px-6 py-3 border border-[#B8962E] text-[#B8962E] hover:bg-[#B8962E] hover:text-[#0A0A0A] transition-colors uppercase tracking-widest text-sm"
              >
                {state.texts['services-service3-cta'].value}
              </button>
            </EditableTextOverlay>
          </div>
          <hr className="border-[#B8962E] opacity-40 mt-8" />
        </section>
      );

    case 'services-service4':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
          <EditableTextOverlay id="services-service4-section-label">
            <p
              style={getTextStyle('services-service4-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['services-service4-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service4-heading">
            <h2
              style={{
                ...getTextStyle('services-service4-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['services-service4-heading'].value}
            </h2>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service4-text-1">
            <p
              style={getTextStyle('services-service4-text-1')}
              className="mt-4 text-[#A09880]"
            >
              {state.texts['services-service4-text-1'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service4-bullets">
            <p
              style={getTextStyle('services-service4-bullets')}
              className="text-[#A09880] mt-3 whitespace-pre-line"
            >
              {state.texts['services-service4-bullets'].value}
            </p>
          </EditableTextOverlay>
          <div className="mt-5">
            <EditableTextOverlay id="services-service4-cta">
              <button
                style={getTextStyle('services-service4-cta')}
                className="px-6 py-3 border border-[#B8962E] text-[#B8962E] hover:bg-[#B8962E] hover:text-[#0A0A0A] transition-colors uppercase tracking-widest text-sm"
              >
                {state.texts['services-service4-cta'].value}
              </button>
            </EditableTextOverlay>
          </div>
          <EditableImageOverlay id="services-energy-frequency">
            <img
              src={state.images['services-energy-frequency'].src}
              alt={state.images['services-energy-frequency'].alt}
              className="w-full rounded-xl border border-[#D4AF37]/25 mt-10 mb-2"
            />
          </EditableImageOverlay>
          <hr className="border-[#B8962E] opacity-40 mt-8" />
        </section>
      );

    case 'services-service5':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 pb-16">
          <EditableTextOverlay id="services-service5-section-label">
            <p
              style={getTextStyle('services-service5-section-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['services-service5-section-label'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service5-heading">
            <h2
              style={{
                ...getTextStyle('services-service5-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-4xl"
            >
              {state.texts['services-service5-heading'].value}
            </h2>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service5-text-1">
            <p
              style={getTextStyle('services-service5-text-1')}
              className="text-[#A09880] mt-4"
            >
              {state.texts['services-service5-text-1'].value}
            </p>
          </EditableTextOverlay>
          <EditableTextOverlay id="services-service5-bullets">
            <p
              style={getTextStyle('services-service5-bullets')}
              className="text-[#A09880] mt-3 whitespace-pre-line"
            >
              {state.texts['services-service5-bullets'].value}
            </p>
          </EditableTextOverlay>
          <div className="mt-5">
            <EditableTextOverlay id="services-service5-cta">
              <button
                style={getTextStyle('services-service5-cta')}
                className="px-6 py-3 border border-[#B8962E] text-[#B8962E] hover:bg-[#B8962E] hover:text-[#0A0A0A] transition-colors uppercase tracking-widest text-sm"
              >
                {state.texts['services-service5-cta'].value}
              </button>
            </EditableTextOverlay>
          </div>
        </section>
      );

    default:
      return null;
  }
}

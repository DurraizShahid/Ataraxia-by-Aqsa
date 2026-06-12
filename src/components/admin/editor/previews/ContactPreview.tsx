import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableSectionOverlay } from '../EditableSectionOverlay';
import { PreviewNavbar, PreviewFooter } from './SharedComponents';

export function ContactPreview() {
  const { state, getTextStyle } = useLiveEditor();

  const contactSections = Object.values(state.sections)
    .filter((section): section is typeof section & { page: 'contact' } => section.page === 'contact')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <PreviewNavbar />

      {contactSections.map((section) => (
        <EditableSectionOverlay
          key={section.id}
          id={section.id}
          page="contact"
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
    case 'contact-intro':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
          <EditableTextOverlay id="contact-heading">
            <h1
              style={{
                ...getTextStyle('contact-heading'),
                fontFamily: 'Palatino Linotype, serif',
              }}
              className="text-5xl"
            >
              {state.texts['contact-heading'].value}
            </h1>
          </EditableTextOverlay>
          <EditableTextOverlay id="contact-intro-text">
            <p
              style={getTextStyle('contact-intro-text')}
              className="text-[#A09880] mt-6 leading-8"
              dangerouslySetInnerHTML={{
                __html: state.texts['contact-intro-text'].value.replace(/\n/g, '<br /><br />'),
              }}
            />
          </EditableTextOverlay>
          <hr className="border-[#D4AF37] opacity-40 my-16" />
        </section>
      );

    case 'contact-how-to-begin':
      return (
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 pb-16">
          <EditableTextOverlay id="contact-how-to-begin-label">
            <p
              style={getTextStyle('contact-how-to-begin-label')}
              className="uppercase tracking-widest text-[#A09880] text-sm mb-4"
            >
              {state.texts['contact-how-to-begin-label'].value}
            </p>
          </EditableTextOverlay>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="border border-[#D4AF37]/40 p-6 rounded-xl">
              <EditableTextOverlay id="contact-card1-number">
                <p
                  style={getTextStyle('contact-card1-number')}
                  className="text-[#D4AF37]"
                >
                  {state.texts['contact-card1-number'].value}
                </p>
              </EditableTextOverlay>
              <EditableTextOverlay id="contact-card1-title">
                <h3
                  style={getTextStyle('contact-card1-title')}
                  className="mt-3"
                >
                  {state.texts['contact-card1-title'].value}
                </h3>
              </EditableTextOverlay>
              <EditableTextOverlay id="contact-card1-text">
                <p
                  style={getTextStyle('contact-card1-text')}
                  className="text-[#A09880] mt-2"
                >
                  {state.texts['contact-card1-text'].value}
                </p>
              </EditableTextOverlay>
            </div>
            <div className="border border-[#D4AF37]/40 p-6 rounded-xl">
              <EditableTextOverlay id="contact-card2-number">
                <p
                  style={getTextStyle('contact-card2-number')}
                  className="text-[#D4AF37]"
                >
                  {state.texts['contact-card2-number'].value}
                </p>
              </EditableTextOverlay>
              <EditableTextOverlay id="contact-card2-title">
                <h3
                  style={getTextStyle('contact-card2-title')}
                  className="mt-3"
                >
                  {state.texts['contact-card2-title'].value}
                </h3>
              </EditableTextOverlay>
              <EditableTextOverlay id="contact-card2-text">
                <p
                  style={getTextStyle('contact-card2-text')}
                  className="text-[#A09880] mt-2"
                >
                  {state.texts['contact-card2-text'].value}
                </p>
              </EditableTextOverlay>
            </div>
            <div className="border border-[#D4AF37]/40 p-6 rounded-xl">
              <EditableTextOverlay id="contact-card3-number">
                <p
                  style={getTextStyle('contact-card3-number')}
                  className="text-[#D4AF37]"
                >
                  {state.texts['contact-card3-number'].value}
                </p>
              </EditableTextOverlay>
              <EditableTextOverlay id="contact-card3-title">
                <h3
                  style={getTextStyle('contact-card3-title')}
                  className="mt-3"
                >
                  {state.texts['contact-card3-title'].value}
                </h3>
              </EditableTextOverlay>
              <EditableTextOverlay id="contact-card3-text">
                <p
                  style={getTextStyle('contact-card3-text')}
                  className="text-[#A09880] mt-2"
                >
                  {state.texts['contact-card3-text'].value}
                </p>
              </EditableTextOverlay>
            </div>
          </div>
          <div className="mt-8 flex gap-3 flex-wrap">
            {['contact-cta-1', 'contact-cta-2'].map((id) => (
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
          <div className="text-[#A09880] text-sm mt-6 space-y-2">
            <EditableTextOverlay id="contact-footer-text-1">
              <p style={getTextStyle('contact-footer-text-1')}>
                {state.texts['contact-footer-text-1'].value}
              </p>
            </EditableTextOverlay>
            <p>
              <EditableTextOverlay id="contact-footer-text-2">
                <span style={getTextStyle('contact-footer-text-2')}>
                  {state.texts['contact-footer-text-2'].value}
                </span>
              </EditableTextOverlay>
              <EditableTextOverlay id="contact-email">
                <a
                  href={`mailto:${state.texts['contact-email'].value}`}
                  style={getTextStyle('contact-email')}
                  className="text-[#D4AF37] hover:underline"
                >
                  {state.texts['contact-email'].value}
                </a>
              </EditableTextOverlay>
            </p>
          </div>
        </section>
      );

    default:
      return null;
  }
}

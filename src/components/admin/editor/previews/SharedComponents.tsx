import React from 'react';
import { useLiveEditor } from '../../../../contexts/LiveEditorContext';
import { EditableTextOverlay } from '../EditableTextOverlay';
import { EditableImageOverlay } from '../EditableImageOverlay';

export function PreviewNavbar() {
  const { state, getTextStyle } = useLiveEditor();

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="relative flex items-center justify-between lg:justify-center py-5">
          {/* Desktop: left side CTA */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex">
            <EditableTextOverlay id="navbar-book-call">
              <span
                style={getTextStyle('navbar-book-call')}
                className="text-xs uppercase font-semibold tracking-widest flex items-center gap-2 text-[#B8962E] hover:text-[#F5F0E8] transition-colors"
              >
                {state.texts['navbar-book-call'].value}
                <span className="h-4 w-4 transition-transform group-hover:rotate-45">↗</span>
              </span>
            </EditableTextOverlay>
          </div>

          {/* Mobile: left side logo */}
          <div className="lg:hidden">
            <EditableImageOverlay id="navbar-logo">
              <img
                src={state.images['navbar-logo'].src}
                alt={state.images['navbar-logo'].alt}
                className="h-10 w-10 shrink-0"
                aria-hidden="true"
              />
            </EditableImageOverlay>
          </div>

          {/* Desktop: center nav + logo + nav */}
          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center space-x-8">
              {['home', 'about', 'services'].map((id) => (
                <EditableTextOverlay key={id} id={`navbar-${id}`}>
                  <span
                    style={getTextStyle(`navbar-${id}`)}
                    className="uppercase text-xs font-semibold tracking-widest transition-colors text-[#A09880] hover:text-[#F5F0E8]"
                  >
                    {state.texts[`navbar-${id}`].value}
                  </span>
                </EditableTextOverlay>
              ))}
            </nav>

            <EditableImageOverlay id="navbar-logo">
              <img
                src={state.images['navbar-logo'].src}
                alt={state.images['navbar-logo'].alt}
                className="h-12 w-12 shrink-0"
                aria-hidden="true"
              />
            </EditableImageOverlay>

            <nav className="flex items-center space-x-8">
              {['workshops', 'journals', 'blog', 'contact'].map((id) => (
                <EditableTextOverlay key={id} id={`navbar-${id}`}>
                  <span
                    style={getTextStyle(`navbar-${id}`)}
                    className="uppercase text-xs font-semibold tracking-widest transition-colors text-[#A09880] hover:text-[#F5F0E8]"
                  >
                    {state.texts[`navbar-${id}`].value}
                  </span>
                </EditableTextOverlay>
              ))}
            </nav>
          </div>

          {/* Mobile: right side menu placeholder */}
          <div className="lg:hidden">
            <span className="text-[#F5F0E8]">☰</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function PreviewFooter() {
  const { state, getTextStyle } = useLiveEditor();

  return (
    <footer className="bg-[#0A0A0A] mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
        <hr className="border-[#B8962E] opacity-40" />
        <div className="py-12 grid gap-8 md:grid-cols-3 text-[#A09880]">
          <div>
            <EditableTextOverlay id="footer-brand">
              <p
                style={{
                  ...getTextStyle('footer-brand'),
                  fontFamily: 'Palatino Linotype, serif',
                }}
                className="text-[#B8962E] tracking-[0.2em]"
              >
                {state.texts['footer-brand'].value.toUpperCase()}
              </p>
            </EditableTextOverlay>
            <EditableTextOverlay id="footer-tagline">
              <p style={getTextStyle('footer-tagline')} className="mt-2">
                {state.texts['footer-tagline'].value}
              </p>
            </EditableTextOverlay>
          </div>
          <div className="flex flex-wrap gap-3">
            {['home', 'about', 'services', 'workshops', 'journals', 'blog', 'contact'].map((id) => (
              <React.Fragment key={id}>
                <EditableTextOverlay id={`navbar-${id}`}>
                  <span style={getTextStyle(`navbar-${id}`)}>
                    {state.texts[`navbar-${id}`].value}
                  </span>
                </EditableTextOverlay>
                {id !== 'contact' && <span>·</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="md:text-right">
            <p>Instagram · WhatsApp</p>
            <EditableTextOverlay id="footer-copyright">
              <p style={getTextStyle('footer-copyright')} className="mt-2">
                {state.texts['footer-copyright'].value}
              </p>
            </EditableTextOverlay>
          </div>
        </div>
      </div>
    </footer>
  );
}

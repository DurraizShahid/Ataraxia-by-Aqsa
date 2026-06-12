import React from 'react';
import { HomePreview } from './previews/HomePreview';
import { AboutPreview } from './previews/AboutPreview';
import { ServicesPreview } from './previews/ServicesPreview';
import { ContactPreview } from './previews/ContactPreview';
import { WorkshopsPreview } from './previews/WorkshopsPreview';
import { JournalsPreview } from './previews/JournalsPreview';
import { BlogPreview } from './previews/BlogPreview';
import { BookCallPreview } from './previews/BookCallPreview';
import { ApplicationPreview } from './previews/ApplicationPreview';
import { PrivacyPolicyPreview } from './previews/PrivacyPolicyPreview';
import { TermsOfUsePreview } from './previews/TermsOfUsePreview';
import { IsolatedNavbarPreview } from './previews/IsolatedNavbarPreview';
import { IsolatedFooterPreview } from './previews/IsolatedFooterPreview';
import { EditorPage } from '../../../types/liveEditor';

interface PreviewRouterProps {
  currentPage: EditorPage;
}

export function PreviewRouter({ currentPage }: PreviewRouterProps) {
  switch (currentPage) {
    case 'home':
      return <HomePreview />;
    case 'about':
      return <AboutPreview />;
    case 'services':
      return <ServicesPreview />;
    case 'contact':
      return <ContactPreview />;
    case 'workshops':
      return <WorkshopsPreview />;
    case 'journals':
      return <JournalsPreview />;
    case 'blog':
      return <BlogPreview />;
    case 'book-call':
      return <BookCallPreview />;
    case 'apply':
      return <ApplicationPreview />;
    case 'privacy-policy':
      return <PrivacyPolicyPreview />;
    case 'terms-of-use':
      return <TermsOfUsePreview />;
    case 'navbar':
      return <IsolatedNavbarPreview />;
    case 'footer':
      return <IsolatedFooterPreview />;
    default:
      return <HomePreview />;
  }
}

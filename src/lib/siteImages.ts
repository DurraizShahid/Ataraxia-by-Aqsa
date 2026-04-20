// Site-wide image management system

export interface SiteImages {
  // Global
  logo: string;

  // Home — Hero
  home_hero_bg: string;
  // Home — Blog Preview carousel (4 posts)
  home_blog_1: string;
  home_blog_2: string;
  home_blog_3: string;
  home_blog_4: string;
  // Home — Emotional Healing CTA section
  home_cta_image: string;
  // Home — Instagram gallery (8 images)
  home_instagram_1: string;
  home_instagram_2: string;
  home_instagram_3: string;
  home_instagram_4: string;
  home_instagram_5: string;
  home_instagram_6: string;
  home_instagram_7: string;
  home_instagram_8: string;
  // Home — Testimonial section
  home_testimonial_image: string;

  // Hero Carousel (Home page — separate from static hero)
  hero_slide_1: string;
  hero_slide_2: string;
  hero_slide_3: string;

  // Services page
  service_coaching: string;
  service_timeline_therapy: string;
  service_hypnotherapy: string;
  service_journaling: string;
  service_group_healing: string;
  service_corporate: string;

  // About page — Certifications
  cert_nlp_coach: string;
  cert_timeline_therapy: string;
  cert_hypnotist: string;
  cert_nlp_practitioner: string;

  // About page — Testimonials (14 images)
  testimonial_1: string;
  testimonial_2: string;
  testimonial_3: string;
  testimonial_4: string;
  testimonial_5: string;
  testimonial_6: string;
  testimonial_7: string;
  testimonial_8: string;
  testimonial_9: string;
  testimonial_10: string;
  testimonial_11: string;
  testimonial_12: string;
  testimonial_13: string;
  testimonial_14: string;
}

export interface ImageDefinition {
  key: keyof SiteImages;
  label: string;
  description: string;
  page: string;
}

export const IMAGE_DEFINITIONS: ImageDefinition[] = [
  // Global
  { key: 'logo', label: 'Site Logo', description: 'Logo in header and footer', page: 'Global' },

  // Home
  { key: 'home_hero_bg', label: 'Hero Background', description: 'Full-width hero background on the home page', page: 'Home' },
  { key: 'home_blog_1', label: 'Blog Preview 1', description: 'First post image in the Blog Preview carousel', page: 'Home' },
  { key: 'home_blog_2', label: 'Blog Preview 2', description: 'Second post image in the Blog Preview carousel', page: 'Home' },
  { key: 'home_blog_3', label: 'Blog Preview 3', description: 'Third post image in the Blog Preview carousel', page: 'Home' },
  { key: 'home_blog_4', label: 'Blog Preview 4', description: 'Fourth post image in the Blog Preview carousel', page: 'Home' },
  { key: 'home_cta_image', label: 'Emotional Healing Image', description: 'Image beside the Emotional Healing CTA section', page: 'Home' },
  { key: 'home_instagram_1', label: 'Instagram Image 1', description: 'First image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_instagram_2', label: 'Instagram Image 2', description: 'Second image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_instagram_3', label: 'Instagram Image 3', description: 'Third image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_instagram_4', label: 'Instagram Image 4', description: 'Fourth image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_instagram_5', label: 'Instagram Image 5', description: 'Fifth image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_instagram_6', label: 'Instagram Image 6', description: 'Sixth image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_instagram_7', label: 'Instagram Image 7', description: 'Seventh image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_instagram_8', label: 'Instagram Image 8', description: 'Eighth image in the Instagram gallery strip', page: 'Home' },
  { key: 'home_testimonial_image', label: 'Testimonial Photo', description: 'Photo beside the featured testimonial quote', page: 'Home' },

  // Hero Carousel (home page separate carousel component)
  { key: 'hero_slide_1', label: 'Hero Slide 1', description: 'First background in the homepage hero carousel', page: 'Hero Carousel' },
  { key: 'hero_slide_2', label: 'Hero Slide 2', description: 'Second background in the homepage hero carousel', page: 'Hero Carousel' },
  { key: 'hero_slide_3', label: 'Hero Slide 3', description: 'Third background in the homepage hero carousel', page: 'Hero Carousel' },

  // Services
  { key: 'service_coaching', label: '1:1 Coaching Image', description: '1:1 Breakthrough Coaching Sessions section', page: 'Services' },
  { key: 'service_timeline_therapy', label: 'Time Line Therapy Image', description: 'Time Line Therapy™ Sessions section', page: 'Services' },
  { key: 'service_hypnotherapy', label: 'Hypnotherapy Image', description: 'Hypnotherapy section', page: 'Services' },
  { key: 'service_journaling', label: 'Journaling Image', description: 'Journaling & Creative Therapy section', page: 'Services' },
  { key: 'service_group_healing', label: 'Group Healing Image', description: 'Group Healing Circles section', page: 'Services' },
  { key: 'service_corporate', label: 'Corporate Training Image', description: 'Corporate Trainings & Wellness Workshops section', page: 'Services' },

  // About — Certifications
  { key: 'cert_nlp_coach', label: 'NLP Coach Certificate', description: 'Certified NLP Coach — ABNLP', page: 'About' },
  { key: 'cert_timeline_therapy', label: 'Time Line Therapy Certificate', description: 'Certified Practitioner of Time Line Therapy™ — TLTA', page: 'About' },
  { key: 'cert_hypnotist', label: 'Hypnotist Certificate', description: 'Certified Hypnotist — ABH', page: 'About' },
  { key: 'cert_nlp_practitioner', label: 'NLP Practitioner Certificate', description: 'Certified NLP Practitioner — ABNLP', page: 'About' },

  // About — Testimonials
  { key: 'testimonial_1', label: 'Testimonial 1', description: 'Client testimonial screenshot 1', page: 'Testimonials' },
  { key: 'testimonial_2', label: 'Testimonial 2', description: 'Client testimonial screenshot 2', page: 'Testimonials' },
  { key: 'testimonial_3', label: 'Testimonial 3', description: 'Client testimonial screenshot 3', page: 'Testimonials' },
  { key: 'testimonial_4', label: 'Testimonial 4', description: 'Client testimonial screenshot 4', page: 'Testimonials' },
  { key: 'testimonial_5', label: 'Testimonial 5', description: 'Client testimonial screenshot 5', page: 'Testimonials' },
  { key: 'testimonial_6', label: 'Testimonial 6', description: 'Client testimonial screenshot 6', page: 'Testimonials' },
  { key: 'testimonial_7', label: 'Testimonial 7', description: 'Client testimonial screenshot 7', page: 'Testimonials' },
  { key: 'testimonial_8', label: 'Testimonial 8', description: 'Client testimonial screenshot 8', page: 'Testimonials' },
  { key: 'testimonial_9', label: 'Testimonial 9', description: 'Client testimonial screenshot 9', page: 'Testimonials' },
  { key: 'testimonial_10', label: 'Testimonial 10', description: 'Client testimonial screenshot 10', page: 'Testimonials' },
  { key: 'testimonial_11', label: 'Testimonial 11', description: 'Client testimonial screenshot 11', page: 'Testimonials' },
  { key: 'testimonial_12', label: 'Testimonial 12', description: 'Client testimonial screenshot 12', page: 'Testimonials' },
  { key: 'testimonial_13', label: 'Testimonial 13', description: 'Client testimonial screenshot 13', page: 'Testimonials' },
  { key: 'testimonial_14', label: 'Testimonial 14', description: 'Client testimonial screenshot 14', page: 'Testimonials' },
];

export const defaultImages: SiteImages = {
  // Global
  logo: '/logo-black.svg',

  // Home
  home_hero_bg: 'https://images.pexels.com/photos/7929183/pexels-photo-7929183.jpeg',
  home_blog_1: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600',
  home_blog_2: 'https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=600',
  home_blog_3: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
  home_blog_4: 'https://images.pexels.com/photos/5379710/pexels-photo-5379710.jpeg?auto=compress&cs=tinysrgb&w=600',
  home_cta_image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  home_instagram_1: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_instagram_2: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_instagram_3: 'https://images.pexels.com/photos/4100670/pexels-photo-4100670.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_instagram_4: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_instagram_5: 'https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_instagram_6: 'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_instagram_7: 'https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_instagram_8: 'https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=400',
  home_testimonial_image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

  // Hero Carousel
  hero_slide_1: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  hero_slide_2: 'https://images.pexels.com/photos/3828944/pexels-photo-3828944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  hero_slide_3: 'https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

  // Services
  service_coaching: 'https://images.pexels.com/photos/3828944/pexels-photo-3828944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  service_timeline_therapy: 'https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  service_hypnotherapy: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  service_journaling: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  service_group_healing: 'https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  service_corporate: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

  // About — Certifications
  cert_nlp_coach: '/licenses/1718532377396.jpeg',
  cert_timeline_therapy: '/licenses/1718532382606.jpeg',
  cert_hypnotist: '/licenses/1718532384357.jpeg',
  cert_nlp_practitioner: '/licenses/1718532384558.jpeg',

  // About — Testimonials
  testimonial_1: '/Testimonials/Screenshot_20250722_184616.jpg',
  testimonial_2: '/Testimonials/Screenshot_20250722_184638.jpg',
  testimonial_3: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.39_24b1bd62.jpg',
  testimonial_4: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.44_065ee4be.jpg',
  testimonial_5: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.44_ba738e5e.jpg',
  testimonial_6: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.45_449b0557.jpg',
  testimonial_7: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.45_a41cbb04.jpg',
  testimonial_8: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.46_ca80f888.jpg',
  testimonial_9: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.51_71017b0d.jpg',
  testimonial_10: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.51_a0357313.jpg',
  testimonial_11: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.52_8a4f9e34.jpg',
  testimonial_12: '/Testimonials/WhatsApp Image 2025-07-17 at 17.05.52_f9806664.jpg',
  testimonial_13: '/Testimonials/WhatsApp Image 2025-07-17 at 17.06.02_dadf000a.jpg',
  testimonial_14: '/Testimonials/WhatsApp Image 2025-07-17 at 17.06.03_1d8843b7.jpg',
};

const STORAGE_KEY = 'ataraxia_site_images';

export const getSiteImages = (): SiteImages => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultImages, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error reading site images:', error);
  }
  return defaultImages;
};

export const saveSiteImagesLocally = (images: SiteImages): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Error saving site images to localStorage:', error);
  }
};

export const resetSiteImagesLocally = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
  } catch (error) {
    console.error('Error resetting site images:', error);
  }
};

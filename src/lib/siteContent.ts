// Site-wide content management system

export interface SiteContent {
  // Home Page
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    services: {
      title: string;
      subtitle: string;
    };
    transformation: {
      title: string;
      subtitle: string;
    };
  };
  
  // About Page
  about: {
    hero: {
      title: string;
      subtitle: string;
    };
    mission: {
      title: string;
      description: string;
    };
    approach: {
      title: string;
      description: string;
    };
  };
  
  // Services Page
  services: {
    hero: {
      title: string;
      subtitle: string;
    };
    description: string;
  };
  
  // Courses Page
  courses: {
    hero: {
      title: string;
      subtitle: string;
    };
    emptyState: string;
  };
  
  // Journals Page
  journals: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    individualTitle: string;
    bundleTitle: string;
    footer: {
      instantDownload: string;
      personalSupport: string;
      builtWithIntention: string;
      closingText: string;
      ctaText: string;
    };
  };
  
  // Blog Page
  blog: {
    hero: {
      title: string;
    };
    emptyState: string;
  };
  
  // Cart Page
  cart: {
    title: string;
    emptyState: string;
    continueButton: string;
    clearButton: string;
    summaryTitle: string;
    totalLabel: string;
    checkoutButton: string;
    checkoutNote: string;
  };
  
  // Checkout Page
  checkout: {
    title: string;
    contactSection: string;
    paymentSection: string;
    paymentNote: string;
    orderSummary: string;
    totalLabel: string;
    demoNote: string;
    successTitle: string;
    successSubtitle: string;
    successMessage: string;
    nameLabel: string;
    emailLabel: string;
    cardNumberLabel: string;
    expiryLabel: string;
    cvvLabel: string;
    payButton: string;
    processingButton: string;
  };
  
  // Contact/Book Call Page
  contact: {
    title: string;
    subtitle: string;
    description: string;
  };
  
  // Footer
  footer: {
    tagline: string;
    copyright: string;
    quickLinks: string;
    followUs: string;
  };
  
  // Common
  common: {
    readMore: string;
    viewDetails: string;
    addToCart: string;
    backTo: string;
    publishedOn: string;
    by: string;
    save: string;
    loading: string;
    error: string;
  };
}

const STORAGE_KEY = 'ataraxia_site_content';

const defaultContent: SiteContent = {
  home: {
    hero: {
      title: "Find Peace. Heal Deeply. Transform Your Life.",
      subtitle: "Evidence-based healing for your mind, heart, and soul",
      cta: "Start Your Journey"
    },
    services: {
      title: "How I Can Support You",
      subtitle: "Personalized healing modalities designed for deep transformation"
    },
    transformation: {
      title: "Your Transformation Starts Here",
      subtitle: "Explore resources, courses, and journals created with intention"
    }
  },
  
  about: {
    hero: {
      title: "About Ataraxia by Aqsa",
      subtitle: "Your guide to inner peace and transformation"
    },
    mission: {
      title: "My Mission",
      description: "I believe healing is possible for everyone. My mission is to provide accessible, evidence-based tools for deep emotional healing and personal transformation."
    },
    approach: {
      title: "My Approach",
      description: "I combine psychology, NLP, hypnosis, and spiritual practices to create comprehensive healing programs that address the root causes of pain and suffering."
    }
  },
  
  services: {
    hero: {
      title: "Services & Support",
      subtitle: "Choose the path that resonates with you"
    },
    description: "From one-on-one coaching to self-paced courses, I offer various ways to support your healing journey."
  },
  
  courses: {
    hero: {
      title: "Our Courses",
      subtitle: "Transform your life with our comprehensive, heart-centered courses designed for deep healing and personal growth."
    },
    emptyState: "No courses available yet. Check back soon!"
  },
  
  journals: {
    hero: {
      title: "Healing Journals",
      subtitle: "Designed with Intention. Backed by Psychology. Guided by Heart.",
      description: "Each journal in this collection was painstakingly crafted over months — with real emotional labor, tested techniques, and a deep desire to create a safe space for your healing and transformation. They're not just pages — they're your private coaching tools, integrating NLP, Hypnosis, Emotional Processing, and self-reflective interventions that work."
    },
    individualTitle: "🌿 Individual Journals",
    bundleTitle: "💝 Journal Bundles – Because You Deserve More for Less",
    footer: {
      instantDownload: "Instant Download",
      personalSupport: "Personal Support",
      builtWithIntention: "Built With Intention",
      closingText: "These journals took me months of heart work, research, and lived experience. I didn't just create them — I breathed life into them. They've helped many, and I promise, they'll help you too.",
      ctaText: "👉 Want help choosing your journal? Contact me — I'll personally guide you."
    }
  },
  
  blog: {
    hero: {
      title: "Blog & Resources"
    },
    emptyState: "No blog posts available yet."
  },
  
  cart: {
    title: "Your Shopping Cart",
    emptyState: "Your cart is empty.",
    continueButton: "Continue Shopping",
    clearButton: "Clear Cart",
    summaryTitle: "Cart Summary",
    totalLabel: "Total:",
    checkoutButton: "Proceed to Checkout",
    checkoutNote: "Secure checkout with instant digital delivery"
  },
  
  checkout: {
    title: "Checkout",
    contactSection: "Contact Information",
    paymentSection: "Payment Information",
    paymentNote: "This is a demo checkout. Use any card details.",
    orderSummary: "Order Summary",
    totalLabel: "Total",
    demoNote: "Note: This is a demonstration checkout. No real payment will be processed.",
    successTitle: "Order Successful!",
    successSubtitle: "Thank you for your purchase",
    successMessage: "Your order has been confirmed. You will receive a confirmation email shortly.",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    cardNumberLabel: "Card Number",
    expiryLabel: "Expiry Date",
    cvvLabel: "CVV",
    payButton: "Pay",
    processingButton: "Processing..."
  },
  
  contact: {
    title: "Book a Call",
    subtitle: "Let's talk about your healing journey",
    description: "Schedule a free consultation to discuss how I can support you."
  },
  
  footer: {
    tagline: "Healing, Growth, Transformation",
    copyright: "© 2024 Ataraxia by Aqsa. All rights reserved.",
    quickLinks: "Quick Links",
    followUs: "Follow Us"
  },
  
  common: {
    readMore: "READ MORE",
    viewDetails: "View Details",
    addToCart: "Add to Cart",
    backTo: "Back to",
    publishedOn: "Published on",
    by: "by",
    save: "Save",
    loading: "Loading...",
    error: "Error loading content"
  }
};

export const getSiteContent = (): SiteContent => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading site content:', error);
  }
  return defaultContent;
};

export const updateSiteContent = (content: SiteContent): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (error) {
    console.error('Error saving site content:', error);
  }
};

export const resetSiteContent = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
  } catch (error) {
    console.error('Error resetting site content:', error);
  }
};

// Initialize with default content if not exists
export const initializeSiteContent = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    updateSiteContent(defaultContent);
  }
};

// Call initialization
initializeSiteContent();


// Local data management system for blogs, courses, and journals

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  date: string;
  tags: string[];
  author: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  featuredImage: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  onSale: boolean;
  duration: string;
  lessons: number;
  level: string;
  tags: string[];
  syllabus: string[];
  requirements: string[];
}

export interface Journal {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  featuredImage: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  onSale: boolean;
  tags: string[];
  features: string[];
  pageCount: number;
  format: string;
  isBundle: boolean;
}

// Storage keys
const STORAGE_KEYS = {
  BLOGS: 'ataraxia_blogs',
  COURSES: 'ataraxia_courses',
  JOURNALS: 'ataraxia_journals',
  ADMIN_USER: 'ataraxia_admin_user',
  ORDERS: 'ataraxia_orders',
};

// Helper functions
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Blog functions
export const getBlogs = (): BlogPost[] => {
  return getFromStorage<BlogPost>(STORAGE_KEYS.BLOGS);
};

export const getBlogBySlug = (slug: string): BlogPost | null => {
  const blogs = getBlogs();
  return blogs.find(blog => blog.slug === slug) || null;
};

export const createBlog = (blog: Omit<BlogPost, 'id' | 'date'>): BlogPost => {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  blogs.push(newBlog);
  saveToStorage(STORAGE_KEYS.BLOGS, blogs);
  return newBlog;
};

export const updateBlog = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const blogs = getBlogs();
  const index = blogs.findIndex(blog => blog.id === id);
  if (index === -1) return null;
  
  blogs[index] = { ...blogs[index], ...updates };
  saveToStorage(STORAGE_KEYS.BLOGS, blogs);
  return blogs[index];
};

export const deleteBlog = (id: string): boolean => {
  const blogs = getBlogs();
  const filtered = blogs.filter(blog => blog.id !== id);
  if (filtered.length === blogs.length) return false;
  
  saveToStorage(STORAGE_KEYS.BLOGS, filtered);
  return true;
};

// Course functions
export const getCourses = (): Course[] => {
  return getFromStorage<Course>(STORAGE_KEYS.COURSES);
};

export const getCourseBySlug = (slug: string): Course | null => {
  const courses = getCourses();
  return courses.find(course => course.slug === slug) || null;
};

export const createCourse = (course: Omit<Course, 'id'>): Course => {
  const courses = getCourses();
  const newCourse: Course = {
    ...course,
    id: Date.now().toString(),
  };
  courses.push(newCourse);
  saveToStorage(STORAGE_KEYS.COURSES, courses);
  return newCourse;
};

export const updateCourse = (id: string, updates: Partial<Course>): Course | null => {
  const courses = getCourses();
  const index = courses.findIndex(course => course.id === id);
  if (index === -1) return null;
  
  courses[index] = { ...courses[index], ...updates };
  saveToStorage(STORAGE_KEYS.COURSES, courses);
  return courses[index];
};

export const deleteCourse = (id: string): boolean => {
  const courses = getCourses();
  const filtered = courses.filter(course => course.id !== id);
  if (filtered.length === courses.length) return false;
  
  saveToStorage(STORAGE_KEYS.COURSES, filtered);
  return true;
};

// Journal functions
export const getJournals = (): Journal[] => {
  return getFromStorage<Journal>(STORAGE_KEYS.JOURNALS);
};

export const getJournalBySlug = (slug: string): Journal | null => {
  const journals = getJournals();
  return journals.find(journal => journal.slug === slug) || null;
};

export const createJournal = (journal: Omit<Journal, 'id'>): Journal => {
  const journals = getJournals();
  const newJournal: Journal = {
    ...journal,
    id: Date.now().toString(),
  };
  journals.push(newJournal);
  saveToStorage(STORAGE_KEYS.JOURNALS, journals);
  return newJournal;
};

export const updateJournal = (id: string, updates: Partial<Journal>): Journal | null => {
  const journals = getJournals();
  const index = journals.findIndex(journal => journal.id === id);
  if (index === -1) return null;
  
  journals[index] = { ...journals[index], ...updates };
  saveToStorage(STORAGE_KEYS.JOURNALS, journals);
  return journals[index];
};

export const deleteJournal = (id: string): boolean => {
  const journals = getJournals();
  const filtered = journals.filter(journal => journal.id !== id);
  if (filtered.length === journals.length) return false;
  
  saveToStorage(STORAGE_KEYS.JOURNALS, filtered);
  return true;
};

// Admin authentication
export interface AdminUser {
  username: string;
  password: string; // In production, this should be hashed
}

export const getAdminUser = (): AdminUser | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading admin user:', error);
    return null;
  }
};

export const setAdminUser = (user: AdminUser): void => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(user));
};

export const initializeAdminUser = (): void => {
  const existingUser = getAdminUser();
  if (!existingUser) {
    // Default admin credentials - user should change these
    setAdminUser({
      username: 'admin',
      password: 'admin123', // In production, this should be hashed
    });
  }
};

export const validateAdminCredentials = (username: string, password: string): boolean => {
  const adminUser = getAdminUser();
  if (!adminUser) return false;
  return adminUser.username === username && adminUser.password === password;
};

// Order management (dummy payment system)
export interface Order {
  id: string;
  items: Array<{
    type: 'journal' | 'course';
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  customerEmail: string;
  customerName: string;
}

export const getOrders = (): Order[] => {
  return getFromStorage<Order>(STORAGE_KEYS.ORDERS);
};

export const createOrder = (order: Omit<Order, 'id' | 'date' | 'status'>): Order => {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    status: 'pending',
  };
  orders.push(newOrder);
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
  return newOrder;
};

export const updateOrderStatus = (id: string, status: Order['status']): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return null;
  
  orders[index].status = status;
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
  return orders[index];
};

// Initialize sample data
export const initializeSampleData = (): void => {
  const blogs = getBlogs();
  const courses = getCourses();
  const journals = getJournals();

  if (blogs.length === 0) {
    const sampleBlogs: BlogPost[] = [
      {
        id: '1',
        title: 'Understanding Inner Child Healing',
        slug: 'understanding-inner-child-healing',
        excerpt: 'Discover the transformative power of connecting with your inner child and healing past wounds.',
        content: '<p>Inner child work is one of the most powerful modalities for deep emotional healing. When we were children, we absorbed experiences—both positive and negative—that shaped our beliefs about ourselves and the world.</p><p>These early experiences created patterns that we carry into adulthood, often unconsciously. By connecting with our inner child, we can identify these patterns, offer healing, and create new, healthier ways of being.</p><p>This journey requires compassion, patience, and a willingness to feel. But the rewards are profound: greater self-love, healthier relationships, and a deeper sense of peace.</p>',
        featuredImage: '/placeholder.svg',
        date: new Date('2024-01-15').toISOString(),
        tags: ['Inner Child', 'Healing', 'Self-Love'],
        author: 'Aqsa',
      },
      {
        id: '2',
        title: 'The Power of Daily Meditation',
        slug: 'power-of-daily-meditation',
        excerpt: 'Learn how a consistent meditation practice can transform your mental health and overall wellbeing.',
        content: '<p>Meditation is not about stopping your thoughts or achieving a blank mind. It\'s about creating space to observe your thoughts without judgment, and in that space, finding peace.</p><p>Scientific research has shown that regular meditation practice can reduce anxiety, improve focus, lower blood pressure, and even change the structure of your brain in beneficial ways.</p><p>Start with just 5 minutes a day. Find a quiet space, sit comfortably, and focus on your breath. When your mind wanders (and it will), gently bring your attention back to your breath. That\'s the practice.</p>',
        featuredImage: '/placeholder.svg',
        date: new Date('2024-02-01').toISOString(),
        tags: ['Meditation', 'Mindfulness', 'Wellness'],
        author: 'Aqsa',
      },
      {
        id: '3',
        title: 'Breaking Free from Addiction Patterns',
        slug: 'breaking-free-from-addiction',
        excerpt: 'Explore the psychological roots of addiction and discover pathways to lasting recovery.',
        content: '<p>Addiction is often a symptom of deeper pain. Whether it\'s substance abuse, behavioral addictions, or unhealthy relationship patterns, the addiction serves as a coping mechanism for unresolved trauma or emotional pain.</p><p>True recovery isn\'t just about stopping the addictive behavior—it\'s about healing the underlying wounds that made the addiction feel necessary in the first place.</p><p>This healing journey involves self-compassion, professional support, and a willingness to feel the emotions you\'ve been avoiding. It\'s challenging, but you are worthy of recovery and peace.</p>',
        featuredImage: '/placeholder.svg',
        date: new Date('2024-02-20').toISOString(),
        tags: ['Addiction', 'Recovery', 'Healing'],
        author: 'Aqsa',
      },
    ];
    saveToStorage(STORAGE_KEYS.BLOGS, sampleBlogs);
  }

  if (courses.length === 0) {
    const sampleCourses: Course[] = [
      {
        id: '1',
        title: 'Complete Inner Child Healing Course',
        slug: 'complete-inner-child-healing',
        description: '<p>A comprehensive 8-week program designed to help you connect with, understand, and heal your inner child. This course combines NLP, hypnosis, and evidence-based psychological techniques to facilitate deep transformation.</p><p>Through guided exercises, video lessons, and personalized workbooks, you\'ll learn to identify wounded parts of yourself, offer them the love and validation they needed, and integrate these healed aspects into your adult life.</p><p>This course is perfect for anyone struggling with self-worth issues, relationship patterns, emotional regulation, or feeling disconnected from themselves.</p>',
        shortDescription: 'An 8-week transformative program to heal your inner child and reclaim your authentic self.',
        featuredImage: '/placeholder.svg',
        price: 297,
        regularPrice: 297,
        onSale: false,
        duration: '8 weeks',
        lessons: 32,
        level: 'All Levels',
        tags: ['Inner Child', 'Healing', 'Transformation'],
        syllabus: [
          'Week 1: Understanding Your Inner Child',
          'Week 2: Identifying Childhood Wounds',
          'Week 3: Self-Compassion Practices',
          'Week 4: Reparenting Yourself',
          'Week 5: Healing Abandonment and Rejection',
          'Week 6: Building Healthy Boundaries',
          'Week 7: Integration and Self-Love',
          'Week 8: Living from Your Healed Self',
        ],
        requirements: ['Open heart', 'Willingness to feel', 'Journal for exercises'],
      },
      {
        id: '2',
        title: 'Mindfulness & Meditation Mastery',
        slug: 'mindfulness-meditation-mastery',
        description: '<p>Master the art of mindfulness and meditation with this comprehensive course. Learn various meditation techniques including breath work, body scans, loving-kindness meditation, and visualization.</p><p>This course is designed for both beginners and experienced practitioners who want to deepen their practice. You\'ll receive daily guided meditations, practical exercises, and lifetime access to our meditation library.</p><p>By the end of this course, you\'ll have a sustainable daily practice that brings peace, clarity, and presence into every aspect of your life.</p>',
        shortDescription: 'Learn meditation techniques that will transform your mind, reduce stress, and bring lasting peace.',
        featuredImage: '/placeholder.svg',
        price: 197,
        regularPrice: 247,
        salePrice: 197,
        onSale: true,
        duration: '6 weeks',
        lessons: 24,
        level: 'Beginner to Advanced',
        tags: ['Meditation', 'Mindfulness', 'Stress Relief'],
        syllabus: [
          'Week 1: Foundations of Meditation',
          'Week 2: Breath Awareness Practices',
          'Week 3: Body Scan & Progressive Relaxation',
          'Week 4: Loving-Kindness Meditation',
          'Week 5: Visualization Techniques',
          'Week 6: Integrating Mindfulness into Daily Life',
        ],
        requirements: ['Quiet space for practice', 'Comfortable sitting cushion or chair'],
      },
      {
        id: '3',
        title: 'Overcoming Addiction: A Holistic Approach',
        slug: 'overcoming-addiction-holistic',
        description: '<p>This course offers a compassionate, holistic approach to understanding and overcoming addiction. Whether you\'re dealing with substance abuse, behavioral addictions, or codependency, this program addresses the root causes of addictive patterns.</p><p>You\'ll learn evidence-based techniques from psychology, neuroscience, and spiritual practices. The course includes modules on trauma healing, emotional regulation, building healthy coping mechanisms, and creating a life worth living.</p><p>This is not a replacement for professional treatment but an excellent complement to therapy or 12-step programs.</p>',
        shortDescription: 'A comprehensive program to understand addiction and build lasting recovery through holistic healing.',
        featuredImage: '/placeholder.svg',
        price: 347,
        regularPrice: 347,
        onSale: false,
        duration: '10 weeks',
        lessons: 40,
        level: 'All Levels',
        tags: ['Addiction', 'Recovery', 'Healing'],
        syllabus: [
          'Week 1: Understanding Addiction',
          'Week 2: The Neuroscience of Addiction',
          'Week 3: Identifying Triggers',
          'Week 4: Trauma and Addiction',
          'Week 5: Emotional Regulation Skills',
          'Week 6: Building Healthy Coping Mechanisms',
          'Week 7: Healing Shame and Guilt',
          'Week 8: Relationships in Recovery',
          'Week 9: Building a Meaningful Life',
          'Week 10: Relapse Prevention',
        ],
        requirements: ['Commitment to recovery', 'Journal', 'Support system (therapist or support group recommended)'],
      },
    ];
    saveToStorage(STORAGE_KEYS.COURSES, sampleCourses);
  }

  if (journals.length === 0) {
    const sampleJournals: Journal[] = [
      {
        id: '1',
        name: 'Inner Child Healing Journal',
        slug: 'inner-child-healing-journal',
        description: '<p>A beautifully designed journal to guide your inner child healing journey. This journal includes:</p><ul><li>Guided prompts to help you connect with your inner child</li><li>NLP and hypnosis-based exercises</li><li>Reflection questions for deep emotional processing</li><li>Creative exercises for expression and integration</li><li>Weekly check-ins to track your progress</li></ul><p>This journal was created from months of research, personal experience, and therapeutic practice. It\'s not just a notebook—it\'s a healing companion.</p>',
        shortDescription: 'A guided journal with therapeutic prompts to help you heal your inner child and reclaim wholeness.',
        featuredImage: '/placeholder.svg',
        price: 27,
        regularPrice: 27,
        onSale: false,
        tags: ['Inner Child', 'Healing', 'Self-Love'],
        features: [
          'Guided therapeutic prompts',
          'NLP-based exercises',
          'Weekly progress tracking',
          'Beautiful, printable design',
          'Instant digital download',
        ],
        pageCount: 85,
        format: 'PDF',
        isBundle: false,
      },
      {
        id: '2',
        name: 'Meditation & Mindfulness Journal',
        slug: 'meditation-mindfulness-journal',
        description: '<p>Deepen your meditation practice with this comprehensive mindfulness journal. Perfect for tracking your meditation journey and cultivating present-moment awareness.</p><ul><li>Daily meditation logs</li><li>Gratitude practices</li><li>Mindfulness exercises for everyday life</li><li>Reflection prompts for self-discovery</li><li>Breath work guides</li></ul><p>Use this journal to build consistency, track insights, and watch your practice evolve over time.</p>',
        shortDescription: 'Track and deepen your meditation practice with guided prompts and mindfulness exercises.',
        featuredImage: '/placeholder.svg',
        price: 22,
        regularPrice: 22,
        onSale: false,
        tags: ['Meditation', 'Mindfulness', 'Gratitude'],
        features: [
          'Daily meditation tracker',
          'Gratitude prompts',
          'Mindfulness exercises',
          'Breath work guides',
          'Progress tracking pages',
        ],
        pageCount: 60,
        format: 'PDF',
        isBundle: false,
      },
      {
        id: '3',
        name: 'Addiction Recovery Journal',
        slug: 'addiction-recovery-journal',
        description: '<p>A compassionate, evidence-based journal to support your recovery journey. This journal integrates psychological principles with spiritual practices to help you build lasting sobriety.</p><ul><li>Daily check-ins and mood tracking</li><li>Trigger identification exercises</li><li>Coping skill development</li><li>Gratitude and affirmation practices</li><li>Relapse prevention planning</li></ul><p>Created with deep understanding of the recovery journey, this journal offers support, structure, and hope.</p>',
        shortDescription: 'A supportive journal for addiction recovery with daily practices and therapeutic exercises.',
        featuredImage: '/placeholder.svg',
        price: 29,
        regularPrice: 29,
        onSale: false,
        tags: ['Addiction', 'Recovery', 'Healing'],
        features: [
          'Daily recovery check-ins',
          'Trigger tracking',
          'Coping strategies',
          'Affirmations and gratitude',
          'Relapse prevention tools',
        ],
        pageCount: 90,
        format: 'PDF',
        isBundle: false,
      },
      {
        id: '4',
        name: 'Complete Healing Journal Bundle',
        slug: 'complete-healing-journal-bundle',
        description: '<p>Get all three of our powerful healing journals at a special bundle price! This comprehensive collection includes:</p><ul><li>Inner Child Healing Journal ($27 value)</li><li>Meditation & Mindfulness Journal ($22 value)</li><li>Addiction Recovery Journal ($29 value)</li></ul><p>Total value: $78 - Save $18 with this bundle!</p><p>Perfect for anyone committed to deep, holistic healing across multiple areas of life.</p>',
        shortDescription: 'All three healing journals at a special price. Complete toolkit for transformation.',
        featuredImage: '/placeholder.svg',
        price: 60,
        regularPrice: 78,
        salePrice: 60,
        onSale: true,
        tags: ['Bundle', 'Healing', 'Complete Package'],
        features: [
          'All 3 journals included',
          'Save $18',
          'Over 235 pages total',
          'Lifetime access',
          'Comprehensive healing toolkit',
        ],
        pageCount: 235,
        format: 'PDF',
        isBundle: true,
      },
    ];
    saveToStorage(STORAGE_KEYS.JOURNALS, sampleJournals);
  }
};

// Initialize on load
initializeAdminUser();
initializeSampleData();


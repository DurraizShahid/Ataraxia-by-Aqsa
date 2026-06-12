// Initialize sample data in Supabase
import { supabase } from './supabase';
import { initializeSiteContent } from './supabaseSiteContent';

export const initializeSampleData = async () => {
  try {
    // Initialize site content first
    await initializeSiteContent();
    
    // Initialize admin user
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);
    
    if (!existingAdmin || existingAdmin.length === 0) {
      await supabase.from('admin_users').insert([
        {
          username: 'admin',
          password: 'admin123'
        }
      ]);
    }
    
    // Check if data already exists
    const { data: existingBlogs } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);
    
    if (existingBlogs && existingBlogs.length > 0) {
      console.log('Sample data already initialized');
      return;
    }

    console.log('Initializing sample data...');

    // Insert sample blogs
    const sampleBlogs = [
      {
        title: 'Understanding Inner Child Healing',
        slug: 'understanding-inner-child-healing',
        excerpt: 'Discover the transformative power of connecting with your inner child and healing past wounds.',
        content: '<p>Inner child work is one of the most powerful modalities for deep emotional healing. When we were children, we absorbed experiences—both positive and negative—that shaped our beliefs about ourselves and the world.</p><p>These early experiences created patterns that we carry into adulthood, often unconsciously. By connecting with our inner child, we can identify these patterns, offer healing, and create new, healthier ways of being.</p><p>This journey requires compassion, patience, and a willingness to feel. But the rewards are profound: greater self-love, healthier relationships, and a deeper sense of peace.</p>',
        featured_image: '/placeholder.svg',
        date: new Date('2024-01-15').toISOString(),
        tags: ['Inner Child', 'Healing', 'Self-Love'],
        author: 'Aqsa',
      },
      {
        title: 'The Power of Daily Meditation',
        slug: 'power-of-daily-meditation',
        excerpt: 'Learn how a consistent meditation practice can transform your mental health and overall wellbeing.',
        content: '<p>Meditation is not about stopping your thoughts or achieving a blank mind. It\'s about creating space to observe your thoughts without judgment, and in that space, finding peace.</p><p>Scientific research has shown that regular meditation practice can reduce anxiety, improve focus, lower blood pressure, and even change the structure of your brain in beneficial ways.</p><p>Start with just 5 minutes a day. Find a quiet space, sit comfortably, and focus on your breath. When your mind wanders (and it will), gently bring your attention back to your breath. That\'s the practice.</p>',
        featured_image: '/placeholder.svg',
        date: new Date('2024-02-01').toISOString(),
        tags: ['Meditation', 'Mindfulness', 'Wellness'],
        author: 'Aqsa',
      },
      {
        title: 'Breaking Free from Addiction Patterns',
        slug: 'breaking-free-from-addiction',
        excerpt: 'Explore the psychological roots of addiction and discover pathways to lasting recovery.',
        content: '<p>Addiction is often a symptom of deeper pain. Whether it\'s substance abuse, behavioral addictions, or unhealthy relationship patterns, the addiction serves as a coping mechanism for unresolved trauma or emotional pain.</p><p>True recovery isn\'t just about stopping the addictive behavior—it\'s about healing the underlying wounds that made the addiction feel necessary in the first place.</p><p>This healing journey involves self-compassion, professional support, and a willingness to feel the emotions you\'ve been avoiding. It\'s challenging, but you are worthy of recovery and peace.</p>',
        featured_image: '/placeholder.svg',
        date: new Date('2024-02-20').toISOString(),
        tags: ['Addiction', 'Recovery', 'Healing'],
        author: 'Aqsa',
      },
    ];

    await supabase.from('blogs').insert(sampleBlogs);

    // Insert sample courses
    const sampleCourses = [
      {
        title: 'Complete Inner Child Healing Course',
        slug: 'complete-inner-child-healing',
        description: '<p>A comprehensive 8-week program designed to help you connect with, understand, and heal your inner child. This course combines NLP, hypnosis, and evidence-based psychological techniques to facilitate deep transformation.</p><p>Through guided exercises, video lessons, and personalized workbooks, you\'ll learn to identify wounded parts of yourself, offer them the love and validation they needed, and integrate these healed aspects into your adult life.</p><p>This course is perfect for anyone struggling with self-worth issues, relationship patterns, emotional regulation, or feeling disconnected from themselves.</p>',
        short_description: 'An 8-week transformative program to heal your inner child and reclaim your authentic self.',
        featured_image: '/placeholder.svg',
        price: 297,
        regular_price: 297,
        on_sale: false,
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
        title: 'Mindfulness & Meditation Mastery',
        slug: 'mindfulness-meditation-mastery',
        description: '<p>Master the art of mindfulness and meditation with this comprehensive course. Learn various meditation techniques including breath work, body scans, loving-kindness meditation, and visualization.</p><p>This course is designed for both beginners and experienced practitioners who want to deepen their practice. You\'ll receive daily guided meditations, practical exercises, and lifetime access to our meditation library.</p><p>By the end of this course, you\'ll have a sustainable daily practice that brings peace, clarity, and presence into every aspect of your life.</p>',
        short_description: 'Learn meditation techniques that will transform your mind, reduce stress, and bring lasting peace.',
        featured_image: '/placeholder.svg',
        price: 197,
        regular_price: 247,
        sale_price: 197,
        on_sale: true,
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
        title: 'Overcoming Addiction: A Holistic Approach',
        slug: 'overcoming-addiction-holistic',
        description: '<p>This course offers a compassionate, holistic approach to understanding and overcoming addiction. Whether you\'re dealing with substance abuse, behavioral addictions, or codependency, this program addresses the root causes of addictive patterns.</p><p>You\'ll learn evidence-based techniques from psychology, neuroscience, and spiritual practices. The course includes modules on trauma healing, emotional regulation, building healthy coping mechanisms, and creating a life worth living.</p><p>This is not a replacement for professional treatment but an excellent complement to therapy or 12-step programs.</p>',
        short_description: 'A comprehensive program to understand addiction and build lasting recovery through holistic healing.',
        featured_image: '/placeholder.svg',
        price: 347,
        regular_price: 347,
        on_sale: false,
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

    await supabase.from('courses').insert(sampleCourses);

    // Insert sample journals
    const sampleJournals = [
      {
        name: 'Inner Child Healing Journal',
        slug: 'inner-child-healing-journal',
        description: '<p>A beautifully designed journal to guide your inner child healing journey. This journal includes:</p><ul><li>Guided prompts to help you connect with your inner child</li><li>NLP and hypnosis-based exercises</li><li>Reflection questions for deep emotional processing</li><li>Creative exercises for expression and integration</li><li>Weekly check-ins to track your progress</li></ul><p>This journal was created from months of research, personal experience, and therapeutic practice. It\'s not just a notebook—it\'s a healing companion.</p>',
        short_description: 'A guided journal with therapeutic prompts to help you heal your inner child and reclaim wholeness.',
        featured_image: '/placeholder.svg',
        price: 27,
        regular_price: 27,
        on_sale: false,
        tags: ['Inner Child', 'Healing', 'Self-Love'],
        features: [
          'Guided therapeutic prompts',
          'NLP-based exercises',
          'Weekly progress tracking',
          'Beautiful, printable design',
          'Instant digital download',
        ],
        page_count: 85,
        format: 'PDF',
        is_bundle: false,
      },
      {
        name: 'Meditation & Mindfulness Journal',
        slug: 'meditation-mindfulness-journal',
        description: '<p>Deepen your meditation practice with this comprehensive mindfulness journal. Perfect for tracking your meditation journey and cultivating present-moment awareness.</p><ul><li>Daily meditation logs</li><li>Gratitude practices</li><li>Mindfulness exercises for everyday life</li><li>Reflection prompts for self-discovery</li><li>Breath work guides</li></ul><p>Use this journal to build consistency, track insights, and watch your practice evolve over time.</p>',
        short_description: 'Track and deepen your meditation practice with guided prompts and mindfulness exercises.',
        featured_image: '/placeholder.svg',
        price: 22,
        regular_price: 22,
        on_sale: false,
        tags: ['Meditation', 'Mindfulness', 'Gratitude'],
        features: [
          'Daily meditation tracker',
          'Gratitude prompts',
          'Mindfulness exercises',
          'Breath work guides',
          'Progress tracking pages',
        ],
        page_count: 60,
        format: 'PDF',
        is_bundle: false,
      },
      {
        name: 'Addiction Recovery Journal',
        slug: 'addiction-recovery-journal',
        description: '<p>A compassionate, evidence-based journal to support your recovery journey. This journal integrates psychological principles with spiritual practices to help you build lasting sobriety.</p><ul><li>Daily check-ins and mood tracking</li><li>Trigger identification exercises</li><li>Coping skill development</li><li>Gratitude and affirmation practices</li><li>Relapse prevention planning</li></ul><p>Created with deep understanding of the recovery journey, this journal offers support, structure, and hope.</p>',
        short_description: 'A supportive journal for addiction recovery with daily practices and therapeutic exercises.',
        featured_image: '/placeholder.svg',
        price: 29,
        regular_price: 29,
        on_sale: false,
        tags: ['Addiction', 'Recovery', 'Healing'],
        features: [
          'Daily recovery check-ins',
          'Trigger tracking',
          'Coping strategies',
          'Affirmations and gratitude',
          'Relapse prevention tools',
        ],
        page_count: 90,
        format: 'PDF',
        is_bundle: false,
      },
      {
        name: 'Complete Healing Journal Bundle',
        slug: 'complete-healing-journal-bundle',
        description: '<p>Get all three of our powerful healing journals at a special bundle price! This comprehensive collection includes:</p><ul><li>Inner Child Healing Journal ($27 value)</li><li>Meditation & Mindfulness Journal ($22 value)</li><li>Addiction Recovery Journal ($29 value)</li></ul><p>Total value: $78 - Save $18 with this bundle!</p><p>Perfect for anyone committed to deep, holistic healing across multiple areas of life.</p>',
        short_description: 'All three healing journals at a special price. Complete toolkit for transformation.',
        featured_image: '/placeholder.svg',
        price: 60,
        regular_price: 78,
        sale_price: 60,
        on_sale: true,
        tags: ['Bundle', 'Healing', 'Complete Package'],
        features: [
          'All 3 journals included',
          'Save $18',
          'Over 235 pages total',
          'Lifetime access',
          'Comprehensive healing toolkit',
        ],
        page_count: 235,
        format: 'PDF',
        is_bundle: true,
      },
    ];

    await supabase.from('journals').insert(sampleJournals);

    console.log('Sample data initialized successfully!');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

// Call this function once when app loads
if (typeof window !== 'undefined') {
  // Only run in browser, not during build
  initializeSampleData();
}


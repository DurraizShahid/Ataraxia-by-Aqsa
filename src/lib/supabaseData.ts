// Supabase data management system for blogs, courses, and journals
import { supabase } from './supabase';

// Re-export interfaces from localData for compatibility
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

export interface AdminUser {
  username: string;
  password: string;
}

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

export interface WorkshopWaitlistLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  professionalBackground: string;
  workshopPreferences: string[];
  intent: Record<string, unknown>;
  sourcePath?: string;
  utm: Record<string, unknown>;
  createdAt: string;
}

// Blog functions
export const getBlogs = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return (data || []).map(blog => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featured_image || '/placeholder.svg',
      date: blog.date,
      tags: blog.tags || [],
      author: blog.author || 'Aqsa',
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: data.featured_image || '/placeholder.svg',
      date: data.date,
      tags: data.tags || [],
      author: data.author || 'Aqsa',
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
};

export const createBlog = async (blog: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        featured_image: blog.featuredImage,
        tags: blog.tags,
        author: blog.author,
        date: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: data.featured_image || '/placeholder.svg',
      date: data.date,
      tags: data.tags || [],
      author: data.author || 'Aqsa',
    };
  } catch (error) {
    console.error('Error creating blog:', error);
    return null;
  }
};

export const updateBlog = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.slug) updateData.slug = updates.slug;
    if (updates.excerpt) updateData.excerpt = updates.excerpt;
    if (updates.content) updateData.content = updates.content;
    if (updates.featuredImage !== undefined) updateData.featured_image = updates.featuredImage;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.author) updateData.author = updates.author;
    
    const { data, error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: data.featured_image || '/placeholder.svg',
      date: data.date,
      tags: data.tags || [],
      author: data.author || 'Aqsa',
    };
  } catch (error) {
    console.error('Error updating blog:', error);
    return null;
  }
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
};

// Course functions
export const getCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return (data || []).map(course => ({
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      shortDescription: course.short_description,
      featuredImage: course.featured_image || '/placeholder.svg',
      price: parseFloat(course.price),
      regularPrice: parseFloat(course.regular_price),
      salePrice: course.sale_price ? parseFloat(course.sale_price) : undefined,
      onSale: course.on_sale,
      duration: course.duration,
      lessons: course.lessons,
      level: course.level,
      tags: course.tags || [],
      syllabus: course.syllabus || [],
      requirements: course.requirements || [],
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      shortDescription: data.short_description,
      featuredImage: data.featured_image || '/placeholder.svg',
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      salePrice: data.sale_price ? parseFloat(data.sale_price) : undefined,
      onSale: data.on_sale,
      duration: data.duration,
      lessons: data.lessons,
      level: data.level,
      tags: data.tags || [],
      syllabus: data.syllabus || [],
      requirements: data.requirements || [],
    };
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

export const createCourse = async (course: Omit<Course, 'id'>): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert({
        title: course.title,
        slug: course.slug,
        description: course.description,
        short_description: course.shortDescription,
        featured_image: course.featuredImage,
        price: course.price,
        regular_price: course.regularPrice,
        sale_price: course.salePrice || null,
        on_sale: course.onSale,
        duration: course.duration,
        lessons: course.lessons,
        level: course.level,
        tags: course.tags,
        syllabus: course.syllabus,
        requirements: course.requirements,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      shortDescription: data.short_description,
      featuredImage: data.featured_image || '/placeholder.svg',
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      salePrice: data.sale_price ? parseFloat(data.sale_price) : undefined,
      onSale: data.on_sale,
      duration: data.duration,
      lessons: data.lessons,
      level: data.level,
      tags: data.tags || [],
      syllabus: data.syllabus || [],
      requirements: data.requirements || [],
    };
  } catch (error) {
    console.error('Error creating course:', error);
    return null;
  }
};

export const updateCourse = async (id: string, updates: Partial<Course>): Promise<Course | null> => {
  try {
    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.slug) updateData.slug = updates.slug;
    if (updates.description) updateData.description = updates.description;
    if (updates.shortDescription) updateData.short_description = updates.shortDescription;
    if (updates.featuredImage !== undefined) updateData.featured_image = updates.featuredImage;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.regularPrice !== undefined) updateData.regular_price = updates.regularPrice;
    if (updates.salePrice !== undefined) updateData.sale_price = updates.salePrice || null;
    if (updates.onSale !== undefined) updateData.on_sale = updates.onSale;
    if (updates.duration) updateData.duration = updates.duration;
    if (updates.lessons !== undefined) updateData.lessons = updates.lessons;
    if (updates.level) updateData.level = updates.level;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.syllabus) updateData.syllabus = updates.syllabus;
    if (updates.requirements) updateData.requirements = updates.requirements;
    
    const { data, error} = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      shortDescription: data.short_description,
      featuredImage: data.featured_image || '/placeholder.svg',
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      salePrice: data.sale_price ? parseFloat(data.sale_price) : undefined,
      onSale: data.on_sale,
      duration: data.duration,
      lessons: data.lessons,
      level: data.level,
      tags: data.tags || [],
      syllabus: data.syllabus || [],
      requirements: data.requirements || [],
    };
  } catch (error) {
    console.error('Error updating course:', error);
    return null;
  }
};

export const deleteCourse = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting course:', error);
    return false;
  }
};

// Workshop waitlist functions
export const createWorkshopWaitlistLead = async (lead: Omit<WorkshopWaitlistLead, 'id' | 'createdAt'>): Promise<WorkshopWaitlistLead | null> => {
  try {
    const { data, error } = await supabase
      .from('workshop_waitlist')
      .insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || null,
        professional_background: lead.professionalBackground,
        workshop_preferences: lead.workshopPreferences,
        intent: lead.intent ?? {},
        source_path: lead.sourcePath || null,
        utm: lead.utm ?? {},
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      professionalBackground: data.professional_background,
      workshopPreferences: data.workshop_preferences || [],
      intent: data.intent || {},
      sourcePath: data.source_path || undefined,
      utm: data.utm || {},
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Error creating workshop waitlist lead:', error);
    return null;
  }
};

export const getWorkshopWaitlistLeads = async (): Promise<WorkshopWaitlistLead[]> => {
  try {
    const { data, error } = await supabase
      .from('workshop_waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((lead: any) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone || undefined,
      professionalBackground: lead.professional_background,
      workshopPreferences: lead.workshop_preferences || [],
      intent: lead.intent || {},
      sourcePath: lead.source_path || undefined,
      utm: lead.utm || {},
      createdAt: lead.created_at,
    }));
  } catch (error) {
    console.error('Error fetching workshop waitlist leads:', error);
    return [];
  }
};

export const deleteWorkshopWaitlistLead = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('workshop_waitlist')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting workshop waitlist lead:', error);
    return false;
  }
};

// Journal functions (similar pattern)
export const getJournals = async (): Promise<Journal[]> => {
  try {
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return (data || []).map(journal => ({
      id: journal.id,
      name: journal.name,
      slug: journal.slug,
      description: journal.description,
      shortDescription: journal.short_description,
      featuredImage: journal.featured_image || '/placeholder.svg',
      price: parseFloat(journal.price),
      regularPrice: parseFloat(journal.regular_price),
      salePrice: journal.sale_price ? parseFloat(journal.sale_price) : undefined,
      onSale: journal.on_sale,
      tags: journal.tags || [],
      features: journal.features || [],
      pageCount: journal.page_count,
      format: journal.format,
      isBundle: journal.is_bundle,
    }));
  } catch (error) {
    console.error('Error fetching journals:', error);
    return [];
  }
};

export const getJournalBySlug = async (slug: string): Promise<Journal | null> => {
  try {
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.short_description,
      featuredImage: data.featured_image || '/placeholder.svg',
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      salePrice: data.sale_price ? parseFloat(data.sale_price) : undefined,
      onSale: data.on_sale,
      tags: data.tags || [],
      features: data.features || [],
      pageCount: data.page_count,
      format: data.format,
      isBundle: data.is_bundle,
    };
  } catch (error) {
    console.error('Error fetching journal:', error);
    return null;
  }
};

export const createJournal = async (journal: Omit<Journal, 'id'>): Promise<Journal | null> => {
  try {
    const { data, error } = await supabase
      .from('journals')
      .insert({
        name: journal.name,
        slug: journal.slug,
        description: journal.description,
        short_description: journal.shortDescription,
        featured_image: journal.featuredImage,
        price: journal.price,
        regular_price: journal.regularPrice,
        sale_price: journal.salePrice || null,
        on_sale: journal.onSale,
        tags: journal.tags,
        features: journal.features,
        page_count: journal.pageCount,
        format: journal.format,
        is_bundle: journal.isBundle,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.short_description,
      featuredImage: data.featured_image || '/placeholder.svg',
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      salePrice: data.sale_price ? parseFloat(data.sale_price) : undefined,
      onSale: data.on_sale,
      tags: data.tags || [],
      features: data.features || [],
      pageCount: data.page_count,
      format: data.format,
      isBundle: data.is_bundle,
    };
  } catch (error) {
    console.error('Error creating journal:', error);
    return null;
  }
};

export const updateJournal = async (id: string, updates: Partial<Journal>): Promise<Journal | null> => {
  try {
    const updateData: any = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.slug) updateData.slug = updates.slug;
    if (updates.description) updateData.description = updates.description;
    if (updates.shortDescription) updateData.short_description = updates.shortDescription;
    if (updates.featuredImage !== undefined) updateData.featured_image = updates.featuredImage;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.regularPrice !== undefined) updateData.regular_price = updates.regularPrice;
    if (updates.salePrice !== undefined) updateData.sale_price = updates.salePrice || null;
    if (updates.onSale !== undefined) updateData.on_sale = updates.onSale;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.features) updateData.features = updates.features;
    if (updates.pageCount !== undefined) updateData.page_count = updates.pageCount;
    if (updates.format) updateData.format = updates.format;
    if (updates.isBundle !== undefined) updateData.is_bundle = updates.isBundle;
    
    const { data, error } = await supabase
      .from('journals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.short_description,
      featuredImage: data.featured_image || '/placeholder.svg',
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      salePrice: data.sale_price ? parseFloat(data.sale_price) : undefined,
      onSale: data.on_sale,
      tags: data.tags || [],
      features: data.features || [],
      pageCount: data.page_count,
      format: data.format,
      isBundle: data.is_bundle,
    };
  } catch (error) {
    console.error('Error updating journal:', error);
    return null;
  }
};

export const deleteJournal = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('journals')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting journal:', error);
    return false;
  }
};

// Admin authentication
export const getAdminUser = async (): Promise<AdminUser | null> => {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('username, password')
      .limit(1)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return null;
  }
};

export const setAdminUser = async (user: AdminUser): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('admin_users')
      .upsert({ username: user.username, password: user.password });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error setting admin user:', error);
    return false;
  }
};

export const validateAdminCredentials = async (username: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('username, password')
      .eq('username', username)
      .eq('password', password)
      .single();
    
    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error validating credentials:', error);
    return false;
  }
};

// Order management
export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return (data || []).map(order => ({
      id: order.id,
      items: order.items,
      total: parseFloat(order.total),
      date: order.date,
      status: order.status,
      customerEmail: order.customer_email,
      customerName: order.customer_name,
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const createOrder = async (order: Omit<Order, 'id' | 'date' | 'status'>): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        items: order.items,
        total: order.total,
        customer_email: order.customerEmail,
        customer_name: order.customerName,
        status: 'pending',
        date: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      items: data.items,
      total: parseFloat(data.total),
      date: data.date,
      status: data.status,
      customerEmail: data.customer_email,
      customerName: data.customer_name,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      items: data.items,
      total: parseFloat(data.total),
      date: data.date,
      status: data.status,
      customerEmail: data.customer_email,
      customerName: data.customer_name,
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return null;
  }
};

// Initialize sample data
export const initializeSampleData = async (): Promise<void> => {
  // Check if data already exists
  const blogs = await getBlogs();
  if (blogs.length > 0) return; // Already initialized
  
  // Sample data will be inserted here
  console.log('Initializing sample data...');
  // This will be populated with the sample data from localData.ts
};


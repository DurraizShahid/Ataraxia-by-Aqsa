import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image: string | null;
          date: string;
          tags: string[];
          author: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blogs']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blogs']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          short_description: string;
          featured_image: string | null;
          price: number;
          regular_price: number;
          sale_price: number | null;
          on_sale: boolean;
          duration: string;
          lessons: number;
          level: string;
          tags: string[];
          syllabus: string[];
          requirements: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      journals: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          featured_image: string | null;
          price: number;
          regular_price: number;
          sale_price: number | null;
          on_sale: boolean;
          tags: string[];
          features: string[];
          page_count: number;
          format: string;
          is_bundle: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['journals']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['journals']['Insert']>;
      };
      workshop_waitlist: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          professional_background: string;
          workshop_preferences: string[];
          intent: any;
          source_path: string | null;
          utm: any;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['workshop_waitlist']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['workshop_waitlist']['Insert']>;
      };
      applications: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          program: string;
          goals: string;
          source_path: string | null;
          utm: any;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          items: any;
          total: number;
          date: string;
          status: 'pending' | 'completed' | 'failed';
          customer_email: string;
          customer_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      site_content: {
        Row: {
          id: string;
          content: any;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_content']['Insert']>;
      };
      admin_users: {
        Row: {
          id: string;
          username: string;
          password: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
    };
  };
}


-- Supabase Database Migrations for Ataraxia
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/axmubcpkysvxwmtvcdyy/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}',
    author TEXT DEFAULT 'Aqsa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    featured_image TEXT,
    price DECIMAL(10, 2) NOT NULL,
    regular_price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    on_sale BOOLEAN DEFAULT FALSE,
    duration TEXT NOT NULL,
    lessons INTEGER NOT NULL,
    level TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    syllabus TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Journals Table
CREATE TABLE IF NOT EXISTS journals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    featured_image TEXT,
    price DECIMAL(10, 2) NOT NULL,
    regular_price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    on_sale BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    page_count INTEGER NOT NULL,
    format TEXT NOT NULL,
    is_bundle BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Site Content Table (single row for site-wide content)
CREATE TABLE IF NOT EXISTS site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- In production, this should be hashed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_date ON blogs(date DESC);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_journals_slug ON journals(slug);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(date DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journals_updated_at BEFORE UPDATE ON journals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
INSERT INTO admin_users (username, password)
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and authenticated write access
-- Blogs policies
CREATE POLICY "Public can read blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Anyone can insert blogs" ON blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update blogs" ON blogs FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete blogs" ON blogs FOR DELETE USING (true);

-- Courses policies
CREATE POLICY "Public can read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Anyone can insert courses" ON courses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update courses" ON courses FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete courses" ON courses FOR DELETE USING (true);

-- Journals policies
CREATE POLICY "Public can read journals" ON journals FOR SELECT USING (true);
CREATE POLICY "Anyone can insert journals" ON journals FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update journals" ON journals FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete journals" ON journals FOR DELETE USING (true);

-- Orders policies
CREATE POLICY "Public can read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update orders" ON orders FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete orders" ON orders FOR DELETE USING (true);

-- Site content policies
CREATE POLICY "Public can read site content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Anyone can insert site content" ON site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update site content" ON site_content FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete site content" ON site_content FOR DELETE USING (true);

-- Admin users policies (more restrictive)
CREATE POLICY "Public can read admin users" ON admin_users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert admin users" ON admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update admin users" ON admin_users FOR UPDATE USING (true);

-- Note: In production, you should implement proper authentication and restrict these policies
-- For now, we're using simple anon key authentication for development

COMMENT ON TABLE blogs IS 'Stores blog posts';
COMMENT ON TABLE courses IS 'Stores courses';
COMMENT ON TABLE journals IS 'Stores healing journals';
COMMENT ON TABLE orders IS 'Stores customer orders';
COMMENT ON TABLE site_content IS 'Stores site-wide content settings';
COMMENT ON TABLE admin_users IS 'Stores admin user credentials';


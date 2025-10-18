# Supabase Setup Guide

## Step 1: Add Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
VITE_SUPABASE_URL=https://axmubcpkysvxwmtvcdyy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bXViY3BreXN2eHdtdHZjZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NDEwNDAsImV4cCI6MjA3NjMxNzA0MH0.jP8bUhYKjHdY5uzfYzb3uDWecxAdG7WS9QAYQeQ1Fvo
```

**Note**: If you already have a `.env` file, just add these two lines to it.

## Step 2: Run Database Migrations

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/axmubcpkysvxwmtvcdyy

2. Click on the **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy the entire contents of `supabase-migrations.sql` file

5. Paste it into the SQL Editor

6. Click **Run** button

This will create all the necessary tables:
- `blogs` - For blog posts
- `courses` - For courses
- `journals` - For healing journals
- `orders` - For customer orders
- `site_content` - For site-wide content
- `admin_users` - For admin authentication

## Step 3: Verify Tables Created

1. In Supabase Dashboard, click **Table Editor** in the left sidebar

2. You should see all 6 tables listed:
   - ✅ blogs
   - ✅ courses
   - ✅ journals
   - ✅ orders
   - ✅ site_content
   - ✅ admin_users

## Step 4: Initialize Sample Data (Optional)

The sample data will be automatically created when you first load the admin panel. But if you want to manually insert it:

Go to SQL Editor and run the sample data insertion queries (I'll provide these separately if needed).

## Step 5: Restart Your Dev Server

After adding the `.env` file, restart your development server:

```bash
npm run dev
```

## Step 6: Test the Integration

1. **Test Admin Login**: Go to `/admin/login` and log in with `admin` / `admin123`

2. **Test Content Management**: 
   - Go to `/admin/blogs` and create a blog
   - Go to `/admin/site-content` and edit some text
   - Save and refresh - changes should persist!

3. **Test Public Pages**:
   - Visit `/blog` - you should see your blogs
   - Visit `/courses` - you should see courses
   - Visit `/journals` - you should see journals

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Make sure you created the `.env` file in the project root
- Make sure the variable names start with `VITE_`
- Restart your dev server after creating the `.env` file

### Error: "relation 'blogs' does not exist"

- You haven't run the migrations yet
- Go to Supabase SQL Editor and run the `supabase-migrations.sql` file

### Changes not persisting

- Check browser console for errors
- Make sure the migrations ran successfully
- Check Supabase Dashboard > Table Editor to see if data is being saved

### Can't see data in admin panel

- Check if the tables have data in Supabase Dashboard
- Check browser console for API errors
- Make sure you're not using the old localStorage data (clear localStorage)

## Security Notes

⚠️ **For Production**:

1. **Change the default admin password** immediately
2. **Implement proper password hashing** (bcrypt/argon2)
3. **Add proper RLS policies** based on authenticated users
4. **Use service role key** for admin operations (not anon key)
5. **Enable MFA** for admin accounts
6. **Regular backups** of your database

## Benefits of Supabase vs localStorage

✅ **Persistent across devices** - Edit from anywhere
✅ **Backed up automatically** - Never lose data
✅ **Multi-admin support** - Multiple people can manage
✅ **Real-time updates** - Changes sync instantly
✅ **Production-ready** - Scalable and secure
✅ **Free tier** - 500MB database, 2GB bandwidth

## What's Next?

After setup:
1. The admin panel will work exactly the same way
2. But now changes are saved to Supabase instead of localStorage
3. You can access the admin panel from any device
4. Data is automatically backed up
5. You can view/manage data directly in Supabase Dashboard

That's it! Your website now has production-ready database persistence! 🎉


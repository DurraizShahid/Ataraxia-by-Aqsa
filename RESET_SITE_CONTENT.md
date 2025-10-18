# Reset Site Content to See Changes

## The Issue

The site content management system wasn't properly connected to your pages. I've now fixed this, but you need to clear the old data to see the updated content.

## Solution: Clear localStorage

Since the content is stored in your browser's localStorage, you need to clear it to load the new default content.

### Option 1: Clear via Browser DevTools

1. Open your website in the browser
2. Press `F12` to open DevTools
3. Go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox)
4. On the left sidebar, expand **Local Storage**
5. Click on your site's URL (e.g., `http://localhost:8080`)
6. Find the key `ataraxia_site_content`
7. Right-click it and select **Delete**
8. Refresh the page

### Option 2: Clear All localStorage

1. Open DevTools (`F12`)
2. Go to **Console** tab
3. Type: `localStorage.clear()`
4. Press Enter
5. Refresh the page

⚠️ **Note**: This will also log you out of the admin panel. Just log back in with `admin` / `admin123`

### Option 3: Use Admin Panel Reset

1. Log into `/admin/site-content`
2. Click **Reset to Default** button
3. Confirm the action
4. View your public pages - they should now show the correct default text

## What Was Fixed

I updated these files to use dynamic content:

✅ **Home Page** (`Index.tsx`)
- Hero title, subtitle, and CTA button now editable

✅ **About Page** (`About.tsx`)
- Hero title and subtitle
- Mission section
- Approach/Why Choose section

✅ **Services Page** (`Services.tsx`)
- Page title and subtitle
- Introduction description

✅ **Blog, Courses, Journals, Cart Pages**
- All previously updated

## Verify It's Working

After clearing localStorage:

1. Visit your **Home page** - The hero should say "Tranquillity in Transformation"
2. Visit **About** - Should say "Welcome to Ataraxia by Aqsa"
3. Visit **Services** - Should say "Our Healing Services"

4. Go to `/admin/site-content`
5. Try changing the Home page hero title
6. Click Save
7. Go to the home page - you should see your change!

## If It's Still Not Working

1. Hard refresh the pages (`Ctrl + Shift + R` or `Cmd + Shift + R`)
2. Try a different browser
3. Make sure JavaScript is enabled
4. Check browser console for errors

---

**Now your site content management is fully functional!** 🎉

You can edit any text from the admin panel and see it update immediately on your website.


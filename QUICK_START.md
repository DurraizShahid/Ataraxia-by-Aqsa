# Quick Start Guide - Ataraxia Local CMS

## 🎉 What's New

Your website now has a **complete local content management system** with:
- ✅ Admin panel for managing all content
- ✅ Local data storage (no external APIs needed)
- ✅ Full CRUD operations for blogs, courses, and journals
- ✅ Dummy checkout system
- ✅ Order management
- ✅ Sample data pre-loaded

## 🚀 Getting Started

### 1. Access the Admin Panel

**URL**: Navigate to `/admin/login`

**Default Credentials**:
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

### 2. Explore the Dashboard

After logging in, you'll see:
- Overview of all content (blogs, courses, journals)
- Total orders and revenue
- Recent orders

### 3. Manage Content

Navigate through the sidebar to:
- **Blogs**: Create, edit, delete blog posts
- **Courses**: Manage your courses
- **Journals**: Manage healing journals
- **Orders**: View customer orders
- **Settings**: Change your password

## 📝 Creating Content

### Creating a Blog Post
1. Go to **Blogs** section
2. Click **Add New Blog**
3. Fill in:
   - Title (required)
   - Slug (auto-generated if left empty)
   - Excerpt (required)
   - Content (HTML supported)
   - Featured Image URL
   - Tags (comma-separated)
   - Author
4. Click **Create Blog**

### Creating a Course
1. Go to **Courses** section
2. Click **Add New Course**
3. Fill in all required fields:
   - Title, description, pricing
   - Duration, lessons, level
   - Syllabus (one item per line)
   - Requirements (one item per line)
4. Toggle "On Sale" if offering a sale price
5. Click **Create Course**

### Creating a Journal
1. Go to **Journals** section
2. Click **Add New Journal**
3. Fill in required fields:
   - Name, description, pricing
   - Page count, format
   - Features (one per line)
   - Tags
4. Toggle "Is Bundle" for bundle products
5. Toggle "On Sale" for sale pricing
6. Click **Create Journal**

## 🛒 Testing the Store

### As a Customer:
1. Browse journals or courses
2. Click "Add to Cart"
3. Go to cart (icon in header)
4. Click "Proceed to Checkout"
5. Fill in dummy payment details
6. Complete order

### As Admin:
1. Log into admin panel
2. Go to **Orders** section
3. View the order details
4. Change order status if needed

## 💾 Data Storage

All data is stored in your browser's **localStorage**:
- Persists across page reloads
- Survives browser restarts
- Cleared only when you clear browser data

**Storage Keys**:
- `ataraxia_blogs`
- `ataraxia_courses`
- `ataraxia_journals`
- `ataraxia_orders`
- `ataraxia_admin_user`

## 📦 Pre-loaded Sample Data

The system comes with:
- **3 Blog Posts**: About inner child healing, meditation, and addiction recovery
- **3 Courses**: Complete programs for healing and transformation
- **4 Journals**: Individual journals + 1 bundle

You can edit or delete this sample data through the admin panel.

## ⚙️ Key Features

### Admin Panel Features
- ✅ Secure authentication
- ✅ Dashboard with analytics
- ✅ Search functionality
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Toast notifications

### Frontend Features
- ✅ Blog listing and detail pages
- ✅ Course catalog with detail pages
- ✅ Journal shop with bundles
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order confirmation

### Content Features
- ✅ HTML content support
- ✅ Featured images
- ✅ Tags and categories
- ✅ Sale pricing
- ✅ Bundle products
- ✅ Rich metadata

## 🔒 Security Notes

**Current State** (Development):
- Simple username/password authentication
- Data stored in localStorage
- No encryption
- Client-side only

**For Production**, you should implement:
1. Backend API with database
2. Proper authentication (JWT, OAuth)
3. Password hashing
4. HTTPS
5. Server-side validation
6. Real payment gateway integration

## 🎯 Common Tasks

### Change Admin Password
1. Login to admin panel
2. Navigate to **Settings**
3. Enter current password
4. Enter new password twice
5. Click "Change Password"

### Add Featured Images
Use full URLs or relative paths:
- Full URL: `https://example.com/image.jpg`
- Relative: `/images/my-image.jpg`

Place images in `/public/images/` folder for relative paths.

### Format Content
Content fields support HTML:
```html
<p>Paragraph text</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<strong>Bold text</strong>
```

### Create Sale Items
1. Check "On Sale" checkbox
2. Set regular price (e.g., 100)
3. Set sale price (e.g., 75)
4. System auto-calculates savings

## 🐛 Troubleshooting

### Can't See Admin Panel
- Clear browser cache
- Make sure JavaScript is enabled
- Check URL is correct: `/admin/login`

### Lost Password
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete `ataraxia_admin_user` key
4. Refresh page
5. System resets to default credentials

### Data Not Saving
- Check browser console for errors
- Ensure localStorage is enabled
- Try different browser
- Check localStorage quota isn't exceeded

### Orders Not Showing
- Complete a test checkout
- Check `/admin/orders`
- Look in DevTools > Application > Local Storage > `ataraxia_orders`

## 📚 File Structure

Key files you might want to customize:
```
src/
├── lib/localData.ts          # Data management & sample data
├── pages/admin/               # Admin panel pages
├── context/AuthContext.tsx    # Authentication logic
└── App.tsx                    # Routing configuration
```

## 🎨 Customization

### Update Sample Data
Edit `src/lib/localData.ts`:
- Find `initializeSampleData()` function
- Modify the sample blogs, courses, journals

### Change Admin Credentials
After first login, use Settings page, or manually edit:
- `src/lib/localData.ts`
- Find `initializeAdminUser()` function
- Change default username/password

### Styling
All components use Tailwind CSS and shadcn/ui.
Customize in:
- `src/globals.css` - Global styles
- `tailwind.config.ts` - Theme configuration

## 📞 Need Help?

Refer to:
- `ADMIN_PANEL_GUIDE.md` - Comprehensive admin guide
- Browser console for error messages
- DevTools > Application for localStorage inspection

## 🎉 You're All Set!

Start managing your content through the admin panel. The system is production-ready for the functionality implemented, though you'll want to add proper backend and payment integration for a real production deployment.

**Next Steps**:
1. Log into admin panel
2. Change default password
3. Review and customize sample data
4. Add your own content
5. Test the checkout flow
6. Customize styling as needed

Happy content managing! 🚀


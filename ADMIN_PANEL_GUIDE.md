# Ataraxia Admin Panel Guide

## Overview

Your website now has a complete local content management system with an admin panel. All data is stored in the browser's local storage, eliminating the need for external WordPress and WooCommerce APIs.

## Features

### ✅ Admin Panel
- **Authentication System**: Secure login for admin access
- **Dashboard**: Overview of all content and orders
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for:
  - Blog Posts
  - Courses
  - Journals
- **Order Management**: View and manage customer orders
- **Settings**: Change admin password

### ✅ Content Management

#### Blogs
- Title, slug, excerpt, content (HTML)
- Featured image URL
- Tags
- Author
- Publication date (auto-generated)

#### Courses
- Title, slug, description, short description
- Featured image
- Pricing (regular, sale, on sale toggle)
- Duration, lessons count, level
- Tags
- Syllabus (list of topics)
- Requirements

#### Journals
- Name, slug, description, short description
- Featured image
- Pricing (regular, sale, on sale toggle)
- Tags
- Features list
- Page count, format
- Bundle toggle

### ✅ E-commerce System
- Shopping cart
- Dummy checkout process
- Order creation and tracking
- Local order storage

## Accessing the Admin Panel

### Login Credentials
- **URL**: `http://localhost:8080/admin/login` (or your domain + `/admin/login`)
- **Default Username**: `admin`
- **Default Password**: `admin123`

**⚠️ IMPORTANT**: Change the default password immediately after first login!

### Changing Password
1. Log into admin panel
2. Navigate to "Settings"
3. Enter current password
4. Enter new password
5. Confirm new password
6. Click "Change Password"

## Admin Panel Sections

### Dashboard
- View total counts for blogs, courses, journals, and orders
- Total revenue from completed orders
- Recent orders list

### Blogs Management
- View all blog posts
- Search blogs by title, excerpt, or tags
- Create new blog posts
- Edit existing blogs
- Delete blogs
- Support for HTML content

### Courses Management
- View all courses
- Search courses
- Create/edit/delete courses
- Set pricing and sale prices
- Manage syllabus and requirements
- Track lesson count and duration

### Journals Management
- View all journals
- Search journals
- Create/edit/delete journals
- Set pricing
- Mark as bundles
- Manage features list

### Orders Management
- View all orders
- See order details (customer info, items, total)
- Change order status (pending/completed/failed)
- Track order dates

### Settings
- Change admin password
- View data management information

## Data Storage

### Local Storage
All data is stored in browser's localStorage:
- `ataraxia_blogs` - Blog posts
- `ataraxia_courses` - Courses
- `ataraxia_journals` - Journals
- `ataraxia_orders` - Customer orders
- `ataraxia_admin_user` - Admin credentials

### Sample Data
The system comes pre-loaded with sample data:
- 3 sample blog posts
- 3 sample courses
- 4 sample journals (including 1 bundle)

You can delete or modify this sample data through the admin panel.

## Frontend Pages

### Public Pages
- **Home** (`/`) - Landing page
- **About** (`/about`) - About page
- **Services** (`/services`) - Services page
- **Blog** (`/blog`) - Blog listing
- **Blog Post** (`/blog/:slug`) - Individual blog post
- **Courses** (`/courses`) - Course listing
- **Course Detail** (`/courses/:slug`) - Individual course page
- **Journals** (`/journals`) - Journal listing
- **Journal Detail** (`/journals/:slug`) - Individual journal page
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Checkout page
- **Book Call** (`/book-call`) - Contact page

### Admin Pages
- **Login** (`/admin/login`) - Admin login
- **Dashboard** (`/admin/dashboard`) - Admin dashboard
- **Blogs** (`/admin/blogs`) - Blog management
- **Courses** (`/admin/courses`) - Course management
- **Journals** (`/admin/journals`) - Journal management
- **Orders** (`/admin/orders`) - Order management
- **Settings** (`/admin/settings`) - Admin settings

## Checkout Process (Dummy Payment)

The checkout system is a demonstration implementation:

1. Customer adds items to cart
2. Proceeds to checkout
3. Enters contact information
4. Enters any card details (not validated)
5. Order is automatically created and marked as successful
6. Order appears in admin panel

**Note**: This is a dummy payment system for demonstration. For production, integrate a real payment gateway like Stripe or PayPal.

## Security Notes

### Current Implementation
- Simple authentication (username/password in localStorage)
- No encryption
- No server-side validation

### For Production
You should implement:
1. **Proper Authentication**: Use a backend service (Firebase, Supabase, etc.)
2. **Password Hashing**: Hash passwords before storing
3. **HTTPS**: Always use HTTPS in production
4. **API Backend**: Move data storage to a proper database
5. **Session Management**: Implement proper session handling
6. **Input Validation**: Add comprehensive validation
7. **Rate Limiting**: Prevent brute force attacks

## Tips for Using the Admin Panel

### Creating Content
1. **Use SEO-friendly slugs**: Keep them lowercase with hyphens
2. **HTML Content**: The content fields support HTML for rich formatting
3. **Images**: Use full URLs for featured images (or relative paths to public folder)
4. **Tags**: Use comma-separated values for tags
5. **Lists**: Use line breaks for syllabus, requirements, and features

### Managing Pricing
- Always set a regular price
- For sales, check "On Sale" and set a sale price
- The system will automatically calculate savings
- Bundles can be toggled with the "Is Bundle" checkbox

### Best Practices
1. **Regular Backups**: Export your data regularly (future feature)
2. **Image Optimization**: Optimize images before uploading
3. **Consistent Formatting**: Keep formatting consistent across content
4. **Test Checkout**: Test the checkout flow regularly
5. **Monitor Orders**: Check orders regularly in the admin panel

## Troubleshooting

### Can't Log In
- Check you're using correct credentials (admin/admin123 by default)
- Clear browser cache and try again
- Check browser console for errors

### Data Not Showing
- Check if sample data initialized correctly
- Look in browser DevTools > Application > Local Storage
- Verify data exists in localStorage

### Lost Admin Password
- Clear browser localStorage
- Refresh the page
- System will reinitialize with default credentials (admin/admin123)

### Orders Not Appearing
- Check browser console for errors
- Verify checkout process completed
- Look in localStorage under `ataraxia_orders`

## Future Enhancements

Consider adding:
1. **Data Export/Import**: Backup and restore functionality
2. **Image Upload**: Direct image upload to server
3. **Rich Text Editor**: WYSIWYG editor for content
4. **Email Notifications**: Send order confirmations
5. **Analytics Dashboard**: Track views and sales
6. **Multi-user Support**: Multiple admin accounts
7. **Real Payment Integration**: Stripe/PayPal integration
8. **Database Backend**: Move to proper database (Firebase, MongoDB, etc.)

## Development

### File Structure
```
src/
├── components/
│   ├── admin/
│   │   └── AdminLayout.tsx
│   └── ...
├── context/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/
│   └── localData.ts          # Data management
├── pages/
│   ├── admin/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Blogs.tsx
│   │   ├── Courses.tsx
│   │   ├── Journals.tsx
│   │   ├── Orders.tsx
│   │   └── Settings.tsx
│   ├── Blog.tsx
│   ├── Courses.tsx
│   ├── Journals.tsx
│   ├── Checkout.tsx
│   └── ...
└── App.tsx
```

### Adding New Content Types
1. Define interface in `lib/localData.ts`
2. Create CRUD functions
3. Add storage key
4. Create admin page
5. Update routing
6. Create public-facing page

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are correctly placed
3. Ensure no TypeScript compilation errors
4. Check that localStorage is enabled in browser

## License

This admin panel is part of the Ataraxia by Aqsa website project.


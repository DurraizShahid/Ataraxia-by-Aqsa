# Site Content Management Guide

## Overview

The Site Content Management system allows you to edit **all static text** across your website from a single admin panel interface. No more hunting through code files to change titles, descriptions, or button labels!

## Features

✅ **Centralized Content Management** - Edit all text from one place  
✅ **Real-time Updates** - Changes appear immediately on the site  
✅ **Organized by Page** - Easy navigation through tabs  
✅ **Reset to Defaults** - One-click restore to original content  
✅ **No Code Required** - User-friendly interface  

## Accessing Site Content Editor

1. Login to admin panel at `/admin/login`
2. Click **Site Content** in the sidebar
3. Navigate through the tabs to find the content you want to edit

## Content Sections

### Home Page
- **Hero Section**: Main banner title, subtitle, and CTA button
- **Services Section**: Section titles and descriptions
- **Transformation Section**: Intro content

### About Page
- **Hero Section**: Page title and subtitle
- **Mission Section**: Mission statement
- **Approach Section**: Your approach description

### Services Page
- **Hero Section**: Page title and subtitle
- **Description**: Main content description

### Courses Page
- **Hero Section**: Page title and subtitle
- **Empty State**: Message when no courses exist

### Journals Page
- **Hero Section**: Main title, subtitle, and description
- **Section Titles**: Individual journals and bundles headings
- **Footer Section**: Feature icons text and closing statements

### Blog Page
- **Hero**: Page title
- **Empty State**: Message when no blogs exist

### Cart Page
- **All Labels**: Title, buttons, summary labels
- **Empty State**: Message for empty cart
- **Checkout Note**: Security/delivery message

### Checkout Page
- **Form Labels**: All input field labels
- **Section Titles**: Contact, payment, summary headings
- **Success Messages**: Order confirmation text
- **Demo Note**: Disclaimer about demo payment

### Common
- **Reusable Text**: Button labels used across multiple pages
  - Read More
  - View Details
  - Add to Cart
  - Back to
  - Published on
  - By (author)

## How to Edit Content

### Step-by-Step

1. **Navigate to Content**
   - Go to `/admin/site-content`
   - Click the tab for the page you want to edit

2. **Make Changes**
   - Find the field you want to change
   - Type your new content
   - Use the input fields for short text
   - Use textarea fields for longer descriptions

3. **Save**
   - Click "Save All Changes" button (top right or sticky bottom)
   - You'll see a success notification
   - Changes are immediately live

4. **View Changes**
   - Open the public page in a new tab
   - Your changes will be visible immediately
   - Refresh if needed

### Tips

- **Preview Before Saving**: Open the page in another tab to check layout
- **Keep It Concise**: Shorter text often looks better
- **Use Emojis**: You can include emojis in titles (e.g., 🌿, 💝)
- **Line Breaks**: Use shift+enter for line breaks in textareas
- **HTML Not Supported**: These are plain text fields (not for rich content)

## Resetting Content

If you want to restore default content:

1. Click **Reset to Default** button
2. Confirm the action
3. All content reverts to original text
4. This **cannot be undone**

## Data Storage

All content changes are stored in:
- **localStorage key**: `ataraxia_site_content`
- **Persists**: Across browser sessions
- **Cleared**: When you clear browser data
- **Backup**: Consider exporting localStorage regularly

## Best Practices

### Writing Effective Content

1. **Headlines**: Keep under 60 characters for readability
2. **Subtitles**: 120 characters or less
3. **Descriptions**: 2-3 sentences for best impact
4. **CTAs**: Use action verbs (Get, Start, Discover, Learn)
5. **Consistency**: Use similar tone across pages

### Common Edits

**Seasonal Campaigns**:
- Update hero titles for promotions
- Change CTAs for special offers
- Add seasonal messaging

**Brand Refinement**:
- Adjust tone of voice
- Update taglines
- Refine value propositions

**A/B Testing**:
- Try different headlines
- Test CTA button text
- Experiment with descriptions

## Technical Details

### File Structure

```
src/
├── lib/
│   └── siteContent.ts         # Content management logic
└── pages/
    └── admin/
        └── SiteContent.tsx    # Admin UI
```

### How It Works

1. **Default Content**: Stored in `siteContent.ts`
2. **Initialization**: Creates localStorage on first load
3. **Reading**: Pages call `getSiteContent()` to get current text
4. **Updating**: Admin panel calls `updateSiteContent()` to save
5. **Resetting**: `resetSiteContent()` restores defaults

### Using Dynamic Content in Code

To make any text dynamic in your pages:

```typescript
import { getSiteContent } from '@/lib/siteContent';

const MyComponent = () => {
  const content = getSiteContent();
  
  return (
    <h1>{content.home.hero.title}</h1>
  );
};
```

### Adding New Content Fields

If you need to add new editable fields:

1. **Update Type Definition** in `siteContent.ts`:
   ```typescript
   export interface SiteContent {
     // Add your new section
     myNewPage: {
       title: string;
       description: string;
     };
   }
   ```

2. **Update Default Content**:
   ```typescript
   const defaultContent: SiteContent = {
     myNewPage: {
       title: 'Default Title',
       description: 'Default description'
     }
   };
   ```

3. **Add Tab in Admin**:
   - Edit `src/pages/admin/SiteContent.tsx`
   - Add new tab trigger
   - Add new tab content with input fields

4. **Use in Your Page**:
   ```typescript
   const content = getSiteContent();
   <h1>{content.myNewPage.title}</h1>
   ```

## Troubleshooting

### Changes Not Showing

**Issue**: Edits saved but not appearing on site  
**Solution**: 
- Hard refresh the page (Ctrl+F5)
- Check browser console for errors
- Verify localStorage contains updated data

### Content Disappeared

**Issue**: All content is default again  
**Solution**:
- Check if browser data was cleared
- Look for localStorage under DevTools > Application
- Use Reset to Default if corrupted

### Can't Save Changes

**Issue**: Save button not working  
**Solution**:
- Check browser console for errors
- Ensure localStorage is enabled
- Try a different browser
- Check localStorage quota

## FAQ

**Q: Can I edit blog/course/journal content here?**  
A: No, this is for static site text only. Use the respective admin sections (Blogs, Courses, Journals) for dynamic content.

**Q: Will changes affect SEO?**  
A: Yes! Page titles and descriptions are part of SEO. Choose keywords wisely.

**Q: Can I use HTML?**  
A: No, these are plain text fields. For rich content, use the Blogs section.

**Q: Can multiple admins edit at once?**  
A: Not recommended. Last save wins. Coordinate edits to avoid conflicts.

**Q: Is there an edit history?**  
A: Not currently. Consider noting important changes externally.

**Q: Can I export/import content?**  
A: Not built-in, but you can manually export localStorage JSON.

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify localStorage in DevTools
3. Try Reset to Default
4. Clear cache and retry

## Future Enhancements

Potential features to add:
- [ ] Edit history/version control
- [ ] Export/Import functionality
- [ ] Multi-language support
- [ ] Content preview before save
- [ ] Undo/Redo functionality
- [ ] Search across all content
- [ ] Bulk edit capabilities

---

## Quick Reference

### Keyboard Shortcuts
- `Ctrl + S` (when implemented): Quick save
- `Tab`: Navigate between fields
- `Shift + Tab`: Navigate backwards

### Most Commonly Edited
1. Home page hero title
2. Journals page descriptions
3. Cart page button labels
4. Checkout success messages
5. Common "View Details" text

### Best Times to Edit
- Before launching campaigns
- During rebranding
- After A/B test results
- Based on user feedback
- Seasonal updates

Happy content editing! 🎨


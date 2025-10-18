# Environment Setup - IMPORTANT!

## Create .env File

**You MUST create a `.env` file** in your project root for the website to work with Supabase.

### Location:
```
C:\Users\durra\OneDrive\Desktop\Ataraxia-by-Aqsa\.env
```

### Contents:

```env
VITE_SUPABASE_URL=https://axmubcpkysvxwmtvcdyy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bXViY3BreXN2eHdtdHZjZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NDEwNDAsImV4cCI6MjA3NjMxNzA0MH0.jP8bUhYKjHdY5uzfYzb3uDWecxAdG7WS9QAYQeQ1Fvo
```

### How to Create:

#### Option 1: Using Notepad
1. Open Notepad
2. Copy the content above
3. Save as `.env` (include the dot)
4. Choose "All Files" in file type dropdown
5. Save in project root folder

#### Option 2: Using VS Code
1. Right-click in project root
2. New File
3. Name it `.env`
4. Paste the content
5. Save

#### Option 3: Using Terminal
```bash
cd C:\Users\durra\OneDrive\Desktop\Ataraxia-by-Aqsa
echo VITE_SUPABASE_URL=https://axmubcpkysvxwmtvcdyy.supabase.co > .env
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bXViY3BreXN2eHdtdHZjZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NDEwNDAsImV4cCI6MjA3NjMxNzA0MH0.jP8bUhYKjHdY5uzfYzb3uDWecxAdG7WS9QAYQeQ1Fvo >> .env
```

### Verify It Exists:

Check that you see `.env` in your project root:
```
Ataraxia-by-Aqsa/
  ├── .env  ← This file!
  ├── src/
  ├── package.json
  └── ...
```

### After Creating .env:

**MUST restart your dev server**:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ⚠️ Important Notes

1. **The .env file is required** - Website won't work without it
2. **Don't commit .env to git** - Keep credentials private
3. **Restart server after creating** - Env vars load on startup
4. **Check file name** - Must be exactly `.env` (not `env.txt` or `.env.txt`)

---

## ✅ Verification

After creating `.env` and restarting:

1. Open browser console
2. Should see: "Initializing sample data..." (first time)
3. No errors about missing env variables
4. Website loads properly

If you see errors about missing Supabase variables, the `.env` file isn't loaded correctly.

---

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"

**Cause**: .env file not found or not loaded

**Fix**:
1. Verify .env file exists in root
2. Check file is named exactly `.env`
3. Restart dev server
4. Clear browser cache

### Error: "Failed to fetch"

**Cause**: Can't connect to Supabase

**Fix**:
1. Check internet connection
2. Verify Supabase URL is correct
3. Check Supabase project is active
4. Try accessing Supabase dashboard

### No Sample Data Loading

**Cause**: Database empty

**Fix**:
1. Check Supabase Table Editor
2. Run `initializeSampleData()` manually
3. Or create content via admin panel

---

## 🎉 Once .env is Set Up

You're ready to go! Your website will:
- ✅ Connect to Supabase
- ✅ Load sample data
- ✅ Save changes permanently
- ✅ Work from any device

**Create the .env file now and restart your server!** 🚀


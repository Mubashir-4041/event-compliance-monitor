# PredictHQ Integration Guide

This guide explains the complete PredictHQ integration for fetching and displaying live events.

## 🚀 Quick Start

### 1. Environment Setup

Your API token is already configured in `.env.local`:
```
PREDICTHQ_API_TOKEN=fmJZyubP2eRldhToMx6NJGP0UxYjOqjFqH_tJ_8K
```

This file is automatically ignored by git to keep your API key secure.

### 2. Install Dependencies

If you haven't already, install the project dependencies:
```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. View the Events Page

Open your browser and navigate to:
```
http://localhost:3000/predicthq
```

You should see a beautiful dark-themed page displaying live concert events from Italy!

---

## 📁 Project Structure

### Backend API Route: `/app/api/events/route.ts`

**Endpoint:** `GET /api/events`

**Query Parameters:**
- `country` - Country code (default: 'IT')
- `category` - Event category (default: 'concerts')
- `limit` - Number of events to fetch (default: '10')

**Example Request:**
```javascript
fetch('/api/events?country=IT&category=concerts&limit=10')
```

**Response Format:**
```json
{
  "success": true,
  "count": 10,
  "events": [
    {
      "id": "event-id",
      "title": "Concert Name",
      "description": "Event description",
      "start": "2025-01-15T20:00:00Z",
      "end": "2025-01-15T23:00:00Z",
      "category": "concerts",
      "labels": ["music", "live"],
      "location": {
        "address": "Milan, Italy",
        "country": "IT"
      },
      "venue": "Venue Name",
      "phq_attendance": 5000,
      "rank": 65
    }
  ]
}
```

**Error Handling:**
- Missing API token → 500 error with message
- PredictHQ API errors → Forwarded with details
- Network errors → 500 error with error message

---

### Frontend Page: `/app/predicthq/page.tsx`

**Route:** `/predicthq`

**Features:**
- ✅ Fetches events from backend API on page load
- ✅ Beautiful dark theme with gradient background
- ✅ Responsive card layout (1/2/3 columns)
- ✅ Displays: title, date, venue, location, description
- ✅ Loading state with spinner
- ✅ Error handling with retry button
- ✅ Hover effects and animations
- ✅ Category badges and event ranks
- ✅ Expected attendance display
- ✅ Refresh button to reload events

---

### Type Definitions: `/types/predicthq-event.ts`

TypeScript interfaces for type-safe event handling:

```typescript
interface PredictHQEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  category: string;
  labels: string[];
  location: {
    address: string;
    country: string;
  };
  venue: string;
  phq_attendance?: number;
  rank?: number;
}
```

---

## 🎨 Styling

The page uses **Tailwind CSS** with a modern dark theme:

- **Background:** Dark gradient (gray-950 → gray-900 → gray-950)
- **Cards:** Semi-transparent with backdrop blur
- **Hover Effects:** Border color change, shadow, and slight lift animation
- **Color Scheme:** 
  - Primary: Blue (#3B82F6)
  - Text: White/Gray scale
  - Accents: Blue, Green for icons

---

## 🔧 Customization

### Change Query Parameters

Edit the fetch call in `/app/predicthq/page.tsx`:

```typescript
// Original
const response = await fetch('/api/events?country=IT&category=concerts&limit=10');

// Examples:
// Festivals in US
const response = await fetch('/api/events?country=US&category=festivals&limit=20');

// Sports in UK
const response = await fetch('/api/events?country=GB&category=sports&limit=15');
```

### Available Categories

PredictHQ supports many event categories:
- concerts
- festivals
- sports
- conferences
- expos
- performing-arts
- community
- academic
- and more...

### Available Countries

Use ISO 3166-1 alpha-2 country codes:
- IT - Italy
- US - United States
- GB - United Kingdom
- FR - France
- DE - Germany
- ES - Spain
- etc.

---

## 🔒 Security Notes

1. **API Token Storage:** 
   - ✅ Stored in `.env.local` (server-side only)
   - ✅ Never exposed to client-side code
   - ✅ Automatically ignored by git

2. **Backend Proxy Pattern:**
   - Client calls `/api/events` (your backend)
   - Backend calls PredictHQ API with token
   - Token never leaves your server

3. **Environment Variables:**
   - Use `process.env.PREDICTHQ_API_TOKEN` in server code only
   - Never use environment variables in client components
   - Prefix with `NEXT_PUBLIC_` only if you need client access (NOT for API tokens!)

---

## 🧪 Testing

### Test the API Route Directly

Open your browser and visit:
```
http://localhost:3000/api/events?country=IT&category=concerts&limit=5
```

You should see raw JSON output with event data.

### Test Different Parameters

Try these URLs:
```
http://localhost:3000/api/events?country=US&category=sports&limit=15
http://localhost:3000/api/events?country=FR&category=festivals&limit=10
http://localhost:3000/api/events?country=GB&category=conferences&limit=20
```

---

## 📝 Code Comments

All code includes detailed inline comments explaining:
- **Step-by-step flow** - Each major operation is numbered and explained
- **Purpose** - Why each section exists
- **Parameters** - What each function accepts
- **Error handling** - How errors are caught and handled

---

## 🎯 Key Features Implemented

✅ Secure API token storage in `.env.local`  
✅ Backend API route with PredictHQ integration  
✅ Clean JSON responses with error handling  
✅ Frontend page with beautiful UI  
✅ Event details display (title, date, venue, location, description)  
✅ Tailwind CSS dark theme styling  
✅ Card layout with responsive grid  
✅ Loading and error states  
✅ Comprehensive TypeScript types  
✅ Fully commented code  
✅ Ready to run - just `npm run dev`!

---

## 🐛 Troubleshooting

### "API token is not configured" error

Make sure `.env.local` exists in the root directory with:
```
PREDICTHQ_API_TOKEN=fmJZyubP2eRldhToMx6NJGP0UxYjOqjFqH_tJ_8K
```

If you need to restart the dev server after creating `.env.local`:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### "Failed to fetch events" error

1. Check your internet connection
2. Verify your API token is valid
3. Check the browser console for detailed error messages
4. Try accessing the API directly: http://localhost:3000/api/events

### No events showing

- The query might not match any events
- Try different parameters (country, category, limit)
- Check the raw API response at `/api/events`

---

## 📚 Additional Resources

- **PredictHQ API Docs:** https://docs.predicthq.com/
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 🎉 Success!

Your PredictHQ integration is complete and ready to use!

Navigate to **http://localhost:3000/predicthq** to see it in action! 🚀


# Quick Setup Guide

## Installation & Running

### Step 1: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Lucide React
- shadcn/ui components
- React Hook Form
- date-fns

### Step 2: Run Development Server
```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### Step 3: Access the Application

**Option 1: Direct Dashboard Access**
- Navigate to: `http://localhost:3000`
- You'll land directly on the dashboard

**Option 2: Via Login Page**
- Navigate to: `http://localhost:3000/login`
- Enter any email and password (demo mode)
- Click "Sign In" to access the dashboard

## Using the Application

### Dashboard Features

1. **Search Events**
   - Use the search bar in the header
   - Search by event name, venue, source, address, or inspector

2. **View Statistics**
   - See animated stats cards showing:
     - Total Events (25)
     - Licensed Events
     - Unlicensed Events
     - Pending Events

3. **Table View** (Default)
   - Filter by license status (All/Licensed/Unlicensed)
   - Filter by source (Instagram, Facebook, Twitter, etc.)
   - Click "View" to see event details
   - Click "Edit" to open event details (same as view)

4. **Map View**
   - Click "Map View" button in the action bar
   - See geographic distribution of events
   - Green markers = Licensed events
   - Red markers = Unlicensed events
   - Hover over markers for event info
   - Click markers to view details

5. **Add New Event**
   - Click the floating "+ Add Event" button (bottom right)
   - Fill in the event details form:
     - Event name
     - Venue and address
     - Date and time
     - Source (Instagram, Facebook, Twitter, Website, Other)
     - Capacity
     - Inspector
     - License status
     - Notes (optional)
     - Screenshot upload (optional)
   - Click "Add Event" to save

6. **View Event Details**
   - Click "View" on any event
   - A drawer slides in from the right
   - Shows complete event information
   - Toggle license status with "Approve/Revoke" button
   - Close drawer with X button or click outside

7. **Import Events (Coming Soon)**
   - Button is visible but disabled
   - Placeholder for future automation feature

## Data

The application uses dummy data from `data/dummyEvents.json` containing 25 sample events with:
- Various venues in Pescara, Italy
- Mix of licensed and unlicensed events
- Different sources (social media, websites)
- Different inspectors
- Geographic coordinates for map view

## Customization

### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  background: "#0d0d0d",  // Main background
  accent: "#1ED8FB",      // Accent color (cyan)
}
```

### Modify Events Data
Edit `data/dummyEvents.json` to add/remove/modify events

### Add More Inspectors
In `components/AddEventModal.tsx`, update the inspector select options

## Building for Production

```bash
npm run build
npm start
```

The optimized production build will be created in `.next` folder.

## Troubleshooting

**Issue**: Dependencies not installing
- Solution: Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Issue**: Port 3000 already in use
- Solution: Kill the process using port 3000 or run on different port:
  ```bash
  npm run dev -- -p 3001
  ```

**Issue**: Styling not loading
- Solution: Ensure Tailwind CSS is properly configured and restart dev server

## Features Showcase

✅ Modern dark theme (#0d0d0d background, #1ED8FB accent)
✅ Fully responsive design
✅ Smooth Framer Motion animations
✅ Professional UI with shadcn/ui components
✅ Interactive data tables with filters
✅ Event map visualization
✅ Add event modal with form validation
✅ Event detail drawer with license toggle
✅ Real-time search functionality
✅ Statistics dashboard
✅ 25 comprehensive dummy events
✅ Optional login page
✅ Clean, organized code structure
✅ TypeScript for type safety
✅ Ready for API integration

## Next Steps for Production

1. Connect to backend API
2. Implement real authentication
3. Add role-based access control
4. Integrate real map service (Google Maps/Mapbox)
5. Add automated event scraping
6. Implement export functionality
7. Add event history tracking
8. Create analytics dashboard
9. Add notification system
10. Implement event calendar view

Enjoy exploring the Event Compliance Monitor! 🚀


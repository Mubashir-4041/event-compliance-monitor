# Event Compliance Monitor

A modern, dark-themed frontend demo built with Next.js (App Router) for monitoring and managing event license and tax compliance. This is a frontend-only demo using local JSON data, designed to showcase the workflow and UI/UX for compliance inspectors.

## Features

- **Dashboard Overview**: Real-time statistics showing total, licensed, unlicensed, and pending events
- **Event Management**: View, add, and manage events with detailed information
- **Interactive Table**: Filterable table with status and source filters
- **Event Details Drawer**: Slide-in panel showing comprehensive event information
- **Map View**: Geographic visualization of events with interactive markers
- **Add Event Modal**: Form to add new events with React Hook Form validation
- **Search Functionality**: Real-time search across events, venues, and sources
- **License Toggle**: Quick approve/revoke license status for events
- **Smooth Animations**: Framer Motion animations throughout the interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Language**: TypeScript
- **Date Handling**: date-fns

## Design

- **Dark Theme**: Primary background `#0d0d0d`
- **Accent Color**: `#1ED8FB` (cyan)
- **Typography**: White text with muted gray for secondary content
- **Cards**: Rounded corners (rounded-2xl) with subtle borders
- **Responsive**: Fully responsive layout for all screen sizes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── Header.tsx          # Header with search
│   ├── StatsOverview.tsx   # Statistics cards
│   ├── EventTable.tsx      # Events table with filters
│   ├── AddEventModal.tsx   # Add event form modal
│   ├── EventDetailDrawer.tsx # Event details sidebar
│   └── EventMap.tsx        # Map view component
├── data/
│   └── dummyEvents.json    # Sample event data (25 events)
├── types/
│   └── event.ts            # TypeScript interfaces
└── lib/
    └── utils.ts            # Utility functions
```

## Data Structure

Events contain the following information:
- Event name, venue, and address
- Date, time, and capacity
- License status (licensed/unlicensed)
- Source (Instagram, Facebook, Twitter, Website, etc.)
- Inspector assigned
- Geographic coordinates (lat/lng)
- Notes and observations
- Optional screenshot/evidence

## Features in Detail

### Dashboard
- Animated statistics cards showing event breakdown
- Search bar for filtering events
- Toggle between table and map views

### Event Table
- Sortable columns with event details
- Filter by license status (all/licensed/unlicensed)
- Filter by source (Instagram, Facebook, etc.)
- View and edit actions for each event

### Add Event Modal
- Comprehensive form with validation
- Date/time pickers
- Source and inspector selection
- License status toggle
- File upload for screenshots
- Smooth form animations

### Event Detail Drawer
- Full event information display
- Quick license approve/revoke action
- Location preview
- Inspector notes
- Evidence/screenshot display
- Coordinate information

### Map View
- Geographic distribution of events
- Color-coded markers (green = licensed, red = unlicensed)
- Animated pulse effects
- Hover tooltips with event info
- Legend for marker types

## Future Enhancements

- Backend API integration
- Real-time event scraping automation
- Advanced filtering and sorting
- Export to PDF/Excel
- User authentication
- Role-based permissions
- Notification system
- Analytics dashboard
- Calendar view
- Event history tracking

## License

This is a demo project for showcase purposes.


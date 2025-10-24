"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Download, MapIcon, TableIcon, RefreshCw, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import StatsOverview from "@/components/StatsOverview";
import EventTable from "@/components/EventTable";
import AddEventModal from "@/components/AddEventModal";
import EventDetailDrawer from "@/components/EventDetailDrawer";
import EventMap from "@/components/EventMap";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { PredictHQEvent } from "@/types/predicthq-event";

/**
 * Transform PredictHQ event data to our dashboard Event format
 */
function transformPredictHQEvent(phqEvent: PredictHQEvent, index: number): Event {
  const startDate = new Date(phqEvent.start);
  
  // Extract coordinates from location if available (default to Italy center)
  const defaultLat = 41.9028 + (Math.random() - 0.5) * 10; // Rome area with variation
  const defaultLng = 12.4964 + (Math.random() - 0.5) * 10;
  
  return {
    id: index + 1,
    name: phqEvent.title,
    date: startDate.toISOString().split('T')[0], // YYYY-MM-DD format
    time: startDate.toTimeString().substring(0, 5), // HH:MM format
    venue: phqEvent.venue,
    licensed: false, // Default to not licensed - can be updated manually
    source: "PredictHQ",
    lat: defaultLat,
    lng: defaultLng,
    address: phqEvent.location.address,
    capacity: phqEvent.phq_attendance || 0,
    inspector: "Auto-imported",
    notes: phqEvent.description,
    screenshot: null,
  };
}

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "map">("table");

  // Step 1: Fetch PredictHQ events when component mounts
  useEffect(() => {
    fetchPredictHQEvents();
  }, []);

  /**
   * Fetch events from PredictHQ API via our backend route
   */
  const fetchPredictHQEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch concerts in Italy (you can change these parameters)
      const response = await fetch('/api/events?country=IT&category=concerts&limit=50');
      
      if (!response.ok) {
        throw new Error('Failed to fetch events from PredictHQ');
      }

      const data = await response.json();
      
      // Transform PredictHQ events to our Event format
      const transformedEvents = data.events.map((event: PredictHQEvent, index: number) =>
        transformPredictHQEvent(event, index)
      );
      
      setEvents(transformedEvents);
    } catch (err) {
      console.error('Error fetching PredictHQ events:', err);
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        event.name.toLowerCase().includes(searchLower) ||
        event.venue.toLowerCase().includes(searchLower) ||
        event.source.toLowerCase().includes(searchLower) ||
        event.address.toLowerCase().includes(searchLower) ||
        event.inspector.toLowerCase().includes(searchLower)
      );
    });
  }, [events, searchQuery]);

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Math.max(...events.map((e) => e.id), 0) + 1,
    };
    setEvents([event, ...events]);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const handleToggleLicense = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, licensed: !event.licensed } : event
      )
    );
    // Update selected event if it's the one being toggled
    if (selectedEvent?.id === eventId) {
      setSelectedEvent({ ...selectedEvent, licensed: !selectedEvent.licensed });
    }
  };

  /**
   * Refresh events from PredictHQ - now a working feature!
   */
  const handleImportEvents = () => {
    fetchPredictHQEvents();
  };

  // Step 2: Show loading state while fetching events
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Loading events from PredictHQ...</p>
        </div>
      </div>
    );
  }

  // Step 3: Show error state if something went wrong
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="bg-destructive/10 border border-destructive rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-destructive text-center mb-2">Error Loading Events</h2>
          <p className="text-muted-foreground text-center mb-4">{error}</p>
          <button
            onClick={fetchPredictHQEvents}
            className="w-full bg-accent hover:bg-accent/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <StatsOverview events={filteredEvents} />

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex gap-3">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              onClick={() => setViewMode("table")}
              className={
                viewMode === "table"
                  ? "bg-accent hover:bg-accent/90"
                  : "hover:bg-accent/10"
              }
            >
              <TableIcon className="w-4 h-4 mr-2" />
              Table View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              className={
                viewMode === "map"
                  ? "bg-accent hover:bg-accent/90"
                  : "hover:bg-accent/10"
              }
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleImportEvents}
              disabled={loading}
              className="hover:bg-accent/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh from PredictHQ
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        {viewMode === "table" ? (
          <EventTable
            events={filteredEvents}
            onViewEvent={handleViewEvent}
            onEditEvent={handleEditEvent}
          />
        ) : (
          <EventMap events={filteredEvents} onEventClick={handleViewEvent} />
        )}

        {/* Floating Add Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="fixed bottom-8 right-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-accent hover:bg-accent/90 text-primary-foreground rounded-full p-4 shadow-2xl shadow-accent/50 flex items-center gap-3 font-semibold"
          >
            <Plus className="w-6 h-6" />
            <span className="pr-2">Add Event</span>
          </motion.button>
        </motion.div>

        {/* Modals & Drawers */}
        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddEvent={handleAddEvent}
        />

        <EventDetailDrawer
          event={selectedEvent}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onToggleLicense={handleToggleLicense}
        />
      </div>
    </div>
  );
}


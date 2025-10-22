"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Download, MapIcon, TableIcon } from "lucide-react";
import Header from "@/components/Header";
import StatsOverview from "@/components/StatsOverview";
import EventTable from "@/components/EventTable";
import AddEventModal from "@/components/AddEventModal";
import EventDetailDrawer from "@/components/EventDetailDrawer";
import EventMap from "@/components/EventMap";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import eventsData from "@/data/dummyEvents.json";

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>(eventsData as Event[]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "map">("table");

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

  const handleImportEvents = () => {
    // Placeholder for future automation feature
    alert("Import feature coming soon! This will allow automated event scraping.");
  };

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
              disabled
              className="opacity-50 cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-2" />
              Import Events
              <span className="ml-2 text-xs bg-accent/20 px-2 py-0.5 rounded">
                Soon
              </span>
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


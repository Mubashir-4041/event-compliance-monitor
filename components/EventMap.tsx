"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle, XCircle } from "lucide-react";
import { Event } from "@/types/event";

interface EventMapProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function EventMap({ events, onEventClick }: EventMapProps) {
  // Simple map visualization - in production would use Google Maps/Mapbox
  const minLat = Math.min(...events.map((e) => e.lat));
  const maxLat = Math.max(...events.map((e) => e.lat));
  const minLng = Math.min(...events.map((e) => e.lng));
  const maxLng = Math.max(...events.map((e) => e.lng));

  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return { x, y };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-accent" />
          Event Map View
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Geographic distribution of events
        </p>
      </div>

      <div className="relative w-full h-[500px] bg-gradient-to-br from-background/80 to-background p-6">
        {/* Map Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Event Markers */}
        {events.map((event, index) => {
          const { x, y } = getPosition(event.lat, event.lng);
          return (
            <motion.div
              key={event.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05, type: "spring" }}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
              }}
              className="transform -translate-x-1/2 -translate-y-1/2"
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEventClick(event)}
                className={`relative group cursor-pointer`}
              >
                {/* Pulse Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute inset-0 rounded-full ${
                    event.licensed ? "bg-green-500" : "bg-red-500"
                  }`}
                />

                {/* Marker */}
                <div
                  className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    event.licensed
                      ? "bg-green-500/20 border-green-500"
                      : "bg-red-500/20 border-red-500"
                  }`}
                >
                  {event.licensed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-card border border-border rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                    <p className="text-sm font-medium text-white">
                      {event.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.venue}
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-card border-r border-b border-border rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                </div>
              </motion.button>
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 space-y-2">
          <p className="text-sm font-semibold text-white mb-3">Legend</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Licensed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-muted-foreground">Unlicensed</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


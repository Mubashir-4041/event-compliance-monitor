"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
} from "lucide-react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface EventTableProps {
  events: Event[];
  onViewEvent: (event: Event) => void;
  onEditEvent: (event: Event) => void;
}

export default function EventTable({
  events,
  onViewEvent,
  onEditEvent,
}: EventTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");

  const filteredEvents = events.filter((event) => {
    if (filterStatus === "licensed" && !event.licensed) return false;
    if (filterStatus === "unlicensed" && event.licensed) return false;
    if (filterSource !== "all" && event.source !== filterSource) return false;
    return true;
  });

  const sources = Array.from(new Set(events.map((e) => e.source)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Events Overview</h2>
          <span className="text-sm text-muted-foreground">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="licensed">Licensed</SelectItem>
              <SelectItem value="unlicensed">Unlicensed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSource} onValueChange={setFilterSource}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Event
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Venue
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Date & Time
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Source
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Inspector
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <motion.tr
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-border hover:bg-accent/5 transition-colors"
              >
                <td className="p-4">
                  <div>
                    <p className="font-medium text-white">{event.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Users className="w-3 h-3" />
                      {event.capacity} capacity
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-white">{event.venue}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.address.split(",")[0]}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-white">
                        {format(new Date(event.date), "MMM dd, yyyy")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.time}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm px-3 py-1 bg-background/50 rounded-lg text-white">
                    {event.source}
                  </span>
                </td>
                <td className="p-4">
                  {event.licensed ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Licensed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Unlicensed</span>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <p className="text-sm text-white">{event.inspector}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewEvent(event)}
                      className="hover:bg-accent/20"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditEvent(event)}
                      className="hover:bg-accent/20"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}


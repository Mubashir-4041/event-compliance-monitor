"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface EventDetailDrawerProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleLicense: (eventId: number) => void;
}

export default function EventDetailDrawer({
  event,
  isOpen,
  onClose,
  onToggleLicense,
}: EventDetailDrawerProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">{event.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Event Details & Compliance
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-xl"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border-2 ${
                  event.licensed
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {event.licensed ? (
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-400" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {event.licensed ? "Licensed Event" : "Unlicensed Event"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Current compliance status
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onToggleLicense(event.id)}
                    variant={event.licensed ? "outline" : "default"}
                    className={
                      event.licensed
                        ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }
                  >
                    {event.licensed ? "Revoke" : "Approve"}
                  </Button>
                </div>
              </motion.div>

              {/* Event Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-background/50 rounded-2xl p-6 space-y-4"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Event Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="text-white font-medium">
                        {format(new Date(event.date), "MMMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-white font-medium">{event.venue}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="text-white font-medium">
                        {event.capacity} people
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Source</p>
                      <p className="text-white font-medium">{event.source}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Inspector</p>
                      <p className="text-white font-medium">{event.inspector}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Coordinates</p>
                      <p className="text-white font-medium text-xs">
                        {event.lat.toFixed(3)}, {event.lng.toFixed(3)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Notes */}
              {event.notes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-background/50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Notes & Observations
                  </h3>
                  <p className="text-muted-foreground">{event.notes}</p>
                </motion.div>
              )}

              {/* Screenshot */}
              {event.screenshot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-background/50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-accent" />
                    Evidence / Screenshot
                  </h3>
                  <img
                    src={event.screenshot}
                    alt="Event screenshot"
                    className="w-full rounded-xl border border-border"
                  />
                </motion.div>
              )}

              {/* Map Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-background/50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Location Preview
                </h3>
                <div className="w-full h-48 bg-muted/20 rounded-xl flex items-center justify-center border border-border">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-accent mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Map integration available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.lat.toFixed(4)}, {event.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


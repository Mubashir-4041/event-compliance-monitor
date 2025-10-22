"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, Upload, Calendar, MapPin, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@/types/event";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<Event, "id">) => void;
}

interface EventFormData {
  name: string;
  venue: string;
  date: string;
  time: string;
  source: string;
  address: string;
  capacity: number;
  inspector: string;
  notes: string;
  licensed: boolean;
}

export default function AddEventModal({
  isOpen,
  onClose,
  onAddEvent,
}: AddEventModalProps) {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<EventFormData>();

  const onSubmit = (data: EventFormData) => {
    const newEvent: Omit<Event, "id"> = {
      ...data,
      capacity: Number(data.capacity),
      lat: 42.665 + Math.random() * 0.02 - 0.01,
      lng: 14.008 + Math.random() * 0.02 - 0.01,
      screenshot: screenshot ? URL.createObjectURL(screenshot) : null,
    };
    onAddEvent(newEvent);
    reset();
    setScreenshot(null);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Event</DialogTitle>
          <DialogDescription>
            Enter event details for compliance monitoring
          </DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mt-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Event Name *</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="e.g., Jazz Night Live"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue *</Label>
              <Input
                id="venue"
                {...register("venue", { required: true })}
                placeholder="e.g., Blue Bar"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                {...register("address", { required: true })}
                placeholder="e.g., Via Roma 45, Pescara"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  {...register("date", { required: true })}
                  className="bg-background/50 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                {...register("time", { required: true })}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source *</Label>
              <Select onValueChange={(value) => setValue("source", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                {...register("capacity", { required: true })}
                placeholder="e.g., 150"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inspector">Inspector *</Label>
              <Select onValueChange={(value) => setValue("inspector", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select inspector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maria Rossi">Maria Rossi</SelectItem>
                  <SelectItem value="Giovanni Bianchi">
                    Giovanni Bianchi
                  </SelectItem>
                  <SelectItem value="Paolo Verde">Paolo Verde</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensed">License Status *</Label>
              <Select
                onValueChange={(value) => setValue("licensed", value === "true")}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Licensed</SelectItem>
                  <SelectItem value="false">Unlicensed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                {...register("notes")}
                placeholder="Add any additional notes or observations..."
                className="flex min-h-[80px] w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="screenshot">Screenshot / Evidence</Label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="screenshot"
                  className="flex items-center gap-2 px-4 py-2 bg-background/50 border border-input rounded-xl cursor-pointer hover:bg-accent/10 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">
                    {screenshot ? screenshot.name : "Choose file"}
                  </span>
                  <input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {screenshot && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setScreenshot(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              Add Event
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}


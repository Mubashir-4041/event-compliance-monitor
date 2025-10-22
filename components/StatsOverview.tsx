"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Event } from "@/types/event";

interface StatsOverviewProps {
  events: Event[];
}

export default function StatsOverview({ events }: StatsOverviewProps) {
  const totalEvents = events.length;
  const licensedEvents = events.filter((e) => e.licensed).length;
  const unlicensedEvents = events.filter((e) => !e.licensed).length;
  const pendingEvents = events.filter(
    (e) => !e.licensed && e.notes.toLowerCase().includes("pending")
  ).length;

  const stats = [
    {
      label: "Total Events",
      value: totalEvents,
      icon: Calendar,
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
    {
      label: "Licensed",
      value: licensedEvents,
      icon: CheckCircle,
      color: "from-green-500/20 to-green-600/20",
      iconColor: "text-green-400",
      borderColor: "border-green-500/30",
    },
    {
      label: "Unlicensed",
      value: unlicensedEvents,
      icon: XCircle,
      color: "from-red-500/20 to-red-600/20",
      iconColor: "text-red-400",
      borderColor: "border-red-500/30",
    },
    {
      label: "Pending",
      value: pendingEvents,
      icon: Clock,
      color: "from-yellow-500/20 to-yellow-600/20",
      iconColor: "text-yellow-400",
      borderColor: "border-yellow-500/30",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={item}
          whileHover={{ scale: 1.02, y: -4 }}
          className={`bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-2xl p-6 backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 bg-background/50 rounded-xl ${stat.iconColor}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              className="text-3xl font-bold text-white"
            >
              {stat.value}
            </motion.span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}


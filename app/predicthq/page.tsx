"use client";

import { useState, useEffect } from 'react';
import { PredictHQEvent, EventsResponse } from '@/types/predicthq-event';
import { Calendar, MapPin, Music, AlertCircle, Loader2 } from 'lucide-react';

/**
 * PredictHQ Events Page
 * 
 * This page demonstrates integration with PredictHQ API:
 * - Fetches live event data from our backend API route
 * - Displays events in beautiful card layout with dark theme
 * - Shows event details: title, date, venue, location, description
 * - Handles loading and error states gracefully
 */
export default function PredictHQPage() {
  // Step 1: Set up state management for events, loading, and errors
  const [events, setEvents] = useState<PredictHQEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Step 2: Fetch events from our backend API when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  /**
   * Fetches events from our backend API route
   * The backend handles PredictHQ authentication and data transformation
   */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 3: Call our backend API endpoint
      // You can customize these parameters: country, category, limit
      const response = await fetch('/api/events?country=IT&category=concerts&limit=10');
      
      // Step 4: Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch events');
      }

      // Step 5: Parse and store the event data
      const data: EventsResponse = await response.json();
      setEvents(data.events);
      
    } catch (err) {
      // Step 6: Handle any errors that occur during fetching
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Formats ISO date string to human-readable format
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Truncates long text to specified length
   */
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Step 7: Render loading state with spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading events from PredictHQ...</p>
        </div>
      </div>
    );
  }

  // Step 8: Render error state if something went wrong
  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="bg-red-950/30 border border-red-800 rounded-lg p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-400 text-center mb-2">Error Loading Events</h2>
          <p className="text-gray-300 text-center mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Step 9: Render the main events display
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header Section */}
      <div className="bg-gray-900/50 border-b border-gray-800 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Music className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">
              Live Events in Italy
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Powered by PredictHQ API • Showing {events.length} upcoming concerts
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {events.length === 0 ? (
          // Show message if no events found
          <div className="text-center py-20">
            <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">No events found</p>
          </div>
        ) : (
          // Display events in a responsive grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Event Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
                    <Music className="w-3 h-3" />
                    {event.category}
                  </span>
                  {event.rank && (
                    <span className="text-xs text-gray-500">
                      Rank: {event.rank}
                    </span>
                  )}
                </div>

                {/* Event Title */}
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem]">
                  {event.title}
                </h3>

                {/* Event Date */}
                <div className="flex items-start gap-2 mb-3 text-gray-300">
                  <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                  <div className="text-sm">
                    <p className="font-medium">{formatDate(event.start)}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-2 mb-3 text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                  <div className="text-sm">
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-gray-500">{event.location.address}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {truncateText(event.description)}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mt-4 flex items-center justify-between">
                  {event.phq_attendance && (
                    <div className="text-xs text-gray-500">
                      Expected: ~{event.phq_attendance.toLocaleString()} attendees
                    </div>
                  )}
                  {event.labels.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {event.labels.slice(0, 2).map((label, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-700/50 text-gray-400 px-2 py-0.5 rounded"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-10 text-center">
          <button
            onClick={fetchEvents}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            Refresh Events
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm border-t border-gray-800 mt-10">
        <p>Event data provided by PredictHQ API • Updated in real-time</p>
      </div>
    </div>
  );
}


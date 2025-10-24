/**
 * Type definitions for PredictHQ Events
 * These types represent the cleaned/transformed event data from our API
 */

export interface PredictHQEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  category: string;
  labels: string[];
  location: {
    address: string;
    country: string;
  };
  venue: string;
  phq_attendance?: number;
  rank?: number;
}

export interface EventsResponse {
  success: boolean;
  count: number;
  events: PredictHQEvent[];
}


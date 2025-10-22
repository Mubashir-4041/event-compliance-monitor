export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  licensed: boolean;
  source: string;
  lat: number;
  lng: number;
  address: string;
  capacity: number;
  inspector: string;
  notes: string;
  screenshot: string | null;
}


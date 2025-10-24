import { NextResponse } from 'next/server';

/**
 * GET /api/events
 * 
 * Backend API route that fetches events from PredictHQ API
 * Uses the API token stored in environment variable for security
 * Queries for concerts in Italy with a limit of 10 events
 */
export async function GET(request: Request) {
  // Step 1: Retrieve the API token from environment variables
  // This keeps the token secure and out of client-side code
  const apiToken = process.env.PREDICTHQ_API_TOKEN;

  console.log('🔑 API Token present:', !!apiToken);
  console.log('🔑 Token length:', apiToken?.length || 0);

  // Step 2: Validate that the API token exists
  if (!apiToken) {
    console.error('❌ API token is missing!');
    return NextResponse.json(
      { error: 'PredictHQ API token is not configured. Please add PREDICTHQ_API_TOKEN to .env.local' },
      { status: 500 }
    );
  }

  try {
    // Step 3: Parse query parameters from the request URL
    // This allows frontend to customize the search (country, category, limit)
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'IT';
    const category = searchParams.get('category') || 'concerts';
    const limit = searchParams.get('limit') || '10';

    // Step 4: Build the PredictHQ API URL with query parameters
    const predictHQUrl = `https://api.predicthq.com/v1/events?country=${country}&category=${category}&limit=${limit}&sort=start`;

    console.log('🌐 Fetching from:', predictHQUrl);

    // Step 5: Make the API request to PredictHQ with proper authentication
    const response = await fetch(predictHQUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
      },
    });

    console.log('📡 PredictHQ Response Status:', response.status, response.statusText);

    // Step 6: Handle non-successful responses from PredictHQ
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ PredictHQ API Error Status:', response.status);
      console.error('❌ PredictHQ API Error Text:', errorText);
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch events from PredictHQ',
          details: response.statusText,
          status: response.status,
          errorText: errorText
        },
        { status: response.status }
      );
    }

    // Step 7: Parse the JSON response from PredictHQ
    const data = await response.json();

    console.log('✅ Successfully fetched:', data.count, 'events');

    // Step 8: Transform the data into a cleaner format for the frontend
    // Extract only the fields we need for display
    const cleanedEvents = data.results?.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description || 'No description available',
      start: event.start,
      end: event.end,
      category: event.category,
      labels: event.labels || [],
      location: {
        address: event.location?.join(', ') || 'Location not specified',
        country: event.country,
      },
      venue: event.entities?.find((e: any) => e.type === 'venue')?.name || 'Venue not specified',
      phq_attendance: event.phq_attendance,
      rank: event.rank,
    })) || [];

    // Step 9: Return the cleaned data as JSON to the frontend
    return NextResponse.json({
      success: true,
      count: cleanedEvents.length,
      events: cleanedEvents,
    });

  } catch (error) {
    // Step 10: Handle any unexpected errors (network issues, parsing errors, etc.)
    console.error('❌ Unexpected Error:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while fetching events',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}


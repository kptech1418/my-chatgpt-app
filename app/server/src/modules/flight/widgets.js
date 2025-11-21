import fs from "fs";
import { z } from "zod";
import path from 'path';
import { BASE_URL } from "../../../config.js";

const flightSearchResources = [{
  name: 'flight-search-widget',
  outputTemplateUri: 'ui://widget/flight-search.html',
  html: fs.readFileSync(path.join('./src/modules/flight/flight-search-new.html'), 'utf8').trim(),
  js: fs.readFileSync(path.join('./dist', 'flight-search-bundle.js'), 'utf8').trim(),
}];

const flightSearchTools = [{
  name: 'flightSearch',
  title: 'Search Flights',
  description: 'Search for available flights between an origin and destination on a specific date.',
  inputSchema: {
    origin: z.string(),
    destination: z.string(),
    date: z.string(), // ISO date string
  },
  outputSchema: {
    flights: z.array(z.object({
      id: z.number(),
      flightNumber: z.string(),
      origin: z.string(),
      destination: z.string(),
      departureDate: z.string(),
      carrierCode: z.string(),
      price: z.object({ total: z.string() }),
    })),
  },
  outputTemplateUri: 'ui://widget/flight-search.html',
  invoking: 'Searching flights...',
  invoked: 'Flights found',
  implementation: async ({ origin, destination, date }, context) => {
    const response = await fetch(`http://localhost:3000/flightSearch`, {
      method: 'POST',
      body: JSON.stringify({ origin, destination, date }),
      headers: {
        'Authorization': context.requestInfo.headers.authorization,
        'Content-Type': 'application/json',
      }
    });
    console.log('flighttoolauthheaders', context.requestInfo.headers.authorization);
    const matchingFlights = await response.json();
    if (matchingFlights?.length) {
      return {
        structuredContent: {
          flights: matchingFlights
        },
        content: [
          { type: 'text', text: `${matchingFlights.length} flights found` }
        ]
      };
    }
    return {
      structuredContent: { flights: [] },
      content: [
        { type: 'text', text: 'No flights found for the given route and date.' }
      ]
    };
  },
}];

export default {
  resources: [
    ...flightSearchResources
  ],
  tools: [
    ...flightSearchTools
  ]
};

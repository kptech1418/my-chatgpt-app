import React from 'react';
import { useEffect, useState } from "react";
import { useOpenAiGlobal } from "../../hooks/useOpenAiGlobal";

const FlightSearch = () => {
  const toolOutput = window.openai ? useOpenAiGlobal("toolOutput") : null;
  const [flights, setFlights] = useState([]);


  useEffect(() => {
    if (toolOutput?.structuredContent?.flights) {
      setFlights(toolOutput.structuredContent.flights);
    }
  }, [toolOutput]);

  return (
    <div>
      <h1>Flights</h1>
      <p>Get the best flight</p>

      <div>
        {!flights?.length ? (
          <p>Fetching...</p>
        ) : (
          flights.map((flight) => (
            <div key={flight.id}>
              <span>
                {`• from html - ${flight.origin} to ${flight.destination} ${flight.carrierCode} ${flight.departureDate} - ${flight.price.total}`}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FlightSearch;

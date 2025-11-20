import React from 'react';
import { useEffect, useState } from "react";
import { useOpenAiGlobal } from "../../hooks/useOpenAiGlobal";
import './styles.scss';

const FlightSearch = () => {
  const toolOutput = window.openai ? useOpenAiGlobal("toolOutput") : null;
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    console.log('tooloutout reached', toolOutput);
    if (toolOutput?.flights) {
      setFlights(toolOutput.flights);
    }
  }, [toolOutput]);

  const handleOnClick = (id) => () => {
    console.log('click event', window.openai?.openExternal)
    if (window.openai?.openExternal) {
      window.openai.openExternal({ href: `https://www.united.com?flightId=${id}` });
    }
  };

  return (
    <div>
      <h1>Flights</h1>
      <p>Get the best flight</p>

      <div className='carousel'>
        {!flights?.length ? (
          <p>Fetching...</p>
        ) : (
          flights.map((flight) => (
            <div className='flightBlock' key={flight.id}>
              <div>
                {flight.origin} to {flight.destination}
              </div>
              <div>
                Departs on: {flight.departureDate}
              </div>
              <div>
                Carrier: {flight.carrierCode}
              </div>
              <button onClick={handleOnClick(flight.id)}>
                Book for {flight.price.total}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FlightSearch;

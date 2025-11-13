import { flightsData } from "./mock/flightsData.js";

const flightController = {
  flightSearch: async (req, res) => {
    const matchingFlights = flightsData.filter((flight) =>
      flight.origin === req.body.origin && flight.destination === req.body.destination && flight.departureDate === req.body.date
    ).slice(0, 3);
    res.json(matchingFlights);
  },
};

export default flightController;

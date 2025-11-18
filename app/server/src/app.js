import express from "express";
import cors from "cors";
import taskRoutes from './modules/tasks/routes.js';
import flightRoutes from './modules/flight/routes.js';
import mcpRoutes from './modules/mcp/routes.js';
import { validateMcpToken } from "./middleware/authentication.js";

const app = express();
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded data
app.use(cors());  // Enable CORS for cross-origin requests

app.use('/tasks', taskRoutes);
app.use('/flightSearch', flightRoutes);
// app.use('/mcp', validateMcpToken, mcpRoutes);
app.use('/mcp', mcpRoutes);

app.get('/.well-known/oauth-protected-resource', (req, res) => {
  res.json({
    resource: 'https://api.example.com', // your resource identifier
    authorization_servers: ['https://auth.example.com'], // url of your auth server
    scopes_supported: ['read', 'write'],
  });
});

export default app;  // Export the configured app

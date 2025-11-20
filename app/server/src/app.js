import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import path from 'path';
import authRoutes from './modules/authentication/routes.js';
import taskRoutes from './modules/tasks/routes.js';
import flightRoutes from './modules/flight/routes.js';
import mcpRoutes from './modules/mcp/routes.js';
import { validateMcpToken } from "./middleware/authentication.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());  // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cors());  // Enable CORS for cross-origin requests

app.use('/', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/flightSearch', flightRoutes);
// app.use('/mcp', validateMcpToken, mcpRoutes);
app.use('/mcp', mcpRoutes);


export default app;  // Export the configured app

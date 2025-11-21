import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
// import https from 'https';
// import fs from 'fs';
import authRoutes from './src/modules/authentication/routes.js';
import taskRoutes from './src/modules/tasks/routes.js';
import flightRoutes from './src/modules/flight/routes.js';
import mcpRoutes from './src/modules/mcp/routes.js';
import { validateMcpToken } from "./src/modules/authentication/util.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());  // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cors());  // Enable CORS for cross-origin requests

app.use('/', authRoutes);
app.use('/tasks', validateMcpToken, taskRoutes);
app.use('/flightSearch', validateMcpToken, flightRoutes);
app.use('/mcp', validateMcpToken, mcpRoutes);
// app.use('/mcp', mcpRoutes);

// const options = {
//   key: fs.readFileSync('./localhost-key.pem'), // Path to your generated key file
//   cert: fs.readFileSync('./localhost.pem'),    // Path to your generated certificate file
// };

// https.createServer(options, app).listen(3001, () => {
//   console.log('HTTPS server listening on port 3001');
// });

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

export default app;  // Export the configured app

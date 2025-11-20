import https from 'https';
import fs from 'fs';
import app from "./app.js";

const options = {
  key: fs.readFileSync('./localhost-key.pem'), // Path to your generated key file
  cert: fs.readFileSync('./localhost.pem'),    // Path to your generated certificate file
};

https.createServer(options, app).listen(3001, () => {
  console.log('HTTPS server listening on port 3001');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

const express = require('express');
const path = require('path');
const cors = require('cors');
const { LAVALINK_V3, LAVALINK_V4, PORT, API_TIMEOUT } = require('./config');
const {
  makeRestApiCallWithTimeout,
  formatLavalinkStats,
  generateBadge,
  cleanIpAddress,
  getClientIp,
} = require('./utils');

const app = express();
const retryInterval = 60000; // 1 minute

let lavalinkV3Status = 'unknown';
let lavalinkV4Status = 'unknown';

// Function to check Lavalink status and retry if needed
const checkAndRetryLavalink = async (url, password, setStatus) => {
  const maxRetries = 5;
  const retryDelay = 2000; // Initial delay of 2 seconds

  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const stats = await makeRestApiCallWithTimeout(url, { "Authorization": password }, API_TIMEOUT);
      setStatus(stats ? 'online' : 'offline');
      return; // Exit if successful
    } catch (error) {
      console.error(`Error checking Lavalink (attempt ${attempt + 1}): ${error.message}`);
      setStatus('offline');
    }

    attempt++;
    await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt))); // Exponential backoff
  }

  // After maxRetries, set status to offline
  setStatus('offline');
};

// Function to handle periodic checking and retrying
const startLavalinkRetry = () => {
  setInterval(async () => {
    const v3Url = `${LAVALINK_V3.HOST}/stats`;
    const v4Url = `${LAVALINK_V4.HOST}/stats`;

    await checkAndRetryLavalink(v3Url, LAVALINK_V3.PASSWORD, (status) => lavalinkV3Status = status);
    await checkAndRetryLavalink(v4Url, LAVALINK_V4.PASSWORD, (status) => lavalinkV4Status = status);

    console.log(`Lavalink v3 status: ${lavalinkV3Status}`);
    console.log(`Lavalink v4 status: ${lavalinkV4Status}`);
  }, retryInterval);
};

// Start the retry mechanism
startLavalinkRetry();

// Middleware to extract and log client IP
app.use((req, res, next) => {
  const ip = getClientIp(req);
  console.log(`Client IP: ${cleanIpAddress(ip)}`);
  next();
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://status.lavalink.rocks',  // Existing domain
      'https://api.lavalink.rocks',  
      'https://status.lavalink.rocks', // Add more domains here
      'http://node.hengnation.eu:25566'     // Add additional domains as needed
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Include credentials if needed
};
app.use(cors(corsOptions));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fetch plugins information from Lavalink server
const fetchPluginsInfo = async (url, password) => {
  try {
    const response = await makeRestApiCallWithTimeout(url, { "Authorization": password }, API_TIMEOUT);
    return response.plugins || [];
  } catch (error) {
    console.error(`Error fetching plugins info from ${url}: ${error.message}`);
    return [];
  }
};

// Endpoint for Lavalink v3 badge
app.get('/v3/badge/connections', async (req, res) => {
  try {
    const lavalinkV3Url = `${LAVALINK_V3.HOST}/stats`;
    const statsV3 = await makeRestApiCallWithTimeout(lavalinkV3Url, { "Authorization": LAVALINK_V3.PASSWORD }, API_TIMEOUT);
    const players = statsV3 ? statsV3.players.toString() : 'N/A';
    const playingPlayers = statsV3 ? statsV3.playingPlayers.toString() : 'N/A';
    const badgeColor = players === 'N/A' || playingPlayers === 'N/A' ? 'critical' : 'success';
    const badge = generateBadge('v3 Players', players, playingPlayers, badgeColor);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge);
  } catch (error) {
    console.error('Error generating Lavalink v3 badge:', error.message);
    res.status(500).send('Error generating Lavalink v3 badge');
  }
});

// Endpoint for Lavalink v4 badge
app.get('/v4/badge/connections', async (req, res) => {
  try {
    const lavalinkV4Url = `${LAVALINK_V4.HOST}/stats`;
    const statsV4 = await makeRestApiCallWithTimeout(lavalinkV4Url, { "Authorization": LAVALINK_V4.PASSWORD }, API_TIMEOUT);
    const players = statsV4 ? statsV4.players.toString() : 'N/A';
    const playingPlayers = statsV4 ? statsV4.playingPlayers.toString() : 'N/A';
    const badgeColor = players === 'N/A' || playingPlayers === 'N/A' ? 'critical' : 'success';
    const badge = generateBadge('v4 Players', players, playingPlayers, badgeColor);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(badge);
  } catch (error) {
    console.error('Error generating Lavalink v4 badge:', error.message);
    res.status(500).send('Error generating Lavalink v4 badge');
  }
});

const asciiArt = "© 2024 Horizxon Limited All rights reserved.";

// Endpoint for Lavalink v3
app.get('/v3', async (req, res) => {
  try {
    const lavalinkV3Url = `${LAVALINK_V3.HOST}/stats`;
    const infoUrl = `${LAVALINK_V3.HOST}/info`;
    console.log(`Fetching Lavalink v3 stats from ${lavalinkV3Url}`);
    const statsV3 = await makeRestApiCallWithTimeout(lavalinkV3Url, { "Authorization": LAVALINK_V3.PASSWORD }, API_TIMEOUT);
    const plugins = await fetchPluginsInfo(infoUrl, LAVALINK_V3.PASSWORD);
    const isV3Online = lavalinkV3Status === 'online';
    const response = {
      "lavalinkv3": {
        "name": "Horizxon Lavalink v3",
        "online": isV3Online,
        ...formatLavalinkStats(statsV3, isV3Online),
      },
      "plugins": plugins,
      "clientIP": cleanIpAddress(getClientIp(req)),
      "HORIZXON": asciiArt,   // Add ASCII art to the response
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching Lavalink v3 stats:', error.message);
    res.status(500).send('Error fetching Lavalink v3 stats');
  }
});

// Endpoint for Lavalink v4
app.get('/v4', async (req, res) => {
  try {
    const lavalinkV4Url = `${LAVALINK_V4.HOST}/stats`;
    const infoUrl = `${LAVALINK_V4.HOST}/info`;
    console.log(`Fetching Lavalink v4 stats from ${lavalinkV4Url}`);
    const statsV4 = await makeRestApiCallWithTimeout(lavalinkV4Url, { "Authorization": LAVALINK_V4.PASSWORD }, API_TIMEOUT);
    const plugins = await fetchPluginsInfo(infoUrl, LAVALINK_V4.PASSWORD);
    const isV4Online = lavalinkV4Status === 'online';
    const response = {
      "lavalinkv4": {
        "name": "Horizxon Lavalink v4",
        "online": isV4Online,
        "frameStats": isV4Online && statsV4 ? statsV4.frameStats : null,
        ...formatLavalinkStats(statsV4, isV4Online),
      },
      "plugins": plugins,
      "clientIP": cleanIpAddress(getClientIp(req)),
      "HORIZXON": asciiArt,    // Add ASCII art to the response
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching Lavalink v4 stats:', error.message);
    res.status(500).send('Error fetching Lavalink v4 stats');
  }
});

app.listen(PORT, () => {
  console.log(`REST API server listening at http://localhost:${PORT}`);
});

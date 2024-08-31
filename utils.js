const axios = require('axios');
const { makeBadge } = require('badge-maker');

// Function to make a REST API call with a timeout
const makeRestApiCallWithTimeout = async (url, headers, timeout = 5000) => {
  try {
    const response = await axios.get(url, { headers, timeout });
    return response.data;
  } catch (error) {
    console.error(`API call failed: ${error.message} | URL: ${url}`);
    return null; // Return null on failure
  }
};

// Function to format Lavalink stats
const formatLavalinkStats = (stats, isOnline) => {
  if (!stats) {
    return {
      "players": "N/A",
      "playingPlayers": "N/A",
      "uptime": "N/A",
      "memory": { "free": "N/A", "used": "N/A", "allocated": "N/A", "reservable": "N/A" },
      "cpu": { "cores": "N/A", "systemLoad": "N/A", "lavalinkLoad": "N/A" },
      "statusMessage": getStatusMessage(isOnline),
    };
  }

  return {
    "players": isOnline ? stats.players.toString() : "N/A",
    "playingPlayers": isOnline ? stats.playingPlayers.toString() : "N/A",
    "uptime": isOnline ? formatUptime(stats.uptime) : "N/A",
    "memory": isOnline ? formatMemory(stats.memory) : { "free": "N/A", "used": "N/A", "allocated": "N/A", "reservable": "N/A" },
    "cpu": isOnline ? formatCpu(stats.cpu) : { "cores": "N/A", "systemLoad": "N/A", "lavalinkLoad": "N/A" },
    "statusMessage": getStatusMessage(isOnline),
  };
};

// Utility functions
const formatUptime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')} hours, ${String(minutes).padStart(2, '0')} minutes, ${String(seconds).padStart(2, '0')} seconds`;
};

const formatMemory = (memory) => ({
  "free": `${(memory.free / (1024 * 1024)).toFixed(2)} MB`,
  "used": `${(memory.used / (1024 * 1024)).toFixed(2)} MB`,
  "allocated": `${(memory.allocated / (1024 * 1024)).toFixed(2)} MB`,
  "reservable": `${(memory.reservable / (1024 * 1024 * 1024)).toFixed(2)} GB`,
});

const formatCpu = (cpu) => ({
  "cores": cpu.cores.toString(),
  "systemLoad": `${cpu.systemLoad.toFixed(2)}%`,
  "lavalinkLoad": `${cpu.lavalinkLoad.toFixed(2)}%`,
});

const getStatusMessage = (isOnline) => isOnline ? "🟢 Online" : "🔴 Offline";

const generateBadge = (label, players, playingPlayers, color) => {
  const format = {
    label,
    message: `${players} | ${playingPlayers}`,
    color: color || 'success', // Use the provided color or default to 'success'
  };
  return makeBadge(format);
};

const cleanIpAddress = (ip) => ip ? ip.replace(/^::ffff:/, '') : '';

const getClientIp = (req) => req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress;

module.exports = {
  makeRestApiCallWithTimeout,
  formatLavalinkStats,
  generateBadge,
  cleanIpAddress,
  getClientIp,
};


---

# Lavalink-Status

This repository contains a custom Lavalink REST API server and a web interface to monitor Lavalink statistics. The API and the website are powered by Node.js, Express, and a simple frontend in the `public` folder.



## Notes

- **User Friendliness**: This code is tailored to specific needs, so it may be a bit messy and not very user-friendly. It might require tweaks based on your environment.
  
- **Personal Use**: I created this project for my own use and didn't plan to make it public. As a result, it’s a bit messy and not designed to be easily modified. I apologize for any inconvenience—I'm just a beginner.

- **Configuration**: Lavalink API settings are centralized in `config.js` for easy modification or addition of instances.

## Features

- **Lavalink API Integration**: RESTful API endpoints for interacting with multiple Lavalink instances.
- **Web Interface**: Simple frontend for monitoring Lavalink stats like CPU usage, memory, and players.
- **Lavalink Players Badge**: Displays active player count at `http://localhost:3000/version/badge/connections`.
- **Real-Time Updates**: Dynamic web interface updates via JavaScript.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HenGPlayZ/lavalink-status
   cd Lavalink-API
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Lavalink API and Website**:
   ```bash
   node server.js
   ```

### Accessing the Web Interface

Once the server is running, you can access the web interface by navigating to `http://localhost:3000` (or the port you have configured) in your web browser.

## Preview
- Web Interface: https://status.lavalink.rocks
- Rest API: https://api.lavalink.rocks/v4
- Rest API: https://api.lavalink.rocks/v3
- connections badge: ![V4 Badge](https://api.lavalink.rocks/v4/badge/connections)
- connections badge: ![V3 Badge](https://api.lavalink.rocks/v3/badge/connections)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to discuss improvements or report bugs.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more details.
---

<p align="center">Made with ❤️ by HenGPlayZ (Draxler)</p>

---

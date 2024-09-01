
---

# Lavalink-API

This repository contains a custom Lavalink REST API server and a web interface to monitor Lavalink statistics. The API and the website are powered by Node.js, Express, and a simple frontend in the `public` folder.

## Features

- **Lavalink API Integration**: Provides RESTful API endpoints for interacting with multiple Lavalink instances.
- **Web Interface**: A simple frontend to monitor Lavalink stats like CPU usage, memory usage, players, and more.
- **Lavalink Players Badge**: Displays a badge on the web interface showing the number of active Lavalink players. The badge can be accessed at `http://localhost:3000/version/badge/connections`.
- **Real-Time Updates**: Dynamic updates to the web interface using JavaScript.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HenGPlayZ/Lavalink-API
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

## Notes

- **User Friendliness**: Please note that this code is not particularly user-friendly and may be a bit messy. It's tailored to specific use cases and might require some tweaks depending on your environment and needs.
  
- **Personal Use**: I created this project for my specific use only. It's not particularly good, and it's not intended for general use. Please be aware that I'm just a beginner, so the code might not be up to professional standards.

- **Configuration**: The Lavalink API settings and other configurations are centralized in the `config.js` file, making it easier to add or modify Lavalink instances.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to discuss improvements or report bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
---

<p align="center">Made with ❤️ by HenGPlayZ (Draxler)</p>

---

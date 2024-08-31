const fetchLavalinkStats = async (version) => {
    try {
        const response = await fetch(`https://api.lavalink.rocks/${version}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Lavalink ${version} stats:`, error);
        return null; // Return null if there's an error
    }
};

const updateStats = async () => {
    // Fetch and update v3 stats
    const v3Data = await fetchLavalinkStats('v3');
    const v3StatusElement = document.getElementById('v3Status');
    if (v3Data && v3Data.lavalinkv3) {
        const v3 = v3Data.lavalinkv3;
        v3StatusElement.textContent = `status: ${v3.online ? 'Online 🟢' : 'Offline 🔴'}`;
        document.getElementById('v3Players').textContent = `Players: ${v3.players}`;
        document.getElementById('v3PlayingPlayers').textContent = `Playing Players: ${v3.playingPlayers}`;
        document.getElementById('v3Uptime').textContent = `Uptime: ${v3.uptime}`;
        document.getElementById('v3Memory').textContent = `Memory: Free - ${v3.memory.free}, Used - ${v3.memory.used}`;
        document.getElementById('v3Cpu').textContent = `CPU: Cores - ${v3.cpu.cores}, System Load - ${v3.cpu.systemLoad}, Lavalink Load - ${v3.cpu.lavalinkLoad}`;
    } else {
        v3StatusElement.textContent = 'Offline 🔴'; // Default to offline if no data
        document.getElementById('v3Players').textContent = 'Players: N/A';
        document.getElementById('v3PlayingPlayers').textContent = 'Playing Players: N/A';
        document.getElementById('v3Uptime').textContent = 'Uptime: N/A';
        document.getElementById('v3Memory').textContent = 'Memory: Free - N/A, Used - N/A';
        document.getElementById('v3Cpu').textContent = 'CPU: Cores - N/A, System Load - N/A, Lavalink Load - N/A';
    }

    // Fetch and update v4 stats
    const v4Data = await fetchLavalinkStats('v4');
    const v4StatusElement = document.getElementById('v4Status');
    if (v4Data && v4Data.lavalinkv4) {
        const v4 = v4Data.lavalinkv4;
        v4StatusElement.textContent = `status: ${v4.online ? 'Online 🟢' : 'Offline 🔴'}`;
        document.getElementById('v4Players').textContent = `Players: ${v4.players}`;
        document.getElementById('v4PlayingPlayers').textContent = `Playing Players: ${v4.playingPlayers}`;
        document.getElementById('v4Uptime').textContent = `Uptime: ${v4.uptime}`;
        document.getElementById('v4Memory').textContent = `Memory: Free - ${v4.memory.free}, Used - ${v4.memory.used}`;
        document.getElementById('v4Cpu').textContent = `CPU: Cores - ${v4.cpu.cores}, System Load - ${v4.cpu.systemLoad}, Lavalink Load - ${v4.cpu.lavalinkLoad}`;
    } else {
        v4StatusElement.textContent = 'Offline 🔴'; // Default to offline if no data
        document.getElementById('v4Players').textContent = 'Players: N/A';
        document.getElementById('v4PlayingPlayers').textContent = 'Playing Players: N/A';
        document.getElementById('v4Uptime').textContent = 'Uptime: N/A';
        document.getElementById('v4Memory').textContent = 'Memory: Free - N/A, Used - N/A';
        document.getElementById('v4Cpu').textContent = 'CPU: Cores - N/A, System Load - N/A, Lavalink Load - N/A';
    }
};

// Update stats every 10 seconds
setInterval(updateStats, 7000);

// Initial load
updateStats();

document.getElementById('themeSwitch').addEventListener('click', () => {
    const body = document.body;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Toggle between dark and light mode
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        document.getElementById('themeSwitch').setAttribute('aria-label', 'Switch to dark mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        document.getElementById('themeSwitch').setAttribute('aria-label', 'Switch to light mode');
    }
});

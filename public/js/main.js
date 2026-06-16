// --- Smooth Scroll Reveal Animations ---
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach(section => {
    observer.observe(section);
});

// --- Copy IP Feature ---
function copyIP() {
    const ip = document.getElementById('ip-text').innerText;
    navigator.clipboard.writeText(ip).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerText = 'Copied!';
        btn.style.backgroundColor = '#059669';
        
        setTimeout(() => {
            btn.innerText = 'Copy IP';
            btn.style.backgroundColor = '#10b981';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// --- Live Minecraft Server Status Fetch ---
const SERVER_IP = 'play.atlantismc.fun';
const API_URL = `https://api.mcsrvstat.us/2/${SERVER_IP}`;

async function fetchServerStatus() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const statusText = document.getElementById('status-text');
        const onlinePlayers = document.getElementById('online-players');
        const maxPlayers = document.getElementById('max-players');
        const pulseDot = document.querySelector('.pulse-dot');

        if (data.online) {
            statusText.innerText = 'Online';
            statusText.style.color = '#10b981';
            onlinePlayers.innerText = data.players.online;
            maxPlayers.innerText = data.players.max;
        } else {
            statusText.innerText = 'Offline';
            statusText.style.color = '#ef4444';
            pulseDot.classList.add('offline');
            onlinePlayers.innerText = '0';
            maxPlayers.innerText = '0';
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        document.getElementById('status-text').innerText = 'Status Unavailable';
        document.querySelector('.pulse-dot').classList.add('offline');
    }
}

// Fetch status immediately on load, then every 60 seconds
document.addEventListener('DOMContentLoaded', () => {
    fetchServerStatus();
    setInterval(fetchServerStatus, 60000);
});


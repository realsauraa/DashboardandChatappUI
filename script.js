document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded - script.js active');
    
    // Check if we're on dashboard page
    if (!document.querySelector('.dashboard-container')) {
        console.log('Not on dashboard page, skipping dashboard JS');
        return;
    }
    
    // Elements
    const playBtns = document.querySelectorAll('.play-btn');
    const trackItems = document.querySelectorAll('.track-item');
    const floatingPlayer = document.getElementById('floatingPlayer');
    const currentTrackSpan = document.getElementById('currentTrack');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentPlayingTrack = null;
    let typingTimeout;
    
    // Track play functionality
    playBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const trackItem = btn.closest('.track-item');
            const trackName = trackItem.querySelector('strong').textContent;
            const visualizer = trackItem.querySelector('.visualizer');
            
            // Stop current track
            trackItems.forEach(item => {
                item.classList.remove('playing');
                item.querySelector('.play-btn').innerHTML = '<i class="fas fa-play-circle"></i>';
            });
            
            if (currentPlayingTrack === trackItem) {
                // Stop current
                trackItem.classList.remove('playing');
                btn.innerHTML = '<i class="fas fa-play-circle"></i>';
                floatingPlayer.classList.remove('active');
                currentPlayingTrack = null;
            } else {
                // Play new
                trackItem.classList.add('playing');
                btn.innerHTML = '<i class="fas fa-pause-circle"></i>';
                if (visualizer) visualizer.style.animationPlayState = 'running';
                floatingPlayer.classList.add('active');
                currentTrackSpan.textContent = trackName;
                currentPlayingTrack = trackItem;
            }
        });
    });
    
    // Track item click (play entire track)
    trackItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.track-menu')) {
                item.querySelector('.play-btn').click();
            }
        });
    });
    
    // Floating player controls
    if (floatingPlayer) {
        floatingPlayer.querySelectorAll('i').forEach(icon => {
            icon.addEventListener('click', () => {
                if (currentPlayingTrack) {
                    currentPlayingTrack.querySelector('.play-btn').click();
                }
            });
        });
    }
    
    // Chat functionality (adapted to dashboard HTML)
    function addMessage(content, type = 'received') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type} fade-in`;
        messageDiv.innerHTML = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTyping() {
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            typingIndicator.classList.add('active');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    function hideTyping() {
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
            typingIndicator.classList.remove('active');
        }
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function generateBotResponse(message) {
        const responses = {
            'hello': 'Hey! Great to see you here ✨ What can I help with?',
            'hi': 'Hi there! Ready to create?',
            'help': 'Try “new track” or “analytics report” - or just chat!',
            'new': 'Launching Studio... 🎵✨',
            default: 'That sounds interesting! Tell me more about your project.'
        };
        const lower = message.toLowerCase();
        for (let key in responses) {
            if (lower.includes(key)) return responses[key];
        }
        return responses.default;
    }
    
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // User message
        const userMsg = `
            <div class="message sent fade-in">
                <div class="message-bubble">
                    <div class="message-header">
                        <strong>You</strong>
                        <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p>${escapeHtml(message)}</p>
                </div>
            </div>
        `;
        addMessage(userMsg, 'sent');
        messageInput.value = '';
        
        // Bot response
        showTyping();
        setTimeout(() => {
            hideTyping();
            const botMsg = `
                <div class="message received fade-in">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="user">
                    <div class="message-bubble">
                        <div class="message-header">
                            <strong>Studio Bot</strong>
                            <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p>${generateBotResponse(message)}</p>
                        <div class="message-reactions">
                            <i class="far fa-thumbs-up"></i>
                        </div>
                    </div>
                </div>
            `;
            addMessage(botMsg, 'received');
        }, 1200);
    }
    
    if (sendBtn && messageInput) {
        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Nav interactions
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });
    });
    
    // Initial visualizer pause
    document.querySelectorAll('.visualizer').forEach(viz => {
        viz.style.animationPlayState = 'paused';
    });
    
    // Page interactions
    document.querySelector('.create-btn')?.addEventListener('click', () => {
        alert('🎵 New Creation Studio launching... (feature coming soon)');
    });
    
    console.log('Dashboard JS initialized: tracks, chat, nav ready');
});

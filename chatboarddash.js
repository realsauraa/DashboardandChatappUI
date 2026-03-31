document.addEventListener('DOMContentLoaded', () => {
    // Chat functionality
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    
    let typingTimeout;
    
    // Check if all required elements exist
    if (!chatMessages || !messageInput || !sendBtn) {
        console.error('Required DOM elements not found');
        return;
    }
    
    // Function to add a message to the chat
    function addMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <strong>${isUser ? 'You' : 'Bot'}:</strong>
                <p>${escapeHtml(message)}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Function to show typing indicator
    function showTyping() {
        if (typingIndicator) {
            typingIndicator.style.display = 'block';
            scrollToBottom();
        }
    }
    
    // Function to hide typing indicator
    function hideTyping() {
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    }
    
    // Function to scroll to bottom of chat
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Function to handle sending messages
    function sendMessage() {
        const message = messageInput.value.trim();
        
        if (!message) {
            return; // Don't send empty messages
        }
        
        // Add user message to chat
        addMessage(message, true);
        
        // Clear input field
        messageInput.value = '';
        
        // Show typing indicator
        showTyping();
        
        // Simulate bot response (replace with your actual API call)
        setTimeout(() => {
            hideTyping();
            
            // Generate bot response (replace with your actual bot logic)
            const botResponse = generateBotResponse(message);
            addMessage(botResponse, false);
        }, 1000);
    }
    
    // Function to generate bot responses (example)
    function generateBotResponse(userMessage) {
        // Simple response logic - replace with your actual bot API
        const responses = {
            'hello': 'Hi there! How can I help you today?',
            'hi': 'Hello! What can I do for you?',
            'how are you': 'I\'m doing great! Thanks for asking.',
            'bye': 'Goodbye! Have a great day!'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        return responses[lowerMessage] || 'I\'m not sure how to respond to that. Can you please rephrase?';
    }
    
    // Function to escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Function to handle typing indicator
    function handleTyping() {
        // Clear existing timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        
        // Show typing indicator (optional - if you want to show user is typing)
        // You can implement this based on your requirements
        
        // Set timeout to hide typing after user stops typing
        typingTimeout = setTimeout(() => {
            // Hide user typing indicator if needed
        }, 1000);
    }
    
    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Optional: Add typing event listener
    messageInput.addEventListener('input', handleTyping);
    
    // Optional: Focus on input field on page load
    messageInput.focus();
}); // Close the DOMContentLoaded event listener
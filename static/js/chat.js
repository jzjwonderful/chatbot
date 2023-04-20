const messagesContainer = document.querySelector('.chat-messages');
const messageInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');

sendButton.addEventListener('click', () => {
  const messageText = messageInput.value.trim();

  if (messageText) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'user');
    messageElement.innerText = messageText;
    messagesContainer.appendChild(messageElement);
    messageInput.value = '';
    // post message to server
    fetch('/messages', {
      headers: {
        'Content-Type': 'application/json',
        "accept": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({ message: messageText })
    }
    ).then(response => {
      response.json().then(data => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot');
        messageElement.innerText ='bot:' + data.message;
        messagesContainer.appendChild(messageElement);
      });
    });
  }
});

messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});

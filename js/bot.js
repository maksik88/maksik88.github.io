let userCounter = 0;
let aiCounter = 0;

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  appendMessage('Вы', userInput);
  userCounter++;

  const apiKey = 'MY_NUM_PASS'; // Replace with your actual OpenAI API key
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInput },
      ],
    }),
  })
  .then(response => response.json())
  .then(data => {
    const aiResponse = data.choices[0].message.content.trim();
    appendMessage('Sofi', aiResponse);
    aiCounter++;
    updateCounters();
  })
  .catch(error => {
    console.error('Error sending request to GPT-3:', error);
    console.error('Response data:', error.response ? error.response.data : 'N/A');
    appendMessage('Sofi', 'Error processing request');
    aiCounter++;
    updateCounters();
  });
}

// Rest of your code...

function appendMessage(sender, message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.className = sender.toLowerCase() === 'user' ? 'user-message' : 'ai-message';
  messageElement.textContent = `${sender}: ${message}`;
  chatMessages.appendChild(messageElement);

  // Прокрутка вниз для отображения последнего сообщения
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateCounters() {
  document.getElementById('user-counter').textContent = `Сообщений от пользователя: ${userCounter}`;
  document.getElementById('ai-counter').textContent = `Сообщений от Sofi: ${aiCounter}`;
}

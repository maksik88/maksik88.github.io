let userCounter = 0;
let aiCounter = 0;

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  appendMessage('Вы', userInput);
  userCounter++;

  // Замените 'YOUR_API_KEY' на ваш ключ API от OpenAI
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  axios.post(apiUrl, {
    prompt: userInput,
    max_tokens: 150,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  })
  .then(response => {
    const aiResponse = response.data.choices[0].text.trim();
    appendMessage('Sofiya', aiResponse);
    aiCounter++;
    updateCounters();
  })
  .catch(error => {
    console.error('Error sending GPT-3 request:', error);
    appendMessage('Sofiya', 'Error processing request');
    aiCounter++;
    updateCounters();
  });
}

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
  document.getElementById('user-counter').textContent = `User Messages: ${userCounter}`;
  document.getElementById('ai-counter').textContent = `AI Messages: ${aiCounter}`;
}
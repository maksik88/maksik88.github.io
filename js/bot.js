let userCounter = 0;
let aiCounter = 0;

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  appendMessage('User', userInput);
  userCounter++;

  const apiKey = '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'; // Замените на ваш настоящий ключ API OpenAI
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  axios.post(apiUrl, {
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userInput },
    ],
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  })
  .then(response => {
    const aiResponse = response.data.choices[0].message.content.trim();
    appendMessage('Sofi', aiResponse);
    aiCounter++;
    updateCounters();
  })
  .catch(error => {
    console.error('Ошибка отправки запроса к GPT-3:', error);
    console.error('Данные ответа:', error.response ? error.response.data : 'Н/Д');
    appendMessage('Sofi', 'Ошибка обработки запроса');
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
  document.getElementById('user-counter').textContent = `Сообщений от пользователя: ${userCounter}`;
  document.getElementById('ai-counter').textContent = `Сообщений от Sofi: ${aiCounter}`;
}

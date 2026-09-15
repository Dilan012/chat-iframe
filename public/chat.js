const form = document.getElementById('chat-form');
const input = document.getElementById('chat-text');
const messages = document.getElementById('messages');

function addMessage(text, sender) {
  const row = document.createElement('div');
  row.className = `msg-row ${sender}`;

  const bubble = document.createElement('div');
  bubble.className = `msg ${sender}`;
  bubble.textContent = text;

  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
  return row;
}

function addTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'msg-row bot';

  const bubble = document.createElement('div');
  bubble.className = 'msg bot typing';
  bubble.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
  return row;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  const typingRow = addTypingIndicator();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    typingRow.remove();

    if (!res.ok) {
      addMessage(data.error || 'Something went wrong.', 'bot');
      return;
    }

    addMessage(data.reply, 'bot');
  } catch (err) {
    typingRow.remove();
    addMessage('Error contacting server.', 'bot');
  }
});

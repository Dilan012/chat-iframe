const form = document.getElementById('chat-form');
const input = document.getElementById('chat-text');
const messages = document.getElementById('messages');

function addMessage(text, sender) {
  const el = document.createElement('div');
  el.className = `msg ${sender}`;
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  return el;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  const typingEl = addMessage('Typing...', 'bot typing');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    typingEl.remove();

    if (!res.ok) {
      addMessage(data.error || 'Something went wrong.', 'bot');
      return;
    }

    addMessage(data.reply, 'bot');
  } catch (err) {
    typingEl.remove();
    addMessage('Error contacting server.', 'bot');
  }
});

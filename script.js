const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot typing';
  typingDiv.id = 'typing';
  typingDiv.textContent = 'MindCompanion is typing...';
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function getBotResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('suicide') || msg.includes('end it') || msg.includes('kill myself') || msg.includes('no reason to live')) {
    return "🚨 Please know you are not alone and your life matters deeply. Help is available RIGHT NOW. In the US, call or text 988 (Suicide & Crisis Lifeline). Elsewhere, search for your local crisis hotline. Please reach out immediately — someone wants to help you.";
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hi there 💙 I'm really glad you're here. What's on your mind today?";
  }

  if (msg.includes('sad') || msg.includes('depressed') || msg.includes('down') || msg.includes('cry')) {
    return "I'm so sorry you're feeling this way. It's okay to feel sad sometimes. Your feelings are valid. Would you like to share more? Or try a small step like drinking water or stepping outside for fresh air?";
  }

  if (msg.includes('anxious') || msg.includes('anxiety') || msg.includes('panic') || msg.includes('worry')) {
    return "Anxiety can feel so heavy. Let's try a quick grounding exercise together: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. You're safe right now. 💙";
  }

  if (msg.includes('stress') || msg.includes('overwhelmed') || msg.includes('tired')) {
    return "You've been carrying a lot. Take a slow breath with me: In for 4... hold for 4... out for 6. You're doing better than you think. What’s been weighing on you?";
  }

  if (msg.includes('thank')) {
    return "You're so welcome. I'm always here when you need to talk. Take good care of yourself today 🌱";
  }

  return "I'm here and truly listening. Tell me more about how you're feeling — no pressure, just whenever you're ready.";
}

async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  showTyping();

  // Simulate thinking time for natural feel
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

  removeTyping();
  const response = getBotResponse(text);
  addMessage(response, 'bot');
}

sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
});
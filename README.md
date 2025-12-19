# mindcompanion
# MindCompanion 🌿  A beautiful, frontend-only mental health companion chatbot designed to provide gentle emotional support and coping tips.  ## Description  MindCompanion is a simple yet calming web app that acts as a supportive listener. It uses rule-based responses to offer empathetic replies for common feelings like stress, anxiety, 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MindCompanion 🌿</title>

  <!-- Bootstrap 5 + Minty Theme (calming colors) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/minty/bootstrap.min.css" rel="stylesheet"/>

  <!-- Custom CSS -->
  <link rel="stylesheet" href="style.css"/>

  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>

  <div class="container-fluid p-0">
    <div class="chat-container">
      <div class="chat-header">
        <h3 class="mb-1">MindCompanion 🌿</h3>
        <p class="mb-0">Your gentle mental health companion</p>
      </div>

      <div class="chat-messages d-flex flex-column" id="chatMessages">
        <div class="message bot">
          Hello! I'm MindCompanion. I'm here to listen without judgment and offer gentle support. How are you feeling today?
        </div>
      </div>

      <div class="chat-input">
        <div class="input-group">
          <input type="text" class="form-control" id="userInput" placeholder="Share how you're feeling..." autocomplete="off"/>
          <button class="btn btn-primary" id="sendBtn">Send</button>
        </div>
      </div>
    </div>

    <div class="disclaimer">
      <strong>Important:</strong> I am not a therapist or crisis service. 
      If you're in crisis, please contact a professional immediately (e.g., call/text 988 in the US).
    </div>
  </div>

  <!-- JavaScript -->
  <script src="script.js"></script>
</body>
</html>body {
  background: linear-gradient(135deg, #e0f7fa, #f1f8e9);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.chat-container {
  max-width: 800px;
  margin: 20px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: #00bcd4;
  color: white;
  padding: 20px;
  text-align: center;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8fdfd;
}

.message {
  max-width: 80%;
  margin-bottom: 15px;
  padding: 12px 18px;
  border-radius: 20px;
  line-height: 1.6;
  animation: fadeIn 0.5s ease;
}

.bot {
  align-self: flex-start;
  background: #e0f7fa;
  border-bottom-left-radius: 5px;
  color: #006064;
}

.user {
  align-self: flex-end;
  background: #00bcd4;
  color: white;
  border-bottom-right-radius: 5px;
}

.typing {
  font-style: italic;
  color: #666;
}

.chat-input {
  padding: 15px;
  background: white;
  border-top: 1px solid #eee;
}

#userInput {
  border-radius: 30px;
  border: 1px solid #ced4da;
}

#sendBtn {
  border-radius: 50px;
  padding: 10px 25px;
  font-weight: 600;
}

.disclaimer {
  text-align: center;
  margin: 20px;
  color: #d32f2f;
  font-size: 0.9em;
  font-weight: 500;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}const chatMessages = document.getElementById('chatMessages');
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

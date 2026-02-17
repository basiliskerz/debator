// ===============================
// CONFIG
// ===============================

// n8n POST webhook (production URL, not test)
const N8N_POST_WEBHOOK =
  "https://launa-hierogrammatical-recurrently.ngrok-free.dev/webhook/debate-topic";


// ===============================
// SEND DATA TO N8N
// ===============================

async function sendTopicToN8N(topic) {
  try {
    const response = await fetch(N8N_POST_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic: topic,
        sentAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ n8n responded:", data);

  } catch (error) {
    console.error("❌ Failed to send topic:", error);
  }
}


// ===============================
// INPUT HANDLING
// ===============================

function handleTopicInput(event) {
  if (event.key !== "Enter") return;

  const input = event.target;
  const topic = input.value.trim();

  if (!topic) return;

  console.log("📤 Sending topic:", topic);
  sendTopicToN8N(topic);

  input.value = ""; // clear after send
}


// ===============================
// INIT (attach listener safely)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("topicInput");

  if (!input) {
    console.error("❌ No input element with id='topicInput' found");
    return;
  }

  input.addEventListener("keydown", handleTopicInput);
});

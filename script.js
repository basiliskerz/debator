const WEBHOOK_URL = "https://launa-hierogrammatical-recurrently.ngrok-free.dev/webhook/debate-topic";

async function startDebate() {
  const topicInput = document.getElementById("topicInput");
  const topic = topicInput.value.trim();

  if (!topic) {
    alert("Please enter a debate topic.");
    return;
  }

  // Clear previous text
  document.getElementById("aiA").textContent = "Thinking...";
  document.getElementById("aiB").textContent = "Thinking...";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic: topic
      })
    });

    if (!response.ok) {
      throw new Error("Webhook request failed");
    }

    const data = await response.json();

    /*
      EXPECTED n8n RESPONSE FORMAT (example):

      {
        "aiA": "Argument from AI A...",
        "aiB": "Argument from AI B..."
      }
    */

    document.getElementById("aiA").textContent =
      data.aiA || "No response from AI A";

    document.getElementById("aiB").textContent =
      data.aiB || "No response from AI B";

  } catch (error) {
    console.error(error);
    document.getElementById("aiA").textContent = "Error contacting n8n.";
    document.getElementById("aiB").textContent = "Error contacting n8n.";
  }
}

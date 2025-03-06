const apiKey = "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";
const apiURL = "https://api.groq.com/openai/v1/chat/completions";
let userInputval = document.getElementById("chat_input");
let chatBox = document.querySelector(".chat_window");
let first = document.querySelector(".onstart")
let add = document.querySelector("#header-add-btn");


add.addEventListener('click' , ()=>{
    location.reload();
})

document.querySelector("#bottom-bar-add-btn").addEventListener('click' , ()=>{
    location.reload();
})


const chat_gen = (w, text, s) => {
    first.style.display = "none"
    document.querySelector(".chat_window").style.justifyContent = "flex-start";
  let chat_holder = document.createElement("div");
  chat_holder.className = `chat_holder ${s}`;
  let chat_text = document.createElement("p");
  let iii = document.createElement("i");
  iii.className = "iii"
  iii.innerText = w;

  chat_text.className = "chat_text";
  chat_text.innerText = text;
  chat_holder.appendChild(iii);
  chat_holder.appendChild(chat_text);

  return chatBox.appendChild(chat_holder);
};

async function sendMessage() {
  let userInput = userInputval.value;
  if (userInput.trim() == "") return;

  chat_gen("User : ", userInput, "user");
  document.getElementById("chat_input").value = "";

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: userInput }],
    }),
  });

  const data = await response.json();
  console.log(data);
  const reply = data.choices[0]?.message?.content || "Something went wrong!";
  chat_gen("Kaelu : ", reply, "chatbot");
  chatBox.scrollTop = chatBox.scrollHeight;
}

const send_btn = document.getElementById("bottom-bar-send-btn");

send_btn.addEventListener("click", sendMessage);

userInputval.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

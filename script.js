const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const workModeBtn = document.getElementById("workModeBtn");

const modeTitle = document.getElementById("modeTitle");
const modeText = document.getElementById("modeText");
const modeDot = document.getElementById("modeDot");

let workMode = false;
let userName = "Usuário";

/* =========================
   UI
========================= */

function addMessage(text, sender = "bot") {

    const msg = document.createElement("div");
    msg.classList.add("message", sender);

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    avatar.innerText = sender === "bot"
        ? "A"
        : userName[0].toUpperCase();

    const content = document.createElement("div");
    content.classList.add("message-content");

    const name = document.createElement("span");
    name.classList.add("message-name");

    name.innerText = sender === "bot"
        ? (workMode ? "Aringe Trabalho" : "Aringe")
        : userName;

    const p = document.createElement("p");
    p.innerText = text;

    content.appendChild(name);
    content.appendChild(p);

    msg.appendChild(avatar);
    msg.appendChild(content);

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* =========================
   ENVIAR PRA IA (FLASK)
========================= */

async function sendMessage() {

    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    try {

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await res.json();

        addMessage(data.response, "bot");

    } catch (err) {

        addMessage("Erro ao conectar com a IA 😭", "bot");
    }
}

/* =========================
   EVENTS
========================= */

sendButton.onclick = sendMessage;

userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});

/* =========================
   MODE
========================= */

workModeBtn.onclick = () => {

    workMode = !workMode;

    if (workMode) {

        modeTitle.innerText = "Modo Trabalho";
        modeText.innerText = "Rígido";
        modeDot.style.background = "red";

        addMessage("Modo Trabalho ativado 😎", "bot");

    } else {

        modeTitle.innerText = "Modo Normal";
        modeText.innerText = "Educado e inteligente";
        modeDot.style.background = "#7dff8d";

        addMessage("Modo Normal ativado 😊", "bot");
    }
};

/* START */
window.onload = () => {
    addMessage("Olá Usuário 👋 Seja bem-vindo(a)", "bot");
};

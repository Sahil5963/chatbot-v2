const ENDPOINT = "https://chatbot-v2-henna.vercel.app";

const scriptTag = document.getElementById("yourgpt-chatbot");
const config = JSON.parse(scriptTag.getAttribute("data-config"));

window.YOURGPT_PROJECT_UID = config.YOURGPT_CHATBOT_UID;
window.YOURGPT_WIDGET_UID = config.YOURGPT_WIDGET_UID;

const root = document.createElement("div");
root.style.zIndex = 99999;
root.style.position = "fixed";
root.id = "yourgpt_root";
const gptSc = document.createElement("script");

gptSc.src = ENDPOINT + "/chatbot.js";

appendCSSFileToHead(ENDPOINT + "/chatbot.css");

document.body.appendChild(root);
document.body.appendChild(gptSc);

// HELPERS
function appendCSSFileToHead(cssFilePath) {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = cssFilePath;
  document.head.appendChild(linkElement);
}

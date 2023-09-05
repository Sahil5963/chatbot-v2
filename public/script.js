const scriptTag = document.getElementById("yourgpt-chatbot");
const config = JSON.parse(scriptTag.getAttribute("data-config"));

window.YOURGPT_PROJECT_UID = config.YOURGPT_CHATBOT_UID;
window.YOURGPT_WIDGET_UID = config.YOURGPT_WIDGET_UID;

const root = document.createElement("div");
root.style.zIndex = 99999;
root.style.position = "fixed";
root.id = "yourgpt_root";
const gptSc = document.createElement("script");

gptSc.src = "http://localhost:4173/chatbot.js";

appendCSSFileToHead("http://localhost:4173/chatbot.css");

document.body.appendChild(root);
document.body.appendChild(gptSc);

function appendCSSFileToHead(cssFilePath) {
  // Create a link element for the CSS file
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.type = "text/css";
  linkElement.href = cssFilePath;

  // Append the link element to the head of the document
  document.head.appendChild(linkElement);
}

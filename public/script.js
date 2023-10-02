const ENDPOINT = "https://chatbot-v2-henna.vercel.app";

const scriptTag = document.getElementById("yourgpt-chatbot");

let scriptPath = "";

//OLD SCRIPT
const config = JSON.parse(scriptTag.getAttribute("data-config"));
if (config) {
  window.YOURGPT_WIDGET_UID = config.YOURGPT_WIDGET_UID;
  window.YOURGPT_PROJECT_UID = config.YOURGPT_CHATBOT_UID;
  scriptPath = ENDPOINT + "/old/chatbot.back.js";
} else {
  //NEW SCRIPT
  const widgetCode = JSON.parse(scriptTag.getAttribute("widget"));
  if (widgetCode) {
    window.YOURGPT_WIDGET_UID = widgetCode;
    scriptPath = ENDPOINT + "/chatbot.js";
    appendCSSFileToHead(ENDPOINT + "/chatbot.css");
  }
}

const root = document.createElement("div");
root.style.zIndex = 99999;
root.style.position = "fixed";
root.id = "yourgpt_root";
const gptSc = document.createElement("script");

gptSc.src = scriptPath;

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

//EXAMPLE
{
  /* <script src="https://widget.yourgpt.ai/script.js" id="yourgpt-chatbot" widget="eb2a98b4-0809-4b5a-9134-bef1166af8fb"></script>; */
}

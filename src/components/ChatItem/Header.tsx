import ChatbotLogo from "components/logos/Chatbot";
import { useChatbot } from "context/ChatbotContext";
import { MessageD } from "types/message";
import { THEME } from "utils/constants/ui";
import { BiSolidUserCircle } from "react-icons/bi";

export default function Header({ message }: { message: MessageD }) {
  const { chatbotSettings } = useChatbot();

  const renderHead = () => {
    switch (message.from) {
      case "user":
        return <div className="ygpt-text-xs ygpt-font-medium ygpt-text-gray-700 ygpt-text-right">You</div>;
      case "assistant":
        return (
          <div className="ygpt-flex ygpt-gap-2 ygpt-items-center">
            <div
              className="ygpt-rounded-full ygpt-h-[30px] ygpt-flex ygpt-items-center ygpt-justify-center ygpt-aspect-square "
              style={{ background: chatbotSettings?.logo ? "transparent" : chatbotSettings?.widget_color || THEME.primaryColor, color: chatbotSettings?.widget_text_color || THEME.textOnPrimary }}
            >
              {chatbotSettings?.logo ? <img src={chatbotSettings.logo} className="ygpt-h-full ygpt-w-full ygpt-object-cover" /> : <ChatbotLogo size={20} />}
            </div>
            <div className="ygpt-bg-gray-100 ygpt-rounded-md ygpt-text-xs ygpt-p-[4px] ygpt-text-zinc-600">AI BOT</div>
          </div>
        );
      case "operator":
        return (
          <div className="ygpt-flex ygpt-gap-1 ygpt-items-center ">
            <div className="ygpt-h-[30px] ygpt-aspect-square ygpt-items-center ygpt-flex ygpt-justify-center ygpt-text-gray-600 ygpt-bg-gray-200 ygpt-rounded-full ygpt-overflow-hidden">
              {message.operator?.profile_pic ? <img src={message.operator?.profile_pic} className="ygpt-h-full ygpt-w-full ygpt-object-cover" /> : <BiSolidUserCircle size={24} />}
            </div>
            <div className="ygpt-flex ygpt-flex-col">
              <div className="ygpt-text-sm ygpt-font-medium">{message.operator?.name || message.operator?.first_name || "Human Operator"}</div>
              {/* <div className="y ygpt-text-xs ygpt-text-zinc-600">Operator</div> */}
            </div>
          </div>
        );
      default:
        return <></>;
    }
  };

  return <div className="ygpt-mb-[6px]">{renderHead()}</div>;
}

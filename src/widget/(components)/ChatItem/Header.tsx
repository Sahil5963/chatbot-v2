import { BiSolidUserCircle } from "react-icons/bi";
import { useWidget } from "../../context/WidgetContext";
import { RenderMessageItem } from "../../types/message";
import ChatbotLogo from "../logos/Chatbot";
import { YOUR_GPT_LAYOUT } from "../../utils/constants";

export default function Header({ message }: { message: RenderMessageItem }) {
  const { setting, layout } = useWidget();
  const renderHead = () => {
    switch (message.from) {
      case "user":
        return <div className="ygpt-text-xs ygpt-font-medium ygpt-text-gray-700 ygpt-text-right">You</div>;
      case "assistant":
        return (
          <div className="ygpt-flex ygpt-gap-2 ygpt-items-center">
            <div
              className="ygpt-rounded-full ygpt-h-[30px] ygpt-flex ygpt-items-center ygpt-justify-center ygpt-aspect-square "
              style={{ background: setting?.logo ? "transparent" : layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary, color: layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary }}
            >
              {setting?.logo ? <img src={setting.logo} className="ygpt-h-full ygpt-w-full ygpt-object-cover" /> : <ChatbotLogo size={20} />}
            </div>
            <div className="ygpt-bg-gray-100 ygpt-rounded-md ygpt-text-xs ygpt-p-[4px] ygpt-text-zinc-600">AI BOT</div>
          </div>
        );
      case "operator":
        return (
          <div className="ygpt-flex ygpt-gap-1 ygpt-items-center ">
            <div className="ygpt-h-[30px] ygpt-aspect-square ygpt-items-center ygpt-flex ygpt-justify-center ygpt-text-gray-600 ygpt-bg-gray-200 ygpt-rounded-full ygpt-overflow-hidden">
              {message.user?.pic ? <img src={message.user.pic} className="ygpt-h-full ygpt-w-full ygpt-object-cover" /> : <BiSolidUserCircle size={24} />}
            </div>
            <div className="ygpt-flex ygpt-flex-col">
              <div className="ygpt-text-sm ygpt-font-medium">{message.user?.name || message.user?.fName || "Human Operator"}</div>
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

import { RiDeleteBin6Fill, RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useIntl } from "react-intl";
import { useChatbot } from "../../../context/ChatbotContext";
import { useWidget } from "../../../context/WidgetContext";
import ChatbotLogo from "../../../(components)/logos/Chatbot";
import { YOUR_GPT_LAYOUT } from "../../../utils/constants";
import { useCompactChatbot } from "../../context/CompactContext";
import { IconBtn } from "../../../(components)/styles";

export default function Header() {
  const { setExpanded, expanded, setChatbotPopup } = useChatbot();
  const { clearSession } = useCompactChatbot();
  const { layout, setting } = useWidget();
  // const [languagePopup, setLanguagePopup] = useState(false);
  const intl = useIntl();

  return (
    <div className="ygpt-px-2 ygpt-py-3 ygpt-flex ygpt-justify-between ygpt-items-center" style={{ background: layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary, color: layout?.colors.textOnPrimary }}>
      {/* LEFT  */}
      <div className="left ygpt-flex ygpt-gap-2 ygpt-items-center">
        <button onClick={() => setExpanded((s) => !s)} className="ygpts-expander ygpt-opacity-50 hover:ygpt-opacity-100 ygpt-transition-all">
          {expanded ? <RiExpandRightLine size={20} /> : <RiExpandLeftLine size={20} />}
        </button>

        <div className="avagar">{setting?.logo ? <img src={setting?.logo} alt="Avatar" className="ygpt-h-[32px] ygpt-aspect-square" /> : <ChatbotLogo />}</div>

        <div className="content">
          <h4 className="ygpt-font-medium ">{setting?.name || "YourGPT"}</h4>
          {intl.formatMessage({ id: "home.heading", defaultMessage: "Hello" })}
        </div>
      </div>

      {/* RIGHT  */}
      <div className="ygpt-flex">
        {/* <div className="ygpt-relative">
          <Btn onClick={() => setLanguagePopup((s) => !s)} className="" bg={chatbotSettings?.widget_color || YOUR_GPT_LAYOUT.colors.primary} color={chatbotSettings?.widget_text_color || YOUR_GPT_LAYOUT.colors.textOnPrimary}>
            <RiTranslate2 size={20} />
          </Btn>
          <LanguagePopup open={languagePopup} onClose={() => {}} />
        </div> */}
        <IconBtn onClick={() => clearSession()} className="" color={layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary}>
          <RiDeleteBin6Fill size={20} />
        </IconBtn>
        <IconBtn onClick={() => setChatbotPopup(false)} className="" color={layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary}>
          <IoMdClose size={20} />
        </IconBtn>
      </div>
    </div>
  );
}

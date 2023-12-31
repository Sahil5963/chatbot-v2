import { RiDeleteBin6Fill, RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { useWidget } from "../context/WidgetContext";
import { YOUR_GPT_LAYOUT } from "../utils/constants";

export default function ChatHeader({ expanded, onExpanded, onClose, onClearSession }: { onClearSession: () => void; expanded: boolean; onExpanded: () => void; onClose: () => void }) {
  // const [languagePopup, setLanguagePopup] = useState(false);
  const intl = useIntl();

  const { layout, setting } = useWidget();

  return (
    <div
      className="ygpt-px-2 ygpt-py-3 ygpt-flex ygpt-justify-between ygpt-items-center"
      style={{ background: layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary, color: layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary }}
    >
      {/* LEFT  */}
      <div className="left ygpt-flex ygpt-gap-2 ygpt-items-center">
        <button onClick={() => onExpanded()} className="ygpt-opacity-50 hover:ygpt-opacity-100 ygpt-transition-all">
          {expanded ? <RiExpandRightLine size={20} /> : <RiExpandLeftLine size={20} />}
        </button>

        <div className="avagar">
          <img src={setting?.logo} alt="Avatar" className="ygpt-h-[32px] ygpt-aspect-square" />
        </div>

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
        <Btn onClick={() => onClearSession()} className="" bg={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary} color={layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary}>
          <RiDeleteBin6Fill size={20} />
        </Btn>
        <Btn onClick={() => onClose()} className="" bg={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary} color={layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary}>
          <IoMdClose size={20} />
        </Btn>
      </div>
    </div>
  );
}

const Btn = styled.button<{ color: string; bg: string }>`
  background: ${(p) => p.color + "00"};
  color: ${(p) => p.color + "a1"};
  height: 38px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 120px;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => p.color + "20"};
    color: ${(p) => p.color + "ff"};
  }
`;

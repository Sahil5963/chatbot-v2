import { THEME } from "utils/constants/ui";
import { RiDeleteBin6Fill, RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { styled } from "styled-components";
import { useIntl } from "react-intl";
import { LayoutD } from "types/layout";

export default function ChatHeader({ layout, expanded, onExpanded, onClose, onClearSession }: { layout: LayoutD | null; onClearSession: () => void; expanded: boolean; onExpanded: () => void; onClose: () => void }) {
  // const [languagePopup, setLanguagePopup] = useState(false);
  const intl = useIntl();

  return (
    <div className="ygpt-px-2 ygpt-py-3 ygpt-flex ygpt-justify-between ygpt-items-center" style={{ background: layout?.primaryColor || THEME.primaryColor, color: layout?.textOnPrimaryColor || THEME.textOnPrimary }}>
      {/* LEFT  */}
      <div className="left ygpt-flex ygpt-gap-2 ygpt-items-center">
        <button onClick={() => onExpanded()} className="ygpt-opacity-50 hover:ygpt-opacity-100 ygpt-transition-all">
          {expanded ? <RiExpandRightLine size={20} /> : <RiExpandLeftLine size={20} />}
        </button>

        <div className="avagar">
          <img src={layout?.logo} alt="Avatar" className="ygpt-h-[32px] ygpt-aspect-square" />
        </div>

        <div className="content">
          <h4 className="ygpt-font-medium ">{layout?.name || "YourGPT"}</h4>
          {intl.formatMessage({ id: "home.heading", defaultMessage: "Hello" })}
        </div>
      </div>

      {/* RIGHT  */}
      <div className="ygpt-flex">
        {/* <div className="ygpt-relative">
          <Btn onClick={() => setLanguagePopup((s) => !s)} className="" bg={chatbotSettings?.widget_color || THEME.primaryColor} color={chatbotSettings?.widget_text_color || THEME.textOnPrimary}>
            <RiTranslate2 size={20} />
          </Btn>
          <LanguagePopup open={languagePopup} onClose={() => {}} />
        </div> */}
        <Btn onClick={() => onClearSession()} className="" bg={layout?.primaryColor || THEME.primaryColor} color={layout?.textOnPrimaryColor || THEME.textOnPrimary}>
          <RiDeleteBin6Fill size={20} />
        </Btn>
        <Btn onClick={() => onClose()} className="" bg={layout?.primaryColor || THEME.primaryColor} color={layout?.textOnPrimaryColor || THEME.textOnPrimary}>
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

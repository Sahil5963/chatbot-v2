import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { customDebounce } from "../../utils/helper";
import { THEME } from "../../utils/constants/ui";
import SendIcon from "./icons/SendIcon";

export default function ChatActionBar({ notifyTyping, sendMessage }: { notifyTyping: (isTyping: boolean) => void; sendMessage: (text: string) => void }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null as HTMLTextAreaElement | null);
  const interacted = useRef(false);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounce the setIsTyping function
  const debounceSetIsTyping = customDebounce(() => {
    setIsTyping(false);
  }, 2000); // Adjust the delay as needed

  const handleInputChange = (e: any) => {
    interacted.current = true;

    setText(e.target.value);
    setIsTyping(true);
    debounceSetIsTyping(); // Reset typing state after a delay
  };

  useEffect(() => {
    if (!interacted.current) return;

    notifyTyping(isTyping);
  }, [isTyping, notifyTyping]);

  return (
    <div className="ygpt-relative ygpt-flex ygpt-items-center ygpt-border-t ygpt-border-gray-200" style={{ minHeight: THEME.actionbarHeight }}>
      <TextareaAutosize
        ref={inputRef}
        maxRows={4}
        className="flex ygpt-resize-none ygpt-text-sm ygpt-outline-none ygpt-w-full ygpt-outline ygpt-p-2 ygpt-px-4"
        value={text}
        onChange={handleInputChange}
        placeholder="Ask your query..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (text.trim().length === 0) return;
            sendMessage(text);
            setText("");
          }
        }}
      />

      <div
        className={` ygpt-cursor-pointer hover:ygpt-bg-blue-100 ygpt-text-blue-600  ygpt-h-[38px] ygpt-aspect-square ygpt-rounded-full ygpt-overflow-hidden ygpt-flex ygpt-justify-center ygpt-items-center ygpt-absolute ygpt-right-1  ${
          text ? "ygpt-scale-100 ygpt-opacity-100" : "ygpt-scale-[0.5] ygpt-opacity-0 ygpt-pointer-events-none"
        } ygpt-transition-all ygpt-ease-in-quint`}
        onClick={() => {
          sendMessage(text);
          setText("");
        }}
      >
        <SendIcon size={24} />
      </div>
    </div>
  );
}

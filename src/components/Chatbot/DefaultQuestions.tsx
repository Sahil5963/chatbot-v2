import { useChatbot } from "context/ChatbotContext";
import { useEffect, useState } from "react";
import { THEME } from "utils/constants/ui";
import { padX } from ".";
import { styled } from "styled-components";

export default function DefaultQuestions() {
  const { chatbotSettings, messages, sendMessage } = useChatbot();
  const [questions, setQuestions] = useState<
    {
      question: string;
      label: string;
    }[]
  >([]);

  useEffect(() => {
    if (chatbotSettings?.default_questions) {
      const arr = JSON.parse(chatbotSettings?.default_questions);
      if (arr && arr.length > 0) {
        setQuestions(arr.filter((i: any) => i.question && i.label));
      }
    }
  }, [chatbotSettings?.default_questions]);

  if (messages.length !== 0 || questions.length === 0) {
    return null;
  }

  return (
    <div className={`${padX} ygpt-mt-auto ygpt-py-2`}>
      <div className="ygpt-flex ygpt-gap-1 ygpt-flex-wrap">
        {questions.map((i) => {
          return (
            <Item
              onClick={() => sendMessage(i.question)}
              color={chatbotSettings?.widget_color || THEME.primaryColor}
              text={chatbotSettings?.widget_text_color || THEME.textOnPrimary}
              className="ygpt-rounded-full ygpt-transition-all ygpt-cursor-pointer ygpt-opacity-80 hover:ygpt-opacity-100 ygpt-border ygpt-px-3 ygpt-py-1 ygpt-text-sm"
              key={i.label}
            >
              {i.label}
            </Item>
          );
        })}
      </div>
    </div>
  );
}

const Item = styled.div<{ color: string; text: string }>`
  border-color: ${(p) => p.color};
  color: ${(p) => p.color};
  &:hover {
    background: ${(p) => p.color};
    color: ${(p) => p.text};
  }
`;

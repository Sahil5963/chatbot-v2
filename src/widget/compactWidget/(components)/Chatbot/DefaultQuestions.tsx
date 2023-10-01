import { useEffect, useState } from "react";
import { padX } from ".";
import styled from "styled-components";
import { useCompactChatbot } from "../../context/CompactContext";
import { useWidget } from "../../../context/WidgetContext";
import { YOUR_GPT_LAYOUT } from "../../../utils/constants";

export default function DefaultQuestions({ onSend }: { onSend: (text: string) => void }) {
  const { layout } = useWidget();
  const { messages } = useCompactChatbot();
  const [questions, setQuestions] = useState<
    {
      question: string;
      label: string;
    }[]
  >([]);

  useEffect(() => {
    if (layout?.defaultQuestions) {
      const arr = layout.defaultQuestions["en"] || [];
      if (arr && arr.length > 0) {
        setQuestions(arr.filter((i: any) => i.question && i.label));
      }
    }
  }, [layout]);

  if (messages.length !== 0 || questions.length === 0) {
    return null;
  }

  return (
    <div className={`${padX} ygpt-mt-auto ygpt-py-2`}>
      <div className="ygpt-flex ygpt-gap-1 ygpt-flex-wrap">
        {questions.map((i) => {
          return (
            <Item
              onClick={() => onSend(i.question)}
              color={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary}
              text={layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary}
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

import { useState } from "react";
import HomeHeader from "../../(components)/HomeHeader";
import { styled } from "styled-components";
import AutoResize from "react-textarea-autosize";
import SendIcon from "../../../(components)/icons/SendIcon";
import SocialMediaBtns from "../../(components)/SocialMediaBtns";
import { useWidget } from "../../../context/WidgetContext";
import { YOUR_GPT_LAYOUT } from "../../../utils/constants";
import { useTabChatbot } from "../../context/TabContext";

export default function Home() {
  const { layout } = useWidget();
  const { sendQueryFromOutside } = useTabChatbot();
  const [text, setText] = useState("");

  return (
    <div>
      <HomeHeader />
      <Content className="padX">
        <h4>{layout?.welcomeMessage["en"]}</h4>

        <div className="ygpt-flex ygpt-gap-2 ygpt-flex-wrap ygpt-mb-4">
          {layout?.defaultQuestions["en"]?.map((i, index) => {
            return (
              <MessageItem color={layout?.colors.primary} key={index}>
                {i.label}
              </MessageItem>
            );
          })}
        </div>

        {/* SEND QUERY  */}

        <div className="ygpt-relative ygpt-w-full  ygpt-flex ygpt-items-center ygpt-mb-4">
          <TextArea
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && !e.shiftKey) {
                text.trim() && sendQueryFromOutside(text.trim());
              }
            }}
            placeholder="Type your query..."
            color={layout?.colors.primary}
            maxRows={3}
            onChange={(e: any) => setText(e.target.value)}
          />
          <div
            className={` ygpt-cursor-pointer hover:ygpt-bg-blue-100 ygpt-text-blue-600  ygpt-h-[38px] ygpt-aspect-square ygpt-rounded-full ygpt-overflow-hidden ygpt-flex ygpt-justify-center ygpt-items-center ygpt-absolute ygpt-right-1  ${
              text ? "ygpt-scale-100 ygpt-opacity-100" : "ygpt-scale-[0.5] ygpt-opacity-0 ygpt-pointer-events-none"
            } ygpt-transition-all ygpt-ease-in-quint`}
            onClick={() => {
              text.trim() && sendQueryFromOutside(text.trim());
              setText("");
            }}
          >
            <SendIcon size={24} />
          </div>
        </div>

        {/* LINKS  */}

        <div className="ygpt-flex ygpt-flex-col ygpt-gap-1">
          {layout?.externalLinks.map((i) => {
            if (i.type === "link") {
              return (
                <Link color={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary} key={i.link} href={i.link}>
                  {i.text}
                </Link>
              );
            } else if (i.type === "card") {
              return (
                <Annoucement className="item">
                  <img src={i.image} />
                  <p>{i.text}</p>
                </Annoucement>
              );
            } else if (i.type === "socialMedia") {
              return <SocialMediaBtns items={i.socialItems} />;
            }
          })}
        </div>
      </Content>
    </div>
  );
}

const Content = styled.div`
  margin-top: 30%;

  h4 {
    font-size: 1.4rem;
    font-weight: bold;
    white-space: pre-wrap;
    margin-bottom: 1rem;
  }
`;

const MessageItem = styled.div<{ color: string }>`
  border-radius: 120px;
  border: 1px solid;
  border-color: ${(props) => props.color};
  color: ${(props) => props.color};
  padding: 4px 12px;
  font-size: 14px;
`;

const TextArea = styled(AutoResize)<{ color?: string }>`
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
  resize: none;
  padding: 1rem;
  outline: none;
  padding-right: ${42 + 10}px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition: all 0.2s;

  &:focus {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
    &:hover {
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
    }
  }
  &:hover {
    border-color: rgba(0, 0, 0, 0.12);
  }
`;

const Link = styled.a<{ color: string }>`
  display: flex;
  justify-content: center;
  background: ${(props) => props.color + "14"};
  color: ${(props) => props.color};
  border-radius: 8px;
  line-clamp: 1;
  height: 42px;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;

const Annoucement = styled.div`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.07);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16/9;
  }
  p {
    font-size: 14px;
    opacity: 0.6;
    padding: 10px;
  }
`;

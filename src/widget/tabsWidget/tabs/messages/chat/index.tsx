import { FiArrowLeft } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { styled } from "styled-components";
import { TAB_THEME } from "../../../ui";
import { useEffect, useRef, useState } from "react";
import { useTabUiChatbot } from "../../../context/TabUiContext";
import AnimatedHeader from "../../../(components)/AnimatedHeader";
import { IconBtn, ScrollDiv } from "../../../../(components)/styles";
import ChatItem from "../../../../(components)/ChatItem";
import ChatActionBar from "../../../../(components)/ChatActionBar";
import { useWidget } from "../../../../context/WidgetContext";
import { MessageD } from "../../../../types/message";
import { YOUR_GPT_LAYOUT } from "../../../../utils/constants";

export default function Chat() {
  const { navigate } = useTabUiChatbot();

  const [messages] = useState<MessageD[]>([]);

  const { layout } = useWidget();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleScroll = () => {
    // Check if the user has scrolled up manually
    if (chatContainerRef.current) {
      // setUserScrolledUp(chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight < chatContainerRef.current.scrollHeight);
    }
  };

  return (
    <Root>
      <AnimatedHeader style={{ background: layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary, height: TAB_THEME.headerHeights.root }} className="ygpt-w-full ygpt-flex ygpt-justify-between ygpt-items-center padX ygpt-h-full ">
        <div>
          <IconBtn onClick={() => navigate("messagesTab")} color="#ffffff">
            <FiArrowLeft size={20} />
          </IconBtn>
        </div>

        <IconBtn color="#ffffff">
          <RiDeleteBin6Fill size={20} />
        </IconBtn>
      </AnimatedHeader>

      <Middle>
        <ScrollDiv
          color={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary}
          className="content ygpt-overflow-x-hidden   ygpt-overflow-y-auto ygpt-flex-1 ygpt-py-2 ygpt-flex ygpt-flex-col  ygpt-items-start ygpt-gap-3"
          style={{ transition: `scroll-behavior 0.5s ease-in-out` }}
          ref={chatContainerRef}
          onScroll={handleScroll}
        >
          {messages.map((i) => {
            return <ChatItem rateMessage={() => {}} key={i.localId || i.content.message_id} {...i} />;
          })}
          {/* {loadingStatus && <>{loadingStatus === "loading" && <span>Loading.....</span>}</>} */}
        </ScrollDiv>
      </Middle>
      <Bottom>
        <ChatActionBar
          notifyTyping={(is) => {
            console.log(is);
          }}
          sendMessage={(txt) => {
            console.log(txt);
          }}
        />
      </Bottom>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Middle = styled.div`
  flex: 1;
`;
const Bottom = styled.div``;

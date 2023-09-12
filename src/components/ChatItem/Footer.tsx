import { MessageD } from "types/message";
import { HIDE_FEEDBACK } from "utils/helper";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { useChatbot } from "context/ChatbotContext";
import { styled } from "styled-components";
import LearnMoreLinks from "./LearnMoreLinks";

export default function Footer({ message, rateMessage }: { message: MessageD; rateMessage: (data: { messageId: number; rate: "1" | "0" }) => any }) {
  const { isFullPage } = useChatbot();

  const rated = message.rated;
  const message_id = message.content.message_id;
  const links = message.links || [];

  if (message.from !== "assistant") {
    return null;
  }

  return (
    <div className="ygpt-mt-2">
      {message_id && message_id !== 0 ? (
        <div>
          {rated ? (
            <div>
              {rated === "1" ? (
                <Btn className="like active">
                  <HiThumbUp />
                </Btn>
              ) : (
                <Btn className="dislike active">
                  <HiThumbDown />
                </Btn>
              )}
            </div>
          ) : HIDE_FEEDBACK && isFullPage ? null : (
            message_id && (
              <Btns>
                <Btn
                  className="like"
                  onClick={() => {
                    rateMessage({ messageId: message_id, rate: "1" });
                  }}
                >
                  <HiThumbUp />
                </Btn>
                <Btn
                  className="dislike"
                  onClick={() => {
                    rateMessage({ messageId: message_id, rate: "0" });
                  }}
                >
                  <HiThumbDown />
                </Btn>
              </Btns>
            )
          )}
        </div>
      ) : null}

      {links.length > 0 && (
        <div className="ygpt-mt-2">
          <LearnMoreLinks links={links} />
        </div>
      )}
    </div>
  );
}

const Btn = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 32px;
  width: 32px;
  border-radius: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &.active {
    &.like {
      background: #08ac0829;
      color: #067b06;
    }
    &.dislike {
      color: #d22121;
      background-color: #ff000014;
    }
  }

  &:hover {
    cursor: pointer;
    &.like {
      background: #08ac0829;
      color: #067b06;
    }
    &.dislike {
      color: #d22121;
      background-color: #ff000014;
    }
  }

  svg {
    font-size: 17px;
  }
`;
const Btns = styled.div`
  display: flex;
  gap: 2px;

  color: rgba(0, 0, 0, 0.4);
`;

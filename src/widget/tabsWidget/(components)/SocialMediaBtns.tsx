import { styled } from "styled-components";
import { WidgetSocialItemType } from "../../types/layout/global";

export default function SocialMediaBtns({ items = [] }: { items?: WidgetSocialItemType[] }) {
  return (
    <Root className="ygpt-flex ygpt-items-center ygpt-justify-center ygpt-gap-2 ygpt-flex-wrap">
      {items.map((i) => {
        return (
          <a
            href={i.link}
            target="_blank"
            key={i.link}
            className="ygpt-flex  ygpt-items-center ygpt-justify-center ygpt-h-[38px] ygpt-aspect-square ygpt-overflow-hidden  ygpt-rounded-full  hover:ygpt-opacity-100 ygpt-transition-all hover:ygpt-scale-110 "
          >
            <img src={`https://assets.yourgpt.ai/images/social/${i.type}.svg`} className="ygpt-h-[32px]" />
          </a>
        );
      })}
    </Root>
  );
}

const Root = styled.div``;

import styled from "styled-components";
import { WidgetLayoutD } from "../types/layout/global";

export const RootStyles = styled.div<{ layout: WidgetLayoutD }>`
  * {
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .padX {
    padding-left: 16px;
    padding-right: 16px;
  }

  .ygpts {
    &-widgetBtn {
      ${({ layout }) => (layout.position?.align === "left" ? `left:${layout.position.x || 20}px;` : `right:${layout.position.x || 20}px;`)}
      bottom: ${({ layout }) => layout.position.y || 20}px;
      height: 48px;
      width: 48px;
    }
    &-frame {
      z-index: 9999;
      position: fixed;

      ${({ layout }) => (layout.position?.align === "left" ? `left:${layout.position.x || 20}px;` : `right:${layout.position.x || 20}px;`)}

      bottom: ${({ layout }) => (layout.position.y || 20) + 64}px;
      height: ${({ layout }) => `min(704px, 100% - ${100 + layout.position.y}px)`};
      min-height: 80px;
      max-width: 400px;
      width: 100%;
      max-height: 704px;
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
      border-radius: 16px;
      overflow: hidden;
      transform-origin: right bottom;
      pointer-events: none;
      transition: max-width 0.3s;
      &.show {
        pointer-events: all;
      }
      &.big {
        max-width: min(800px, 100% - 104px);
      }

      @media (max-width: 500px) {
        bottom: 0;
        left: 0;

        height: 100svh;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
        box-shadow: none;

        /* transform-origin: center; */
      }
    }

    @media (max-width: 500px) {
      &-expander {
        display: none;
      }
    }
  }

  &.widgetPlace-showcase {
    .ygpts-widgetBtn {
      position: absolute;
      right: 0;
    }
    .ygpts-frame {
      position: absolute;
      max-width: 100%;
      right: 0;
    }
  }
`;

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

  .ygpt-widgetBtn {
    right: 20px;
    bottom: 20px;
    color: ${(p) => p.layout?.colors.textOnPrimary};
    background: ${(p) => p.layout?.colors.primary};
  }

  .ygpt-frame {
    z-index: 9999;
    position: fixed;
    bottom: 84px;
    right: 20px;
    height: min(704px, 100% - 104px);
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
  }

  &.widgetPlace-showcase {
    .ygpt-widgetBtn {
      position: absolute;
      right: 0;
    }
    .ygpt-frame {
      position: absolute;
      max-width: 100%;
      right: 0;
    }
  }
`;

import { Spinner } from "@nextui-org/spinner";
import { THEME } from "../../utils/constants/ui";
import { useWidget } from "../context/WidgetContext";

export default function OverlayLoader({ dark = false }) {
  const { layout } = useWidget();
  return (
    <div className="ygpt-absolute ygpt-z-[12] ygpt-top-0 ygpt-left-0 ygpt-h-full ygpt-w-full ygpt-flex ygpt-justify-center ygpt-items-center" style={{ background: dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}>
      <div style={{ color: layout?.colors.primary || THEME.primaryColor }}>
        <Spinner color="current" />{" "}
      </div>
    </div>
  );
}

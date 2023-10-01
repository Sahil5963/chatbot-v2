import { LuLoader2 } from "react-icons/lu";

export default function Spinner({ size = 28 }) {
  return (
    <div className="ygpt-animate-spin">
      <LuLoader2 size={size} />
    </div>
  );
}

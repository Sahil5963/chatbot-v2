import Widget from "./widget";
import { getChatbotCreds } from "./widget/utils/helper";

let widgetUid: string;

const res = getChatbotCreds();

if (res?.widgetUid) {
  widgetUid = res.widgetUid;
}

export default function App() {
  return <Widget widgetUid={widgetUid} />;
}

import Widget from "./widget";

export default function App() {
  return (
    <div className="ygpt-flex ygpt-bg-red-400">
      <div className="ygpt-flex-1 ygpt-bg-red-300">Left</div>
      <div style={{ height: "90vh", width: "400px", position: "relative" }}>
        <Widget widgetPlace="chatbot" />
      </div>
    </div>
  );

  return <Widget />;
}

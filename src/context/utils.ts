export const getStreamData = ({ url, onUpdate }: { url: string; onUpdate: (d: { res: string; error?: string; finished?: boolean; messageId?: string; links?: any[] }) => void }) => {
  let response = "";

  try {
    const source = new EventSource(url);

    source.onmessage = function (event) {
      response = response + event.data;
      response = response.replaceAll("[LINE_END]", "\n").replaceAll("||", "|\n|").replaceAll(":|", "\n|");

      onUpdate({
        res: response,
      });
    };
    source.onerror = function () {
      source.close();
      console.log("source.onerror pppp");
      onUpdate({
        res: response,
        finished: true,
        error: "Error",
      });
      // response = "";
    };
    source.addEventListener("response", (e: any) => {
      let endRes: any = {};
      if (e) {
        endRes = JSON.parse(e.data);

        onUpdate({
          res: response,
          messageId: endRes.message_id,
        });
      }
    });
    source.addEventListener("learnMoreLinks", (e: any) => {
      let linkRes: any = {};
      if (e) {
        linkRes = JSON.parse(e.data);
      }

      onUpdate({
        links: linkRes,
        res: response,
      });
    });
    source.addEventListener("RXERROR", function (event) {
      console.log("RXERROR", event.data);
      onUpdate({
        error: "Error",
        finished: true,
        res: response,
      });
      // response = "";
    });
    source.addEventListener("end", function () {
      source.close();
      onUpdate({
        res: response,
        finished: true,
      });
      // response = "";
    });
  } catch (err) {
    console.log(err, "getStreamData err");
  }
};

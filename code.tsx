const ytIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="128pt" viewBox="0 -77 512.00213 512" width="128pt"><path d="m501.453125 56.09375c-5.902344-21.933594-23.195313-39.222656-45.125-45.128906-40.066406-10.964844-200.332031-10.964844-200.332031-10.964844s-160.261719 0-200.328125 10.546875c-21.507813 5.902344-39.222657 23.617187-45.125 45.546875-10.542969 40.0625-10.542969 123.148438-10.542969 123.148438s0 83.503906 10.542969 123.148437c5.90625 21.929687 23.195312 39.222656 45.128906 45.128906 40.484375 10.964844 200.328125 10.964844 200.328125 10.964844s160.261719 0 200.328125-10.546875c21.933594-5.902344 39.222656-23.195312 45.128906-45.125 10.542969-40.066406 10.542969-123.148438 10.542969-123.148438s.421875-83.507812-10.546875-123.570312zm0 0" fill="#f00"/><path d="m204.96875 256 133.269531-76.757812-133.269531-76.757813zm0 0" fill="#fff"/></svg>`;
const { widget } = figma;
const { Frame, Text, useSyncedState, usePropertyMenu, SVG, Image, Rectangle } =
  widget;

function YouTubeEmbed() {
  const [ytThumbnail, setYtThumbnail] = useSyncedState("ytThumbnail", "");
  const [ytURL, setYtURL] = useSyncedState("yt-url", "");
  
  figma.ui.onmessage = (message) => {
    const { ytThumbnail, ytURL } = message;
    setYtThumbnail(ytThumbnail);
    setYtURL(ytURL);
  };

  const addVideo = async (): Promise<void> => {
    return new Promise((resolve) => {
      figma.showUI(__uiFiles__.addVideo, {
        width: 300,
        height: 150,
      });
      figma.ui.postMessage({
        action: "ADD_VIDEO",
      });
    });
  };

  const playVideo = (): Promise<void> => {
    return new Promise((resolve) => {
      figma.showUI(__uiFiles__.playVideo, {
        width: 560,
        height: 315,
      });
      figma.ui.postMessage({
        action: "PLAY_VIDEO",
        ytURL,
      });
    });
  };

  return (
    <Frame width={360} height={202} fill="#E5E5E5">
      {ytThumbnail ? (
        <Frame width={360} height={202} onClick={playVideo}>
          <Rectangle
            width={360}
            height={202}
            fill={{ type: "image", src: ytThumbnail, scaleMode: "fit" }}
            onClick={playVideo}
          ></Rectangle>
          <Rectangle
            width={360}
            height={202}
            fill={{ type: "solid", color: { r: 0, g: 0, b: 0, a: 0.2 } }}
            onClick={playVideo}
          ></Rectangle>
          <SVG src={ytIcon} width={74} height={74} x={143} y={64}></SVG>
        </Frame>
      ) : (
        <Text onClick={addVideo}>Click to insert a YouTube video</Text>
      )}
    </Frame>
  );
}
widget.register(YouTubeEmbed);

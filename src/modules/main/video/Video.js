import * as React from "react";

import API_BASE_URL from "../../api";

function Video() {
  const [url, setUrl] = React.useState(null);
  React.useEffect(() => {
    fetch(`${API_BASE_URL}/activeVideo`)
      .then((res) => res.json())
      .then((video) => setUrl(video.link))
      .catch((error) => console.error("error in video fetch api"));
    return () => {};
  }, []);
  return (
    <>
      {url != null && (
        <iframe
          width="100%"
          //height="100%"
          src={url + "?controls=0"}
          title="title"
        ></iframe>
      )}
    </>
  );
}

export default Video;

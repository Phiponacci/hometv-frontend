import * as React from "react";

import { Card, ImageListItem } from "@mui/material";

import API_BASE_URL from "../../api";

const PERIOD = 10000;

function Camera() {
  const [url, setUrl] = React.useState(null);
  const setupSlides = (cameras) => {
    let index = 0;
    setUrl(cameras[index].link);
    setInterval(() => {
      setUrl(cameras[++index % cameras.length].link);
    }, PERIOD);
  };
  React.useEffect(() => {
    fetch(`${API_BASE_URL}/Camera/active`)
      .then((res) => res.json())
      .then((_cameras) => {
        _cameras.forEach((camera) => {
          if (camera.isImage) camera.link = `${API_BASE_URL}/${camera.link}`;
        });
        setupSlides(_cameras);
      })
      .catch((error) => alert("ERROR: cannot fetch camera stream!"));
    return () => {};
  }, []);

  return (
    <Card
      square
      sx={{
        my: 0.5,
      }}
    >
      <ImageListItem>
        {url != null && <img alt="" loading="lazy" src={url} />}
      </ImageListItem>
    </Card>
  );
}

export default Camera;

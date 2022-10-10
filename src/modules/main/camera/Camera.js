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
    fetch(`${API_BASE_URL}/Camera`)
      .then((res) => res.json())
      .then((cameras) => {
        setupSlides(cameras);
      })
      .catch((error) => console.error("error in camera fetch api"));
    return () => {};
  }, []);

  return (
    <Card>
      <ImageListItem>
        {url != null && <img alt="" loading="lazy" src={url} />}
      </ImageListItem>
    </Card>
  );
}

export default Camera;

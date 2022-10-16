import * as React from "react";

import { Card, ImageListItem } from "@mui/material";

import API_BASE_URL from "../../api";

const PERIOD = 5000;

function Sports() {
  const [url, setUrl] = React.useState(null);
  const [feed, setFeed] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/SportLink/rss`)
      .then((res) => res.json())
      .then((_links) => {
        setFeed(_links);
      })
      .catch((_) => alert("❌ERROR: sport links not found!"));
    return () => {};
  }, []);

  React.useEffect(() => {
    let index = 0;
    if (feed.length > 0) {
      const firstItem = feed[0];
      if (firstItem.mediaContent)
        if (firstItem.mediaContent.url) setUrl(firstItem.mediaContent.url);
    }
    const timer = setInterval(() => {
      if (feed.length > 0) {
        const item = feed[++index % feed.length];
        if (item.mediaContent)
          if (item.mediaContent.url) setUrl(item.mediaContent.url);
      }
    }, PERIOD);
    return () => {
      clearInterval(timer);
    };
  }, [feed]);

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

export default Sports;

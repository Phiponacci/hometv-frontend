import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NewsTicker from "react-advanced-news-ticker";

function Headlines() {
  const [news, setNews] = React.useState(null);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const url =
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.cbc.ca/cmlink/rss-topstories";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setNews(data.items);
        })
        .catch((error) => console.error(error));
    };
    fetchPosts();
    return () => {};
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={{ xs: 0.5, md: 1 }}>
          <Grid item xs={3} sm={3} md={2} lg={2} xl={1}>
            <Avatar
              src="/logo.png"
              variant="square"
              sx={{ width: 64 * (4 / 3), height: 64 }}
            />
          </Grid>

          <Grid item xs={9} sm={9} md={10} lg={10} xl={11}>
            <h5>Headlines</h5>
            {news != null && (
              <NewsTicker
                maxRows={1}
                duration = {5000}
                style={{
                  listStyleType: "none",
                }}
              >
                {news.map((item) => (
                  <div key={item.guid.toString()}>
                    <span className="hour">{item.pubDate} | </span>
                    <span>{item.title}</span>
                  </div>
                ))}
              </NewsTicker>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Headlines;

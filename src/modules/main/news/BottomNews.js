import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NewsTicker from "react-advanced-news-ticker";

function BottomNews() {
  React.useEffect(() => {
    const fetchPosts = async () => {
      const url =
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.cbc.ca/cmlink/rss-topstories";
      fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };
    fetchPosts();
    return () => {};
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={{ xs: 0.5, md: 1 }}>
          <Grid item xs={4} sm={4} md={2} lg={1}>
            <Avatar
              src="/logo.png"
              variant="square"
              sx={{ width: 64 * (4 / 3), height: 64 }}
            />
          </Grid>

          <Grid item xs={8} sm={8} md={10} lg={11}>
            <NewsTicker
              maxRows={1}
              style={{
                listStyleType: "none",
              }}
            >
              <div>
                <span>currentNews</span>
              </div>
            </NewsTicker>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BottomNews;

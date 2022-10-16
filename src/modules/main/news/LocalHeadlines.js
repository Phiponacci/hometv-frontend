import * as React from "react";

import API_BASE_URL from "../../api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NewsTicker from "react-advanced-news-ticker";
import dayjs from "dayjs";

//import Avatar from "@mui/material/Avatar";

function LocalHeadlines() {
  const [news, setNews] = React.useState(null);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const url = `${API_BASE_URL}/LocalHeadline/active`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setNews(data))
        .catch((error) =>
          alert("Error fetching local headlines from the server!")
        );
    };
    fetchPosts();
    return () => {};
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid>
            
          </Grid>

          <Grid>
            <h5
              style={{
                color: "white",
                marginBottom: 2,
              }}
            >
              Local Headlines
            </h5>
            {news != null && (
              <NewsTicker
                maxRows={1}
                duration={5000}
                style={{
                  listStyleType: "none",
                  padding: 0,
                }}
              >
                {news.map((item) => (
                  <div key={item.id.toString()}>
                    <h6
                      className="hour"
                      style={{
                        color: "white",
                        display: "inline",
                      }}
                    >
                      {dayjs(item.headlineDateTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}{" "}
                      |{" "}
                    </h6>
                    <h6
                      style={{
                        color: "white",
                        display: "inline",
                      }}
                    >
                      {item.headline}
                    </h6>
                  </div>
                ))}
              </NewsTicker>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default LocalHeadlines;

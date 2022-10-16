import * as React from "react";

import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Camera from "./camera/Camera";
import Grid from "@mui/material/Grid";
import Headlines from "./news/Headlines";
import LocalHeadlines from "./news/LocalHeadlines";
import Sports from "./sport/Sports";
import Video from "./video/Video";
import WeatherWidget from "./weather/WeatherWidget";

function Main() {
  const [date, setDate] = React.useState(
    new Date().toDateString() + " " + new Date().toLocaleTimeString()
  );

  setInterval(
    () =>
      setDate(
        new Date().toDateString() + " " + new Date().toLocaleTimeString()
      ),
    1000
  );
  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: "#c69512" }}>
      <Grid container spacing={{ xs: 0.5, md: 1 }}>
        <Grid item xs={12} sm={7} md={9} xl={10}>
          <Video />
          <Headlines />
          <LocalHeadlines />
        </Grid>

        <Grid item xs={12} sm={5} md={3} xl={2}>
          <div>
            <Avatar
              src="/logo-wide.png"
              variant="square"
              sx={{ width: 170, height: 70 }}
            />
            <h5 style={{
              color: "white"
            }}>{date}</h5>
            <WeatherWidget />
            <Camera />
            <Sports />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Main;

import * as React from "react";

import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Camera from "./camera/Camera";
import Headlines from "./news/Headlines";
import LocalHeadlines from "./news/LocalHeadlines";
import SportsWidget from "./sport/SportsWidget";
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
    <>
      <Box id="bottom" sx={{ flexGrow: 1, p: 1, backgroundColor: "#c69512" }}>
        <LocalHeadlines />
        <Headlines />
      </Box>

      <Box id="right" sx={{ flexGrow: 1, py: 2, px: 1, backgroundColor: "#c69512" }}>
        <Avatar
          src="/logo-wide.png"
          variant="square"
          sx={{ width: 170, height: 70 }}
        />
        <h5
          style={{
            color: "white",
            my:1,
          }}
        >
          {date}
        </h5>
        <WeatherWidget />
        <Camera />
        <SportsWidget />
      </Box>
    </>
  );
}

export default Main;

import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WeatherElement({ icon, temperature, day }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 0.5,
      }}
    >
      <Avatar
        src={`/weather/${icon}.svg`}
        variant="square"
        sx={{
          width: "40%",
          height: "50%",
        }}
      />
      <Typography color="white" display="block" gutterBottom>
        {temperature}
      </Typography>
      <Typography color="white" display="block" gutterBottom>
        {day}
      </Typography>
    </Box>
  );
}

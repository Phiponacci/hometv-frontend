import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import WeatherElement from "./WeatherElement";
import WeatherMetric from "./WeatherMetric";

export default function WeatherWidget() {
  return (
    <Card
      sx={{
        margin: 0.25,
        backgroundColor: "#00C0E5",
      }}
    >
      <CardContent
        sx={{
          p: 0.25,
          "&:last-child": { pb: 0 },
        }}
      >
        <Grid container>
          <Grid item xs={5} sm={5} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <LocationOnIcon
                style={{ color: "white", marginTop: 2, marginRight: "10%" }}
              />
              <Typography
                color="white"
                variant="subtitle1"
                display="block"
                gutterBottom
              >
                Montreal
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src="/weather/sunny.svg"
                variant="square"
                sx={{
                  width: "50%",
                  height: "50%",
                }}
              />
              <Typography
                color="white"
                variant="h6"
                display="block"
                gutterBottom
              >
                Sunny
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "20%",
                }}
              >
                <Avatar
                  src="/thermometer.png"
                  variant="square"
                  sx={{
                    width: "25%",
                    height: "25%",
                  }}
                />
                <Typography color="white" variant="h5" display="block">
                  25°
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={7} sm={7} md={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <WeatherMetric
                icon="/sunrise.png"
                title="sunrise"
                value="07:00"
              />
              <WeatherMetric icon="/sunset.png" title="sunset" value="19:20" />
              <WeatherMetric icon="/humidity.png" value="60%" />
              <WeatherMetric icon="/wind.png" value="10 km/h" />
              <WeatherMetric icon="/windsock.png" value="North-East" />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions disableSpacing sx={{ p: 0, "&:last-child": { p: 0 } }}>
        <WeatherElement icon="sunny" temperature="+25°" day="Sun" />
        <WeatherElement icon="cloudy" temperature="+19°" day="Mon" />
        <WeatherElement icon="light_showers" temperature="+19°" day="Tue" />
        <WeatherElement icon="heavy_showers" temperature="+7°" day="Wed" />
        <WeatherElement icon="snow" temperature="-7°" day="Thu" />
      </CardActions>
    </Card>
  );
}

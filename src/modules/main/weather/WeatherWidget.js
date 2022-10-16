import * as React from "react";

import API_BASE_URL from "../../api";
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

const PERIOD = 5000;

export default function WeatherWidget() {
  const [weatherRecords, setWeatherRecords] = React.useState([]);
  const [currentRecord, setCurrentRecord] = React.useState(null);
  React.useEffect(() => {
    fetch(`${API_BASE_URL}/Weather/active`)
      .then((res) => res.json())
      .then((records) => setWeatherRecords(records))
      .catch((_) => alert("❌ERROR: cannot fetch weather data!"));
    return () => {};
  }, []);

  React.useEffect(() => {
    let index = 0;
    if (weatherRecords.length > 0) {
      setCurrentRecord(weatherRecords[0]);
    }
    const timer = setInterval(() => {
      if (weatherRecords.length > 0) {
        const item = weatherRecords[++index % weatherRecords.length];
        setCurrentRecord(item);
        console.log(item);
      }
    }, PERIOD);
    return () => {
      clearInterval(timer);
    };
  }, [weatherRecords]);

  const unixTimeToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = date.getMinutes();
    return hours + ":" + minutes;
  };

  return (
    <>
      {currentRecord && (
        <Card
          sx={{
            my: 0.5,
            backgroundColor: "#00C0E5",
            paddingBottom: 1,
          }}
        >
          <CardContent
            sx={{
              p: 0.25,
              "&:last-child": { pb: 0 },
            }}
          >
            <Grid container>
              <Grid item xs={6} sm={6} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <LocationOnIcon
                    style={{ color: "white", marginTop: 2, marginRight: "1%" }}
                  />
                  <Typography
                    color="white"
                    variant="subtitle1"
                    display="block"
                    gutterBottom
                  >
                    {currentRecord.name}
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
                    src={`/weather/${currentRecord.weatherRecord.weather[0].icon}.svg`}
                    variant="square"
                    sx={{
                      width: "50%",
                      height: "50%",
                    }}
                  />
                  <Typography color="white" display="block" gutterBottom>
                    {currentRecord.weatherRecord.weather[0].main}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      marginLeft: "25%",
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
                      {Math.round(currentRecord.weatherRecord.main.temp)}°
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <WeatherMetric
                    icon="/sunrise.png"
                    title="sunrise"
                    value={unixTimeToDate(
                      currentRecord.weatherRecord.sys.sunrise +
                        currentRecord.weatherRecord.timezone
                    )}
                  />
                  <WeatherMetric
                    icon="/sunset.png"
                    title="sunset"
                    value={unixTimeToDate(
                      currentRecord.weatherRecord.sys.sunset +
                        currentRecord.weatherRecord.timezone
                    )}
                  />
                  <WeatherMetric
                    icon="/humidity.png"
                    value={currentRecord.weatherRecord.main.humidity + "%"}
                  />
                  <WeatherMetric
                    icon="/wind.png"
                    value={
                      Math.round(
                        (currentRecord.weatherRecord.wind.speed * 18) / 5
                      ) + " Km/h"
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          {/*<Divider />
          <CardActions disableSpacing sx={{ p: 0, "&:last-child": { p: 0 } }}>
            <WeatherElement icon="sunny" temperature="+25°" day="Sun" />
            <WeatherElement icon="cloudy" temperature="+19°" day="Mon" />
            <WeatherElement icon="light_showers" temperature="+19°" day="Tue" />
            <WeatherElement icon="heavy_showers" temperature="+7°" day="Wed" />
            <WeatherElement icon="snow" temperature="-7°" day="Thu" />
                  </CardActions>*/}
        </Card>
      )}
    </>
  );
}

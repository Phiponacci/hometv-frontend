import * as React from "react";

import API_BASE_URL from "../../api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function APIManagerPage() {
  const [weatherAPI, setWeatherAPI] = React.useState(null);
  const handleUpdateWeatherAPIKey = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const api = {...weatherAPI}
    api.apiKey = data.get("apiKey");
    fetch(`${API_BASE_URL}/api`, {
      method: "PUT",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(api),
    })
      .then((res) => res.json())
      .then((record) => []);
  };

  const [scoresAPI, setScoresAPI] = React.useState(null);
  const handleUpdateScoresAPIKey = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const api = {...scoresAPI}
    api.apiKey = data.get("apiKey");
    fetch(`${API_BASE_URL}/api`, {
      method: "PUT",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(api),
    })
      .then((res) => res.json())
      .then((record) => []);
  };

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/api/`)
      .then((res) => res.json())
      .then((apis) => {
        apis.forEach((api) => {
          if (api.apiType === 0) {
            setScoresAPI(api);
          }
          if (api.apiType === 1) {
            setWeatherAPI(api);
          }
        });
      });
    return () => {};
  }, []);

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={{ xs: 2, sm: 10, md: 25, lg: 40 }}
        sx={{ display: "block" }}
      >
        <Divider>
          <h2>Open Weather Map API</h2>
        </Divider>
        {weatherAPI && (
          <Box
            id="weather-form"
            component="form"
            onSubmit={handleUpdateWeatherAPIKey}
            noValidate
            sx={{ m: 5, display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              fullWidth
              name="apiKey"
              label="API Key"
              variant="outlined"
              defaultValue={weatherAPI.apiKey}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mx: 2 }}
            >
              Save
            </Button>
          </Box>
        )}

        <Divider>
          <h2>Live Sports Odds API</h2>
        </Divider>
        {scoresAPI && (
          <Box
            id="scores-form"
            component="form"
            onSubmit={handleUpdateScoresAPIKey}
            noValidate
            sx={{ m: 5, display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              fullWidth
              name="apiKey"
              label="API Key"
              variant="outlined"
              defaultValue={scoresAPI.apiKey}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mx: 2 }}
            >
              Save
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
}

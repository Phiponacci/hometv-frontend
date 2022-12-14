import * as React from "react";

import API_BASE_URL from "../../api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MapIcon from "@mui/icons-material/Map";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

export default function WeatherPage() {
  const [cities, setCities] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/City`)
      .then((res) => res.json())
      .then((_cities) => setCities(_cities));
    return () => {};
  }, []);

  const toggleCity = (city) => {
    fetch(`${API_BASE_URL}/City/${city.id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((_city) => {
        setCities((_cities) => {
          const index = _cities.indexOf(city);
          const records = [..._cities];
          records[index] = _city;
          return records;
        });
      });
  };

  const handleAddCity = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const coord = data.get("ll").split(",");
    const lat = Number(coord[0]);
    const long = Number(coord[1]);
    const city = {
      name: data.get("name"),
      latitude: lat,
      longitude: long,
    };
    fetch(`${API_BASE_URL}/City`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(city),
    })
      .then((res) => res.json())
      .then((savedVideo) => setCities((current) => [savedVideo, ...current]));
  };

  const handleDeleteVideo = (cityId) => {
    fetch(`${API_BASE_URL}/City/${cityId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedCity) => {
        setCities((current) => {
          return current.filter((city) => city.id !== deletedCity.id);
        });
      });
  };

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={{ sm: 1, md: 5, lg: 30 }}
        sx={{ display: "block" }}
      >
        <Box
          id="camera-form"
          component="form"
          onSubmit={handleAddCity}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            required
            name="name"
            id="outlined-basic"
            label="City name"
            variant="outlined"
            sx={{
              m: 1,
            }}
          />

          <TextField
            required
            name="ll"
            id="outlined-basic"
            label="Longitude, Latitude"
            variant="outlined"
            sx={{
              m: 1,
              minWidth: 350,
            }}
          />
          <Tooltip title={`Google maps`}>
            <IconButton
              sx={{ color: "green", m: 2 }}
              href="https://www.google.com/maps/"
              target="_blank"
            >
              <MapIcon />
            </IconButton>
          </Tooltip>
          <Grid container justifyContent="flex-end" sx={{ my: 2 }}>
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          </Grid>
        </Box>
        <List
          display="flex"
          sx={{ width: "100%", bgcolor: "background.paper" }}
          subheader={<ListSubheader>List of cities</ListSubheader>}
        >
          {cities.map((city) => (
            <ListItem key={city.id}>
              <ListItemButton
                href={`https://www.google.com/maps/@${city.longitude},${city.latitude},10z`}
                target="_blank"
              >
                <Tooltip
                  title={`long, lat = (${city.longitude}, ${city.latitude})`}
                >
                  <ListItemText primary={city.name} />
                </Tooltip>
              </ListItemButton>
              <Switch
                onChange={() => toggleCity(city)}
                edge="end"
                checked={city.isActive}
              />
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDeleteVideo(city.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}

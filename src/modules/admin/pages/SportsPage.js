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
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

export default function SportsPage() {
  const [sportLinks, setSportLinks] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/SportLink`)
      .then((res) => res.json())
      .then((_sportLinks) => setSportLinks(_sportLinks));
    return () => {};
  }, []);

  const toggleSportLink = (sportLink) => {
    fetch(`${API_BASE_URL}/SportLink/${sportLink.id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((_sportLink) => {
        setSportLinks((_links) => {
          const index = _links.indexOf(sportLink);
          const records = [..._links];
          records[index] = _sportLink;
          return records;
        });
      });
  };

  const handleAddLink = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sportLink = {
      name: data.get("name"),
      link: data.get("link")
    };
    fetch(`${API_BASE_URL}/SportLink`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sportLink),
    })
      .then((res) => res.json())
      .then((savedLink) => setSportLinks((current) => [savedLink, ...current]));
  };

  const handleDeleteLink = (sportLinkId) => {
    fetch(`${API_BASE_URL}/SportLink/${sportLinkId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedLink) => {
        setSportLinks((current) =>
          current.filter((sportLink) => sportLink.id !== deletedLink.id)
        );
      });
  };

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={{ xs: 2, sm: 10, md: 25, lg: 40 }}
        sx={{ display: "block" }}
      >
        <Box
          id="camera-form"
          component="form"
          onSubmit={handleAddLink}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            fullWidth
            required
            name="name"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{
              my: 1
            }}
          />
          <TextField
            fullWidth
            required
            name="link"
            id="outlined-basic"
            label="Sport link"
            variant="outlined"
            sx={{
              my: 1
            }}
          />
          <Grid container justifyContent="flex-end" sx={{ my: 2 }}>
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          </Grid>
        </Box>
        <List
          display="flex"
          sx={{ width: "100%", bgcolor: "background.paper" }}
          subheader={<ListSubheader>Sport Links</ListSubheader>}
        >
          {sportLinks.map((sportLink) => (
            <ListItem key={sportLink.id}>
              <ListItemButton href={sportLink.link} target="_blank">
                <Tooltip title={sportLink.link}>
                  <ListItemText
                    primary={sportLink.name}
                  />
                </Tooltip>
              </ListItemButton>
              <Switch
                onChange={() => toggleSportLink(sportLink)}
                edge="end"
                checked={sportLink.isActive}
              />
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDeleteLink(sportLink.id)}
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

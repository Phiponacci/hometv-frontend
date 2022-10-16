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

export default function NewsPage() {
  const [newsLinks, setNewsLinks] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/News`)
      .then((res) => res.json())
      .then((_newsLinks) => setNewsLinks(_newsLinks));
    return () => {};
  }, []);

  const toggleNewsLink = (newsLink) => {
    fetch(`${API_BASE_URL}/News/${newsLink.id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((_newsLink) => {
        setNewsLinks((_links) => {
          const index = _links.indexOf(newsLink);
          const records = [..._links];
          records[index] = newsLink;
          return records;
        });
      });
  };

  const handleAddLink = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newsLink = {
      name: data.get("name"),
      link: data.get("link")
    };
    fetch(`${API_BASE_URL}/News`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsLink),
    })
      .then((res) => res.json())
      .then((savedLink) => setNewsLinks((current) => [savedLink, ...current]));
  };

  const handleDeleteLink = (newsLinkId) => {
    fetch(`${API_BASE_URL}/News/${newsLinkId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedLink) => {
        setNewsLinks((current) =>
          current.filter((newsLink) => newsLink.id !== deletedLink.id)
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
            label="News link"
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
          subheader={<ListSubheader>News Links</ListSubheader>}
        >
          {newsLinks.map((newsLink) => (
            <ListItem key={newsLink.id}>
              <ListItemButton href={newsLink.link} target="_blank">
                <Tooltip title={newsLink.link}>
                  <ListItemText
                    primary={newsLink.name}
                  />
                </Tooltip>
              </ListItemButton>
              <Switch
                onChange={() => toggleNewsLink(newsLink)}
                edge="end"
                checked={newsLink.isActive}
              />
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDeleteLink(newsLink.id)}
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

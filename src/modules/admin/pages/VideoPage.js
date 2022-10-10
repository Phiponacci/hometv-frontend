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

export default function VideoPage() {
  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/Video`)
      .then((res) => res.json())
      .then((_videos) => setVideos(_videos));
    return () => {};
  }, []);

  const deactivateOtherVideos = (video) => {
    fetch(`${API_BASE_URL}/Video/${video.id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((_video) => {
        const _videos = [...videos];
        _videos.forEach((v) => {
          v.active = v.id === video.id;
        });
        setVideos(_videos);
      });
  };

  const handleAddVideo = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const video = {
      link: data.get("link"),
    };
    fetch(`${API_BASE_URL}/Video`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    })
      .then((res) => res.json())
      .then((savedVideo) => setVideos((current) => [savedVideo, ...current]));
  };

  const handleDeleteVideo = (videoId) => {
    fetch(`${API_BASE_URL}/Video/${videoId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedVideo) => {
        setVideos((current) => {
          return current.filter((video) => video.id !== deletedVideo.id);
        });
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
          onSubmit={handleAddVideo}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            fullWidth
            name="link"
            id="outlined-basic"
            label="Video link"
            variant="outlined"
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
          subheader={<ListSubheader>Videos</ListSubheader>}
        >
          {videos.map((video) => (
            <ListItem key={video.id}>
              <ListItemButton href={video.link} target="_blank">
                <Tooltip title={video.link}>
                  <ListItemText primary={video.link.substring(0, 30) + "..."} />
                </Tooltip>
              </ListItemButton>
              <Switch
                onChange={() => deactivateOtherVideos(video)}
                edge="end"
                checked={video.active}
              />
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDeleteVideo(video.id)}
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

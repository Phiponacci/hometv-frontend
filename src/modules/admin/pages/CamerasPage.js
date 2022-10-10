import * as React from "react";

import API_BASE_URL from "../../api";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CamerasPage() {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [cameras, setCameras] = React.useState([]);
  const [error, setError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/Camera`)
      .then((res) => res.json())
      .then((cameras) => {
        setCameras(cameras);
      })
      .catch((error) => setError(true));
    return () => {};
  }, []);

  const handleDeleteCamera = (cameraId) => {
    fetch(`${API_BASE_URL}/Camera/${cameraId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedCamera) => {
        setCameras((current) => {
          return current.filter((cam) => cam.id !== deletedCamera.id);
        });
      });
  };

  const handleAddCamera = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const camera = {
      name: data.get("name"),
      link: data.get("link"),
    };
    fetch(`${API_BASE_URL}/Camera`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camera),
    })
      .then((res) => res.json())
      .then((savedCamera) => {
        setCameras((current) => [...current, savedCamera]);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      });
    setOpen(false);
  };
  return (
    <>
      {error && <h2>Error: Unable to fetch cameras' data!</h2>}
      <ImageList m={{ xs: 2, sm: 5, md: 25, xl: 50 }}>
        {cameras.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.link}?w=248&auto=format`}
              srcSet={`${item.link}?w=248&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background: "green",
                pl: 2,
                pr: 1,
              }}
              title={item.name}
              position="below"
              actionIcon={
                <IconButton
                  sx={{ color: "red" }}
                  aria-label={`${item.title}`}
                  onClick={() => handleDeleteCamera(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Fab
        variant="extended"
        size="medium"
        sx={{
          margin: 0,
          top: "auto",
          right: 40,
          bottom: 70,
          left: "auto",
          position: "fixed",
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
        Add camera
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Camera Feed</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Add a link to a camera feed(link should be an image source)
          </DialogContentText>
          <Box
            id="camera-form"
            component="form"
            onSubmit={handleAddCamera}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="link"
              name="link"
              type="url"
              label="Camera feed link"
              fullWidth
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {loading && <CircularProgress />}
          <Button onClick={handleClose}>Cancel</Button>
          <Button form="camera-form" type="submit" color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Camera added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

import * as React from "react";

import API_BASE_URL from "../../api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";

export default function LocalHeadlinesPage() {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/LocalHeadline`)
      .then((res) => res.json())
      .then((_news) => setNews(_news));
    return () => {};
  }, []);

  const toggleHeadline = (_record) => {
    fetch(`${API_BASE_URL}/LocalHeadline/${_record.id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((record) => {
        setNews(_news=>{
          const index = _news.indexOf(_record);
          const records = [..._news];
          records[index] = record;
          return records;
        })
      });
  };

  const [datetime, setDatetime] = React.useState(dayjs());

  const handleDatetimeChange = (newValue) => {
    setDatetime(newValue);
  };

  const handleAddHeadline = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const record = {
      headlineDateTime: datetime,
      headline: data.get("headline"),
      isActive: true,
    };
    fetch(`${API_BASE_URL}/LocalHeadline`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((res) => res.json())
      .then((savedRecord) => setNews((current) => [savedRecord, ...current]));
  };

  const handleDeleteNewsRecord = (id) => {
    fetch(`${API_BASE_URL}/LocalHeadline/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedRecord) => {
        setNews((current) => {
          return current.filter((record) => record.id !== deletedRecord.id);
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
          id="headlines-form"
          component="form"
          onSubmit={handleAddHeadline}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ display: "inline" }}
          >
            <TextField
              fullWidth
              required
              name="headline"
              id="outlined-basic"
              label="Headline text"
              variant="outlined"
              sx={{
                mb: 3,
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Headline Datetime"
                value={datetime}
                onChange={handleDatetimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ my: 2 }}>
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          </Grid>
        </Box>
        <List
          display="flex"
          sx={{ width: "100%", bgcolor: "background.paper" }}
          subheader={<ListSubheader>Local Headlines</ListSubheader>}
        >
          {news.map((record) => (
            <ListItem key={record.id}>
              <ListItemButton href={record.headline} target="_blank">
                <Tooltip title={record.headline}>
                  <ListItemText
                    primary={record.headline.substring(0, 30) + "..."}
                  />
                </Tooltip>
              </ListItemButton>
              <Switch
                onChange={() => toggleHeadline(record)}
                edge="end"
                checked={record.isActive}
              />
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDeleteNewsRecord(record.id)}
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

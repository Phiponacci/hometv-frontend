import * as React from "react";

import API_BASE_URL from "../../api";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

export default function SportsPage() {
  const [sports, setSports] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/sports`)
      .then((res) => res.json())
      .then((_sportLinks) => setSports(_sportLinks));
    return () => {};
  }, []);

  const toggleSportLink = (sport) => {
    fetch(`${API_BASE_URL}/sports/toggle/${sport.key}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((_sport) => {
        setSports((_sports) => {
          const index = _sports.indexOf(sport);
          const records = [..._sports];
          records[index] = _sport;
          return records;
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
        
        <List
          display="flex"
          sx={{ width: "100%", bgcolor: "background.paper" }}
          subheader={<ListSubheader>Sports</ListSubheader>}
        >
          {sports.map((sport) => (
            <ListItem key={sport.key}>
              <ListItemButton>
                <Tooltip title={sport.description}>
                  <ListItemText
                    primary={sport.title}
                  />
                </Tooltip>
              </ListItemButton>
              <Switch
                onChange={() => toggleSportLink(sport)}
                edge="end"
                checked={sport.isActive}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { Outlet } from "react-router-dom";
import Paper from "@mui/material/Paper";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import VideocamIcon from "@mui/icons-material/Videocam";

const NavBar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <AppBar position="sticky" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar src="/logo.png" sx={{mr: 1}} variant="rounded"/>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
              target="_blank"
            >
              HOME TV
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
              >
                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                >
                  <BottomNavigationAction
                    label="Weather"
                    icon={<NightsStayIcon />}
                    component={Link}
                    to="/admin/weather"
                  />
                  <BottomNavigationAction
                    label="Local Headlines"
                    icon={<NewspaperIcon />}
                    component={Link}
                    to="/admin/localheadlines"
                  />
                  <BottomNavigationAction
                    label="News"
                    icon={<NewspaperIcon />}
                    component={Link}
                    to="/admin/news"
                  />
                  <BottomNavigationAction
                    label="Cameras"
                    icon={<VideocamIcon />}
                    component={Link}
                    to="/admin/cameras"
                  />
                  <BottomNavigationAction
                    label="Sports"
                    icon={<SportsSoccerIcon />}
                    component={Link}
                    to="/admin/sports"
                  />
                </BottomNavigation>
              </Paper>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HOME TV
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                startIcon={<NightsStayIcon />}
                sx={{ m: 2, color: "white" }}
                component={Link}
                to="/admin/weather"
              >
                Weather
              </Button>

              <Button
                startIcon={<NewspaperIcon />}
                sx={{ m: 2, color: "white" }}
                component={Link}
                to="/admin/localheadlines"
              >
                Local Headlines
              </Button>

              <Button
                startIcon={<NewspaperIcon />}
                sx={{ m: 2, color: "white" }}
                component={Link}
                to="/admin/news"
              >
                News
              </Button>

              <Button
                startIcon={<VideocamIcon />}
                sx={{ m: 2, color: "white" }}
                component={Link}
                to="/admin/cameras"
              >
                Cameras
              </Button>
              <Button
                startIcon={<SportsSoccerIcon />}
                sx={{ m: 2, color: "white" }}
                component={Link}
                to="/admin/sports"
              >
                Sports
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ m: 5 }}>
        <Outlet />
      </Box>
    </div>
  );
};
export default NavBar;

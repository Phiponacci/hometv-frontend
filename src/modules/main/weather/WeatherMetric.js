import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WeatherMetric({ icon, title="", value }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Avatar
        src={icon}
        variant="square"
        sx={{
          padding: 0.5,
          marginRight: 1,
          width: 24,
          height: 24,
        }}
      />
      <Typography color="white" variant="subtitle1" display="block" gutterBottom>
        {title} {value}
      </Typography>
    </Box>
  );
}

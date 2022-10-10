import * as React from "react";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";

export default function NewsPage() {
  console.log("Video page");
  return (
    <div>
      Video
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          With a start adornment
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
      </FormControl>
    </div>
  );
}

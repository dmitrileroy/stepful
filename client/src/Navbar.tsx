import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavbarProps } from "../types";

export default function DenseAppBar({ name }: NavbarProps): JSX.Element {
  return (
    <Box sx={{ flexGrow: 0, zIndex: 1000 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            {"Welcome, " + name + "!"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

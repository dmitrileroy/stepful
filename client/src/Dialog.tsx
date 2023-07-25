import React from "react";
import { styled, Paper } from "@mui/material";
import { DialogProps } from "../types";

const Main = styled(Paper)({
  height: "400px",
  width: "650px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Dialog = ({ children }: DialogProps): JSX.Element => {
  return <Main elevation={2}>{children}</Main>;
};

export default Dialog;

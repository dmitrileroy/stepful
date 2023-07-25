import React from "react";
import { styled, Typography } from "@mui/material";

const Main = styled("main")({
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
});

const NotFound = (): JSX.Element => {
  return (
    <Main>
      <Typography variant={"h4"}>404 | Not Found</Typography>
    </Main>
  );
};

export default NotFound;

import React from "react";
import { styled, Button } from "@mui/material";
import Dialog from "./Dialog";
import { Link } from "react-router-dom";

const Main = styled("main")({
  height: "100vh",
  width: "100wv",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgb(243, 250, 255)",
});

const ButtonGroup = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "300px",
});

const Title = styled("h4")({
  marginTop: "0px"
});

function App() {
  return (
    <Main>
      <Dialog>
        <Title>Welcome to Stepful Educational Portal!</Title>
        <ButtonGroup>
          <Link to={"login"} state={{ role: "student" }}>
            <Button variant="contained">Student</Button>
          </Link>
          <Link to={"login"} state={{ role: "coach" }}>
            <Button variant="contained">Coach</Button>
          </Link>
        </ButtonGroup>
      </Dialog>
    </Main>
  );
}

export default App;

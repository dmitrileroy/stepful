import React, { useState } from "react";
import { flushSync } from "react-dom";
import { styled, TextField } from "@mui/material";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

import { RegData } from "../types";

import Dialog from "./Dialog";

const Main = styled("main")({
  height: "100vh",
  width: "100wv",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgb(243, 250, 255)",
});

const LoginPrompt = styled("div")({
  fontSize: "14px",
});

const Button = styled(LoadingButton)({
  height: "40px",
});

const SignupPrompt = styled("h4")({
  margin: "0px 0px 20px 0px",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  margin: "0px 0px 20px 0px",
  gap: "10px",
});

const Signup = (): JSX.Element => {
  let { state } = useLocation();
  const [regData, setRegData] = useState<RegData>({
    email: "",
    password: "",
    name: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [regError, setRegError] = useState(false);
  //display message of internal error
  const [serverError, setServerError] = useState(false);

  const navigate = useNavigate();

  if (state === null) {
    return <Navigate to="/" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmailError(false);
    } else if (e.target.name === "name") {
      setNameError(false);
    } else if (e.target.name === "password") {
      setPasswordError(false);
    }
    setRegData({ ...regData, [e.target.name]: e.target.value } as RegData);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!regData.email.trim()) {
      setEmailError(true);
    }
    if (!regData.name.trim()) {
      setNameError(true);
    }
    if (!regData.password.trim()) {
      setPasswordError(true);
    }

    let hasError =
      !regData.email.trim() || !regData.name.trim() || !regData.password.trim();
    if (hasError) {
      return;
    } else {
      flushSync(() => {
        setIsLoading(true);
      });
      try {
        const resp = await axios.post("/signup", {
          ...regData,
          role: state.role,
        });
        if (resp.data.status === "ok") {
          navigate(`/${state.role}/${resp.data.id}`, {
            state: { role: state.role, name: regData.name, id: resp.data.id },
          });
        } else {
          setRegError(true);
        }
      } catch (err) {
        console.log("error", err);
        setServerError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  let emailHelperText = emailError ? "Please enter email" : "";
  let nameHelperText = nameError ? "Please enter name" : "";
  let passwordHelperText = passwordError ? "Please enter password" : "";

  return (
    <Main>
      <Dialog>
        <SignupPrompt> Signup </SignupPrompt>
        <Form>
          <TextField
            name="email"
            error={Boolean(emailHelperText)}
            size="small"
            id="outlined-required"
            label="Email"
            onChange={handleChange}
            helperText={emailHelperText}
          />
          <TextField
            error={Boolean(passwordHelperText)}
            type="password"
            name="password"
            size="small"
            id="outlined-required"
            label="Password"
            onChange={handleChange}
            helperText={passwordHelperText}
          />
          <TextField
            error={Boolean(nameHelperText)}
            name="name"
            size="small"
            id="outlined-required"
            label="Name"
            onChange={handleChange}
            helperText={nameHelperText}
          />
          <Button
            variant="contained"
            size="medium"
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
        <LoginPrompt>
          <span>Go back to </span>
          <Link to="/login" state={state}>
            Login
          </Link>
        </LoginPrompt>
      </Dialog>
    </Main>
  );
};

export default Signup;

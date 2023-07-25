import React, { useState } from "react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled, TextField } from "@mui/material";
import { flushSync } from "react-dom";
import axios from "axios";
import { LoginData } from "../types";

const Main = styled("main")({
  height: "100vh",
  width: "100wv",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgb(243, 250, 255)",
});

const Button = styled(LoadingButton)({
  height: "40px",
});

const LoginPrompt = styled("h4")({
  margin: "0px 0px 20px 0px",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  margin: "0px 0px 20px 0px",
  gap: "10px",
});

const SignupPrompt = styled("div")({
  fontSize: "14px",
});

const LoginError = styled("p")({
  fontSize: "14px",
  color: "red",
});

const Login = (): JSX.Element => {
  let { state } = useLocation();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [regError, setRegError] = useState(false);
  //display message of internal error
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let emailHelperText = emailError ? "Please enter email" : "";
  let passwordHelperText = passwordError ? "Please enter password" : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegError(false);
    if (e.target.name === "email") {
      setEmailError(false);
    } else if (e.target.name === "password") {
      setPasswordError(false);
    }
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    } as LoginData);
  };

  const handleSubmit = async () => {
    if (!loginData.email.trim()) {
      setEmailError(true);
    }
    if (!loginData.password.trim()) {
      setPasswordError(true);
    }

    let hasError = !loginData.email.trim() || !loginData.password.trim();
    if (hasError) {
      return;
    } else {
      flushSync(() => {
        setIsLoading(true);
      });
      try {
        const resp = await axios.post(
          "/login",
          { role: state.role },
          {
            auth: { username: loginData.email, password: loginData.password },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (resp.data.status === "ok") {
          navigate(`/${state.role}/${resp.data.id}`, {
            state: { role: state.role, name: resp.data.name, id: resp.data.id },
          });
        } else {
          setRegError(true);
        }
      } catch (err) {
        console.log("error", err);
        setRegError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (state === null) {
    return <Navigate to="/" />;
  }

  return (
    <Main>
      <Dialog>
        <LoginPrompt> Login </LoginPrompt>
        {regError && <LoginError>Incorrect credentials</LoginError>}
        <Form>
          <TextField
            error={Boolean(emailHelperText)}
            size="small"
            name="email"
            id="outlined-required"
            label="Email"
            onChange={handleChange}
            helperText={emailHelperText}
          />
          <TextField
            error={Boolean(passwordHelperText)}
            size="small"
            name="password"
            id="outlined-required"
            label="Password"
            onChange={handleChange}
            helperText={passwordHelperText}
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
        <SignupPrompt>
          <span>Don't have a password? </span>
          <Link to="/signup" state={state}>
            Signup
          </Link>
        </SignupPrompt>
      </Dialog>
    </Main>
  );
};

export default Login;

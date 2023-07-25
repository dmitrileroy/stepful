import React from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import { styled, CircularProgress } from "@mui/material";
import Navbar from "./Navbar";
import { useFetchAppointments } from "./useFetchAppointments";
import { useLocation } from "react-router-dom";

const Section = styled("section")({
  display: "flex",
  justifyContent: "center",
  height: "100%",
  alignItems: "center",
});

const Main = styled("main")({
  height: "100vh",
});

const ErrorMessage = styled("p")({
  fontSize: "18px",
});

const Coach = (): JSX.Element => {
  const location = useLocation();
  const { role, id, name } = location.state ?? { role: "", id: "", name: "" };
  const { error, isLoading, appointments, setAppointments } =
    useFetchAppointments({ role, id });
  return (
    <Main>
      <Navbar name={name} />
      <Section>
        {isLoading && <CircularProgress />}
        {error && (
          <ErrorMessage>Error occured. Please try again later</ErrorMessage>
        )}
        {!isLoading && !error && (
          <WeeklyCalendar
            allAppointments={appointments}
            appointments={appointments}
            setAppointments={setAppointments}
          />
        )}
      </Section>
    </Main>
  );
};

export default Coach;

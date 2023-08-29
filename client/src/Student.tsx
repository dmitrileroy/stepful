import React, { useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import {
  styled,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import Navbar from "./Navbar";
import { useFetchAppointments } from "./useFetchAppointments";
import { useLocation } from "react-router-dom";
import { Appointment } from "../types";

type Option = {
  name: string;
  id: string;
};

const Section = styled("section")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Main = styled("main")({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  justifyContent: "center",
});

const AutocompleteWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "40px",
});

const ErrorMessage = styled("p")({
  fontSize: "18px",
});

const Student = (): JSX.Element => {
  const location = useLocation();
  const { role, id, name } = location.state ?? { role: "", id: "", name: "" };
  const options = [{ name: "self", id }];
  const [value, setValue] = useState<Option>({ name: "self", id });
  const { error, isLoading, appointments, setAppointments, allCoaches } =
    useFetchAppointments({ role, id });
  if (allCoaches?.length) {
    options.push(...allCoaches);
  }

  const filteredAppointments = appointments.filter((appt: Appointment) => {
    if (value.name === "self") {
      return appt.studentid === value.id;
    } else {
      return appt.coachid === value.id;
    }
  });

  return (
    <Main>
      <Navbar name={name} />
      { !error && (
        <AutocompleteWrapper>
          <Autocomplete
            disableClearable
            value={value}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: Option | null
            ) => {
              if (newValue) setValue(newValue);
            }}
            getOptionLabel={(option: Option) => option.name || ""}
            options={options}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Calendar"
                variant="standard"
              />
            )}
          />
        </AutocompleteWrapper>
      )}

      <Section>
        {/* {isLoading && <CircularProgress />} */}
        {error && (
          <ErrorMessage>Error occured. Please try again later</ErrorMessage>
        )}
        {!error && (
          <WeeklyCalendar
            appointments={filteredAppointments}
            allAppointments={appointments}
            setAppointments={setAppointments}
            isSelf={value.name === "self"}
          />
        )}
      </Section>
    </Main>
  );
};

export default Student;

import React, { useState, useCallback } from "react";
import { format, addDays, subDays, set } from "date-fns";
import { Card, Typography, styled } from "@mui/material";
import { Button } from "@mui/material";
import Appointment from "./Appointment";
import { WeeklyCalendarProps } from "../types";

const Calendar = styled("div")({
  width: "900px",
});

const Header = styled("div")({
  height: "50px",
  borderRight: "0.5px solid #ccc",
  borderBottom: "0.5px solid #ccc",
});

const Main = styled(Card)({
  width: "950px",
});

const Internal = styled("div")({
  display: "flex",
  width: "950px",
});

const Time = styled("div")({
  width: "50px",
});

const Title = styled(Typography)({});

const Navigation = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "50px",
  width: "950px",
  borderBottom: "0.5px solid #ccc",
});

const Day = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "5px",
});

const Days = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
});

const DayLabel = styled("div")({
  fontWeight: "bold",
  fontSize: "14px",
  textTransform: "uppercase",
  marginBottom: "5px",
});

const DayNumber = styled("div")({
  fontSize: "16px",
});

const DayColumn = styled("div")({});

const Schedule = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  overflow: "scroll",
});

const Cell = styled("div")({
  height: "100px",
  border: "0.5px solid #ccc",
});

const TimeCell = styled("div")({
  height: "100px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  fontSize: "10px",
  marginRight: "5px",
});

const WeeklyCalendar = ({
  appointments,
  allAppointments,
  setAppointments,
  isSelf,
}: WeeklyCalendarProps): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(currentDate, i);
    daysOfWeek.push(day);
  }

  const prevWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const setDate = useCallback(
    (day: Date, hour: number): Date => set(day, { hours: hour, minutes: 0 }),
    []
  );

  return (
    <Main elevation={9}>
      <Navigation>
        <Button onClick={prevWeek}>Previous Week</Button>
        <Title variant="h6">
          {format(daysOfWeek[0], "MMMM do, yyyy")} -{" "}
          {format(daysOfWeek[6], "MMMM do, yyyy")}
        </Title>
        <Button onClick={nextWeek}>Next Week</Button>
      </Navigation>
      <Internal>
        <Time>
          <Header />
          {["10am", "12pm", "2pm", "4pm", "6pm", "8pm"].map((time, i) => (
            <TimeCell key={time}>{time}</TimeCell>
          ))}
        </Time>
        <Calendar>
          <Days className="days">
            {daysOfWeek.map((day, i) => (
              <Day key={i} className="day">
                <DayLabel>{format(day, "EEEE")}</DayLabel>
                <DayNumber>{format(day, "d")}</DayNumber>
              </Day>
            ))}
          </Days>
          <Schedule>
            {daysOfWeek.map((day, i) => (
              <DayColumn key={i}>
                {[10, 12, 14, 16, 18, 20].map((hour, i) => (
                  <Cell key={i}>
                    <Appointment
                      setAppointments={setAppointments}
                      appointments={appointments}
                      allAppointments={allAppointments}
                      date={setDate(day, hour)}
                      day={day}
                      hour={hour}
                      isSelf={isSelf}
                    />
                  </Cell>
                ))}
              </DayColumn>
            ))}
          </Schedule>
        </Calendar>
      </Internal>
    </Main>
  );
};

export default WeeklyCalendar;

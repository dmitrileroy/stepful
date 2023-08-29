import React, { useState } from "react";
import { AppointmentProps } from "../types";
import { styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import AddAppointmentDialog from "./AddAppointmentDialog";
import { set } from "date-fns";

type CellProps = {
  props: { appointmentStatus: string; isPrevious: boolean, isNewlyBooked: boolean, role: string};
};

const AppointmentMain: any = styled("div", {
  shouldForwardProp: (prop) => !["props"].includes(prop.toString()),
})<CellProps>(({ props }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: props.isPrevious
    ? "grey"
    : props.appointmentStatus === "available"
    ? "rgb(84, 199, 84)"
    : props.appointmentStatus === "booked" && (props.isNewlyBooked || props.role === "coach") 
    ? "rgb(255, 130, 41)"
    : "transparent",
}));

const Status = styled("div")({
  color: "white",
  margin: "0px 0px 5px 10px",
  fontSize: "14px",
});

const Appointment = ({
  setAppointments,
  appointments,
  allAppointments,
  date,
  day,
  hour,
  isSelf,
}: AppointmentProps): JSX.Element => {
  const location = useLocation();
  const { role, id } = location.state ?? { role: "", id: "" };
  const appointment = appointments?.find(
    (appt) =>
      new Date(appt?.starttime).getHours() ===
        new Date(set(day, { hours: hour, minutes: 0 })).getHours() &&
      new Date(appt?.starttime).getMonth() ===
        new Date(set(day, { hours: hour, minutes: 0 })).getMonth() &&
      new Date(appt?.starttime).getDate() ===
        new Date(set(day, { hours: hour, minutes: 0 })).getDate()
  );

  const isPrevious = appointment
    ? new Date(appointment.starttime) < new Date()
    : false;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isNewlyBooked = appointment?.isNewlyBooked ?? false;
  const appointmentStatus = appointment?.bookingstatus
    ? appointment.bookingstatus
    : "empty";
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (
      (appointment && role === "coach") ||
      (!appointment && role === "student") ||
      (appointment?.bookingstatus === "booked" && role === "student") ||
      isSelf ||
      isPrevious
    ) {
      return;
    } else {
      setIsDialogOpen(true);
    }
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <AppointmentMain
      props={{ appointmentStatus, isPrevious, isNewlyBooked, role }}
      onClick={handleClick}
    >
      <AddAppointmentDialog
        open={isDialogOpen}
        onClose={handleClose}
        setAppointments={setAppointments}
        appointments={appointments}
        allAppointments={allAppointments}
        appointment={appointment}
        date={date}
        role={role}
      />
      {appointment?.bookingstatus === "available" && !isPrevious && (
        <Status>available</Status>
      )}
      {appointment?.bookingstatus === "booked" && (
        <div>
          <Status>booked</Status>
          {!isSelf && <Status>{appointment.studentname}</Status>}
          {role === "student" && <Status>{appointment.coachname}</Status>}
          {appointment?.isNewlyBooked && (
            <Status>Sorry, just booked by {appointment.studentname}</Status>
          )}
        </div>
      )}
    </AppointmentMain>
  );
};

export default Appointment;

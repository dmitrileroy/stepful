import React, { useState } from "react";
import { styled, Dialog, Paper, Button } from "@mui/material";
import { AddAppointmentDialogProps, Appointment } from "../types";
import { useLocation } from "react-router-dom";
import axios from "axios";

const InternalDialog = styled(Paper)({
  height: "200px",
  width: "380px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
});

const ButtonWrapper = styled(Button)({
  width: "90px",
});

const Prompt = styled("p")({
  marginBottom: "30px",
});

const ButtonGroup = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const AddAppointmentDialog = ({
  open,
  onClose,
  setAppointments,
  appointments,
  allAppointments,
  appointment,
  date,
  role,
}: AddAppointmentDialogProps): JSX.Element => {
  const location = useLocation();
  const [err, setError] = useState(false);
  const { id, name } = location.state ?? null;

  const handleAppointment = async () => {
    try {
      if (!appointment && id) {
        const resp = await axios.post(`/coach/${id}/addAppointment`, { date });
        let apptId = resp.data.id;
        let createdAppointment = {
          id: apptId,
          coachid: id,
          coachname: location.state.name,
          bookingstatus: "available",
          starttime: date,
        };
        setAppointments([...allAppointments, createdAppointment]);
        onClose();
      } else if (appointment && id && role === "student") {
        await axios.patch(
          `/student/${id}/appointments/${appointment.id}/bookAppointment`
        );
        const updatedAppointment = {
          id: appointment.id,
          coachid: appointment.coachid,
          coachname: appointment.coachname,
          studentid: id,
          studentname: name,
          bookingstatus: "booked",
          starttime: date,
        };
        const filteredAppointments = allAppointments.filter(
          (appt: Appointment) => appt.id !== updatedAppointment.id
        );
        setAppointments([...filteredAppointments, updatedAppointment]);
        onClose();
      } else {
        return;
      }
    } catch (err) {
      setError(true);
    }
  };
  const shouldRender =
    (!appointment && role === "coach") || (appointment && role === "student");
  return (
    <Dialog open={open} onClose={onClose}>
      <InternalDialog>
        {shouldRender && (
          <div>
            <Prompt>Schedule an appointment for {date.toDateString()} </Prompt>
            <ButtonGroup>
              <ButtonWrapper variant={"contained"} onClick={handleAppointment}>
                Schedule
              </ButtonWrapper>
              <ButtonWrapper
                variant={"contained"}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Close
              </ButtonWrapper>
            </ButtonGroup>
          </div>
        )}
      </InternalDialog>
    </Dialog>
  );
};

export default AddAppointmentDialog;

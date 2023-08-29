import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetchAppointmentsProps } from "../types";
import { Appointment } from "../types";

export const useFetchAppointments = ({
  role,
  id,
}: useFetchAppointmentsProps) => {
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allCoaches, setAllCoaches] = useState([]);

  const getAppointments = async () => {
    try {
      let url =
        role === "coach"
          ? `/coach/${id}/getAllAppointments/`
          : `/student/getAllAppointments`;
      const apps = await axios.get(url);
      const newAppts = apps.data.data ?? [];

      const updatedAppts = newAppts.map((newAppt: Appointment) => {
        const existingAppointment = appointments.find(
          (existingAppt: Appointment) => existingAppt.id === newAppt.id
        );
        if (existingAppointment) {
          if (
            existingAppointment.bookingstatus === "available" &&
            newAppt.bookingstatus === "booked"
          ) {
            newAppt.isNewlyBooked = true;
          } else {
            newAppt.isNewlyBooked = false;
          }
        } else {
          newAppt.isNewlyBooked = false;
        }
        
        return newAppt;
      });
      setAppointments(updatedAppts);

      if (role === "student") {
        let url = `/student/getAllCoaches`;
        const apps = await axios.get(url);
        setAllCoaches(apps.data.data ?? []);
      }
    } catch (err) {
      console.log("error", err);
      setError(true);
    } finally {
      if (role === "student") {
        setTimeout(() => {
          getAppointments();
        }, 5000);
      }
    }}

  useEffect(() => {
    getAppointments();
  }, []);

  return { error, isLoading, appointments, setAppointments, allCoaches };
};

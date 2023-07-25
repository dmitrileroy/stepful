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
      setIsLoading(true);
      let url =
        role === "coach"
          ? `/coach/${id}/getAllAppointments/`
          : `/student/getAllAppointments`;
      const apps = await axios.get(url);
      setAppointments(apps.data.data ?? []);
      if (role === "student") {
        let url = `/student/getAllCoaches`;
        const apps = await axios.get(url);
        setAllCoaches(apps.data.data ?? []);
      }
    } catch (err) {
      console.log("error", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return { error, isLoading, appointments, setAppointments, allCoaches };
};

export type DialogProps = {
  children?: React.ReactNode;
};

export type RegData = {
  email: string;
  password: string;
  name: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type NavbarProps = {
  name: string;
};

export type AppointmentProps = {
  appointments: Array<Appointment>;
  allAppointments: Array<Appointment>;
  date: Date;
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  day: Date;
  hour: number;
  isSelf?: boolean
};

export type useFetchAppointmentsProps = {
  role: string;
  id: string;
};

export type Appointment = {
  id: string;
  coachid: string;
  coachname: string;
  starttime: Date;
  bookingstatus: string;
  studentid?: string;
  studentname?: string;
};

export type WeeklyCalendarProps = {
  appointments: Array<Appointment>;
  allAppointments: Array<Appointment>;
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  isSelf?: boolean
};

export type AddAppointmentDialogProps = {
  open: boolean;
  onClose: () => void;
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  allAppointments:Array<Appointment>;
  appointment: Appointment | undefined;
  date: Date;
  appointments:Array<Appointment>;
  role?: string
};

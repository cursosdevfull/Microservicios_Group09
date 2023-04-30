import { CreateResult } from "../../infrastructure/appointment.infrastructure";
import { Appointment } from "../appointment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<CreateResult>;
}

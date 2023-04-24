import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";
import { CreateResult } from "../infrastructure/appointment.infrastructure";

export class AppointmentApplication {
  constructor(private repository: AppointmentRepository) {}

  async create(appointment: Appointment): Promise<CreateResult> {
    return await this.repository.create(appointment);
  }
}

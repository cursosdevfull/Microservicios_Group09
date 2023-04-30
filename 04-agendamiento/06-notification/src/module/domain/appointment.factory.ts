import { err, ok, Result } from "neverthrow";
import { validate } from "uuid";

import { IError } from "../../helpers/Error";
import { Appointment, AppointmentProperties } from "./appointment";

export type CreateAppointmentResult = Result<Appointment, IError>;
export class AppointmentFactory {
  static create(
    id: string,
    patientName: string,
    date: string,
    specialtyId: number,
    doctorId: number,
    centerId: number,
    countryISO: string
  ): Promise<CreateAppointmentResult> {
    if (!validate(id)) {
      const error = new IError();
      error.message = "ID is not valid";
      error.status = 411;
      error.stack = "";
      return Promise.resolve(err(error));
    }

    const appointmentProperties: AppointmentProperties = {
      id,
      patientName,
      date,
      specialtyId,
      doctorId,
      centerId,
      countryISO,
    };

    return Promise.resolve(ok(new Appointment(appointmentProperties)));
  }
}

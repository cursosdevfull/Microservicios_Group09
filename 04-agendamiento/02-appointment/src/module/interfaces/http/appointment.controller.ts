import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { IError } from "../../../helpers/Error";
import { AppointmentApplication } from "../../application/appointment.application";
import { AppointmentFactory } from "../../domain/appointment.factory";
import { ValidatorCreateAppointment } from "./validators/create-appointment";

export default class {
  constructor(private readonly application: AppointmentApplication) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const validatorCreateAppointment = new ValidatorCreateAppointment();
    validatorCreateAppointment.patientName = req.body.patientName;
    validatorCreateAppointment.date = req.body.date;
    validatorCreateAppointment.specialtyId = req.body.specialtyId;
    validatorCreateAppointment.doctorId = req.body.doctorId;
    validatorCreateAppointment.centerId = req.body.centerId;
    validatorCreateAppointment.countryISO = req.body.countryISO;

    const errors = await validate(validatorCreateAppointment);
    if (errors.length > 0) {
      const error = new IError();
      error.message = errors.toString();
      error.status = 411;
      error.stack = errors.toString();

      return next(error);
    }

    const appointmentResult = await AppointmentFactory.create(
      uuidv4(),
      req.body.patientName,
      req.body.date,
      +req.body.specialtyId,
      +req.body.doctorId,
      +req.body.centerId,
      req.body.countryISO
    );

    if (appointmentResult.isErr()) {
      const error = new IError();
      error.message = appointmentResult.error.message;
      error.status = appointmentResult.error.status;
      error.stack = appointmentResult.error.stack;

      return next(error);
    }

    const appointmentCreated = await this.application.create(
      appointmentResult.value
    );

    if (appointmentCreated.isErr()) {
      const error = new IError();
      error.message = appointmentCreated.error.message;
      error.status = appointmentCreated.error.status;
      error.stack = appointmentCreated.error.stack;

      return next(error);
    }

    res.json(appointmentCreated.value);
  }
}

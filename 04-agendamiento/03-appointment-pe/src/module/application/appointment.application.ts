import { Appointment } from "../domain/appointment";
import { BrokerApplication } from "./broker.application";

export class AppointmentApplication {
  constructor(private readonly brokerApplication: BrokerApplication) {}

  async create(appointment: Appointment) {
    const routingKey = appointment.properties().countryISO;
    this.brokerApplication.sent(appointment, routingKey);
    //return await this.repository.create(appointment);
  }
}

export interface AppointmentRequired {
  id: string;
  patientName: string;
  date: string;
  specialtyId: number;
  doctorId: number;
  centerId: number;
  countryISO: string;
}

export type AppointmentProperties = AppointmentRequired;

export class Appointment {
  private readonly id: string;
  private patientName: string;
  private readonly date: string;
  private specialtyId: number;
  private doctorId: number;
  private centerId: number;
  private countryISO: string;

  constructor(properties: AppointmentProperties) {
    Object.assign(this, properties);
  }

  properties(): AppointmentProperties {
    return {
      id: this.id,
      patientName: this.patientName,
      date: this.date,
      specialtyId: this.specialtyId,
      doctorId: this.doctorId,
      centerId: this.centerId,
      countryISO: this.countryISO,
    };
  }
}

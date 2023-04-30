import { Type } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export enum COUNTRY_ISO {
  CO = "CO",
  PE = "PE",
}
export class ValidatorCreateAppointment {
  @IsNotEmpty()
  @IsString()
  patientName: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  specialtyId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  doctorId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  centerId: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(COUNTRY_ISO)
  countryISO: string;
}

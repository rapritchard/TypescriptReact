export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
 | HealthCheckEntry
 | HospitalEntry
 | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

import { Patient, Gender, Entry } from "./types";

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isArray = (param: any): param is Array<any> => {
  return Array.isArray(param);
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseToString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param}`);
  }

  return param;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !isArray(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

export const toPatient = (object: any): Patient => {
  return {
    id: parseToString(object.id, "id"),
    name: parseToString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseToString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseToString(object.occupation, "occupation"),
    entries: parseEntries(object.entries),
  };
};

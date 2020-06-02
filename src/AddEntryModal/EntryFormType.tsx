import React, { useCallback } from "react";
import { Form, Dropdown, DropdownProps, Divider } from "semantic-ui-react";
import * as yup from "yup";

import { EntryType, EntryFormValues } from "../types";
import { AddEntryForm} from "./AddEntryForm";

const options = [
  {
    key: EntryType.HealthCheck,
    value: EntryType.HealthCheck,
    text: 'Health Check'
  },
  {
    key: EntryType.Hospital,
    value: EntryType.Hospital,
    text: 'Hospital'
  },
  {
    key: EntryType.OccupationalHealthCare,
    value: EntryType.OccupationalHealthCare,
    text: 'Occupational HealthCare'
  },
];

const baseSchema = yup.object().shape({
  description: yup.string().required(),
  date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Enter date in YYYY-MM-DD Format.").required(),
  specialist: yup.string().required(),
  diagnosisCodes: yup.array().of(yup.string()),
});

const healthCheckSchema = 
  yup.object().shape({
    description: yup.string().required(),
    date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Enter date in YYYY-MM-DD Format.").required(),
    specialist: yup.string().required(),
    diagnosisCodes: yup.array().of(yup.string()),
    healthCheckRating: yup
      .number()
      .typeError("Health check rating must be a number")
      .min(0)
      .max(3)
      .required("Please enter a rating from 0 (great) - 3 (critical"),
  });


const hospitalSchema = 
  yup.object().shape({
    description: yup.string().required(),
    date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Enter date in YYYY-MM-DD Format.").required(),
    specialist: yup.string().required(),
    diagnosisCodes: yup.array().of(yup.string()),
    discharge: yup
      .object({
        date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Enter discharge date in YYYY-MM-DD Format.").required(),
        criteria: yup.string().required('Discharge criteria is a required field'),
      })
      .required(),
  });

const occupationalHealthCareSchema =
  yup.object().shape({
    description: yup.string().required(),
    date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Enter date in YYYY-MM-DD Format.").required(),
    specialist: yup.string().required(),
    diagnosisCodes: yup.array().of(yup.string()),
    employerName: yup.string().required(),
    sickLeave: yup
      .object({
        startDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Enter sick leave start date in YYYY-MM-DD Format.").required(),
        endDAte: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Enter sick leave end date in YYYY-MM-DD Format.").required(),
      })
      .required(),
  });


const baseInitialValues = {
  description: "",
  date: "",
  specialist: "",
};

const healthCheckInitialValues: EntryFormValues = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
};

const hospitalInitialValues: EntryFormValues = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: {
    date: "",
    criteria: "",
  },
};

const occupationalHealthCareInitialValues: EntryFormValues = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthCare,
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: "",
  },
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const EntryFormType: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = React.useState<EntryType>(EntryType.HealthCheck);

  const handleChange = (_e: React.SyntheticEvent, { value }: DropdownProps): void => {
    if (value) {
      setEntryType(value as EntryType);
    }
  };

  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddEntryForm
            initialValues={healthCheckInitialValues}
            validationSchema={healthCheckSchema}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        );
      case EntryType.Hospital:
        return (
          <AddEntryForm
            initialValues={hospitalInitialValues}
            validationSchema={hospitalSchema}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        );
      case EntryType.OccupationalHealthCare:
        return (
          <AddEntryForm
            initialValues={occupationalHealthCareInitialValues}
            validationSchema={occupationalHealthCareSchema}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        );
      default:
        return null;
    }
  }, [entryType, onCancel, onSubmit]);

  return (
    <>
      <Form>
        <Form.Field>
          <label>Entry Type</label>
          <Dropdown
            fluid
            onChange={handleChange}
            options={options}
            selection
            value={entryType}
          />
        </Form.Field>
      </Form>

      <Divider />

      {entryForm()}
    </>
  );
};

export default EntryFormType;
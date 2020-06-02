import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { ObjectSchema } from "yup";

import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryFormValues, EntryType } from "../types";

 interface Props {
  initialValues: EntryFormValues;
  validationSchema: ObjectSchema;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
 }

 export const AddEntryForm: React.FC<Props> = ({ initialValues, validationSchema, onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      enableReinitialize 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === EntryType.HealthCheck && (
               <Field
               label="Health Check Rating"
               name="healthCheckRating"
               component={NumberField}
               min={0}
               max={3}
             />
            )}
            {values.type === EntryType.Hospital && (
              <>
               <Header size="small">Discharge</Header>
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === EntryType.OccupationalHealthCare && (
              <>
                <Field
                  label="Employer name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Header size="small">Sick Leave</Header>
                <Field
                  label="Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
   );
 };

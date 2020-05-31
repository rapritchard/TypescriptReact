import React from "react";
import { Card, Icon } from "semantic-ui-react";

import { HospitalEntry as Hospital } from "../types";
import DiagnosesList from "./DiagnosesList";

const HealthCheckEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" />
        </Card.Header>
        <Card.Meta>by {entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosesList diagnosesCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      <Card.Content>
        <Card.Header>Discharge: {entry.discharge.date}</Card.Header>
        <Card.Description>{entry.discharge.criteria}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;

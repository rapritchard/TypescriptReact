import React from "react";
import { Card, Icon } from "semantic-ui-react";

import { HealthCheckEntry as HealthCheck } from "../types";
import DiagnosesList from "./DiagnosesList";
import HealthRatingBar from "../components/HealthRatingBar";


const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" />
        </Card.Header>
        <Card.Meta>by {entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosesList diagnosesCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      <Card.Content extra>
        <HealthRatingBar rating={entry.healthCheckRating} showText />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;

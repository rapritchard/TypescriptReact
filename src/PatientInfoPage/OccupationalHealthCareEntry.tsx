import React from "react";
import { Card, Icon, Table } from "semantic-ui-react";

import { OccupationalHealthcareEntry as OccupationalHealthcare } from "../types";
import DiagnosesList from "./DiagnosesList";

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcare }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="doctor" /> {entry.employerName}
        </Card.Header>
        <Card.Meta>by {entry.specialist} </Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosesList diagnosesCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      {entry.sickLeave && (
        <Card.Content>
        <Card.Header>Sick Leave</Card.Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell negative>{entry.sickLeave.startDate}</Table.Cell>
              <Table.Cell positive>{entry.sickLeave.endDate}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
      )}
    </Card>
  );
};

export default OccupationalHealthcareEntry;

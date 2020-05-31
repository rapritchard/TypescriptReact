import React from "react";
import { v4 as uuidv4 } from "uuid";

import { useStateValue } from "../state";
import { Diagnosis } from "../types";
import { List } from "semantic-ui-react";

const DiagnosisList: React.FC<{ diagnosesCodes: Array<Diagnosis["code"]> }> = ({ diagnosesCodes }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      <List.Item>
        <List.Header>
          {diagnosesCodes.length > 1 ? "Diagnoses" : "Diagnosis"}
        </List.Header>
      </List.Item>
      {diagnosesCodes.map((code) => (
        <List.Item key={uuidv4()}>
          <List.Content>
            <List.Description>
              <strong>{code}</strong> -
              {diagnoses[code] && diagnoses[code].name}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default DiagnosisList;

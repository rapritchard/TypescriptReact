import React from "react";
import axios from "axios";
import { Container, Header, Icon, Loader } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { toPatient } from "../utils";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";

const genderIcons = {
  male: { name: "mars" as "mars" },
  female: { name: "venus" as "venus" },
  other: { name: "genderless" as "genderless" },
};

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fetchStatus = React.useRef({ shouldFetch: false, hasFetched: false  });
  const [patient, setPatient] = React.useState<Patient>();

  const patientToCheck = patients[id];

  try {
    setPatient(toPatient({ ...patientToCheck }));
  } catch (e) {
    if (!fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(e);
    }
  }

  React.useEffect(() => {

    const fetchPatient = async () => {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(fetchedPatient));
        fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
      } catch (e) {
        console.error(e);
      }
      
    };
    if (fetchStatus.current.shouldFetch) {
      fetchPatient();
    }
  }, [id, dispatch]);

  return (
    <>
    {
      patient !== undefined
      ? (
        <Container textAlign="left">
          <Header as="h1">
            {patient.name} <Icon {...genderIcons[patient.gender]} />
          </Header> 
        { patient.ssn && <p>ssn: {patient.ssn}</p> }
        <p>occupation: {patient.occupation}</p>
        {patient.entries.length > 0 && (
          <>
            <Header as="h2">Entries</Header>
            {patient.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
              // <>
              //   <Header as="h3">{entry.date}</Header>
              //   <p>{entry.description}</p>
              //   {entry.diagnosisCodes !== undefined && (
              //     <ul>
              //       {entry.diagnosisCodes.map((code) => (
              //         <li key={code}><strong>{code}</strong> {diagnoses[code] && diagnoses[code].name} </li>
              //       ))}
              //     </ul>
              //   )}
              // </>
            ))}
          </>
        )}
        </Container>
      ) 
      : <Container>
          <Loader active />
        </Container>
    }
    </>
  );

};

export default PatientInfoPage;

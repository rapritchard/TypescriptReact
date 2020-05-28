import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { toPatient } from "../utils";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";

const genderIcons = {
  male: { name: "mars" as "mars" },
  female: { name: "venus" as "venus" },
  other: { name: "genderless" as "genderless" },
};

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false  });
  const [patient, setPatient] = useState<Patient>();

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

  useEffect(() => {

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
    <div>
    {
      patient !== undefined
      ? (
          <div>
          <Container textAlign="left">
            <Header as="h1">
              {patient.name} <Icon {...genderIcons[patient.gender]} />
            </Header> 
          { patient.ssn && <p>ssn: {patient.ssn}</p> }
          <p>occupation: {patient.occupation}</p>
          </Container>
  
        </div>
      ) 
      : <></>
    }
    </div>
  );

};

export default PatientInfoPage;

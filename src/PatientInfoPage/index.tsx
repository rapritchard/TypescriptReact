import React from "react";
import axios from "axios";
import { Container, Header, Icon, Loader, Button, Divider } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { toPatient } from "../utils";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const genderIcons = {
  male: { name: "mars" as "mars" },
  female: { name: "venus" as "venus" },
  other: { name: "genderless" as "genderless" },
};

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fetchStatus = React.useRef({ shouldFetch: false, hasFetched: false  });

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  let patient = patients[id];

  try {
    patient = toPatient({ ...patient });
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

  const submitNewEntry = async (values: EntryFormValues) => {
    const body = {...values};
    if(patient) {
      try {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          body
        );
        dispatch(updatePatient(updatedPatient));
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }
  };

  return (
    <>
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
          <Header as="h2">Entries</Header>
          <Button onClick={() => openModal()}>Add New Entry</Button>
          <Divider />
          {patient.entries.length > 0 ? (
            <>
              {patient.entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
              ))}
            </>
          ) : <p>This patient has no entries.</p>}
          </Container>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
        </div>
      ) 
      : <Container>
          <Loader active />
        </Container>
    }
    </>
  );

};

export default PatientInfoPage;

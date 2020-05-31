import React from "react";
import { Entry, EntryType } from "../types";
import { assertNever } from "../utils";

import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";
import HealthCheckEntry from "./HealthCheckEntry";


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthCareEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

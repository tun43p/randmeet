import { useState } from "react";
import { Filters, Meetings } from "./types";
import {
  createMeetings,
  getEntitiesFromRows,
  getRowsFromCSVFile,
} from "./utils/helpers";
import HeaderComponent from "./components/header";
import AsideComponent from "./components/aside";
import ResultsComponent from "./components/results";
import { statusFilters } from "./utils/constants";

import "./style.css";

export default function App() {
  const [filters, setFilters] = useState<Filters>(statusFilters);
  const [meetings, setMeetings] = useState<Meetings | undefined>(undefined);

  const now = new Date().getTime();

  async function onFiltersChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    if (!e.target.value) return;
    setMeetings(undefined);
    setFilters(e.target.value.split(","));
  }

  async function onUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const rows = await getRowsFromCSVFile(file);
    const entities = getEntitiesFromRows(rows);
    const meetings = createMeetings(entities, filters);

    setMeetings(meetings);
  }

  return (
    <>
      <HeaderComponent />
      <main>
        <AsideComponent
          filters={filters.toString()}
          meetings={meetings}
          now={now}
          onFiltersChange={onFiltersChange}
          onUpload={onUpload}
        />
        <ResultsComponent meetings={meetings} />
      </main>
    </>
  );
}

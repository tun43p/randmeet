import { useState } from "react";
import styled from "styled-components";
import { Meetings } from "./types";
import {
  createMeetings,
  getEntitiesFromRows,
  getRowsFromCSVFile,
} from "./utils/helpers";
import HeaderComponent from "./components/header";
import AsideComponent from "./components/aside";
import ResultsComponent from "./components/results";

export default function App() {
  const [meetings, setMeetings] = useState<Meetings | undefined>(undefined);

  const now = new Date().getTime();

  async function onUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const rows = await getRowsFromCSVFile(file);
    const entities = getEntitiesFromRows(rows);
    const meetings = createMeetings(entities);

    setMeetings(meetings);
  }

  return (
    <StyledApp>
      <HeaderComponent />
      <StyledMain>
        <AsideComponent meetings={meetings} now={now} onUpload={onUpload} />
        <ResultsComponent meetings={meetings} />
      </StyledMain>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  color: #202020;
  background-color: #ffffff;
  width: 100%;
  height: 100vh;
`;

const StyledMain = styled.main`
  display: flex;
`;

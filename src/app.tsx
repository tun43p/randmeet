import { useState } from "react";
import styled from "styled-components";
import { Meetings } from "./types";
import {
  createMeetings,
  getEntitiesFromRows,
  getRowsFromCSVFile,
} from "./utils/helpers";
import HeaderComponent from "./components/header";
import HelpComponent from "./components/help";
import PersonComponent from "./components/person";

export default function App() {
  const [meetings, setMeetings] = useState<Meetings | undefined>(undefined);

  async function onUpload(
    e: React.ChangeEvent<HTMLInputElement>
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
      <StyledWrapper>
        <HeaderComponent meetings={meetings} onUpload={onUpload} />
        <StyledMain style={{ overflowY: meetings ? "scroll" : "unset" }}>
          {meetings &&
            meetings.map((meeting, key) => {
              return (
                <StyledPersons key={key}>
                  <PersonComponent person={meeting.a} />
                  <PersonComponent person={meeting.b} />
                </StyledPersons>
              );
            })}
        </StyledMain>
      </StyledWrapper>
      <HelpComponent />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  color: #ffffff;
  background-color: #202020;
  width: 100%;
  height: 100vh;
`;

const StyledWrapper = styled.div`
  width: 60%;
  height: 100vh;
  margin: 0 auto;
`;

const StyledMain = styled.main`
  height: calc(100vh - 4rem);
  width: 100%;
`;

const StyledPersons = styled.div`
  display: flex;
  width: 100%;
`;

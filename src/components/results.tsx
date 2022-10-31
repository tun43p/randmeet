import styled from "styled-components";
import { Meetings } from "../types";

export type Props = {
  meetings?: Meetings;
};

export default function ResultsComponent({ meetings }: Props) {
  return (
    <StyledSection>
      <StyledTitle>Résultats</StyledTitle>
      <div>
        {meetings &&
          meetings.map((meeting, key) => {
            return (
              <StyledResults key={key}>
                <StyledPerson>
                  <StyledPersonName>{meeting.a.name}</StyledPersonName>
                  <StyledPersonIndicators>
                    <StyledPersonTeam>{meeting.a.team.name}</StyledPersonTeam>
                    <StyledPersonStatus>{meeting.a.status}</StyledPersonStatus>
                  </StyledPersonIndicators>
                </StyledPerson>
                <StyledPerson>
                  <StyledPersonName>{meeting.b.name}</StyledPersonName>
                  <StyledPersonIndicators>
                    <StyledPersonTeam>{meeting.b.team.name}</StyledPersonTeam>
                    <StyledPersonStatus>{meeting.b.status}</StyledPersonStatus>
                  </StyledPersonIndicators>
                </StyledPerson>
              </StyledResults>
            );
          })}
      </div>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  flex: 1;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledResults = styled.div`
  display: flex;
  margin-right: 2rem;
`;

const StyledPerson = styled.div`
  width: 100%;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const StyledPersonName = styled.p`
  font-weight: bold;
`;

const StyledPersonIndicators = styled.div`
  display: flex;
`;

const StyledPersonTeam = styled.p`
  margin-right: 1rem;
`;

const StyledPersonStatus = styled.p`
  opacity: 0.5;
`;

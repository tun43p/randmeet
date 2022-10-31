import styled from "styled-components";
import { Person } from "../types";

type Props = {
  person: Person;
};

export default function PersonComponent({ person }: Props) {
  return (
    <StyledPerson>
      <StyledPersonName>{person.name}</StyledPersonName>
      <StyledPersonProject>
        {person.team.name} {person.status && `- ${person.status}`}
      </StyledPersonProject>
    </StyledPerson>
  );
}

const StyledPerson = styled.div`
  width: 100%;
  background: #252525;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const StyledPersonName = styled.p`
  font-size: 1rem;
  color: #ffffff;
`;

const StyledPersonProject = styled.p`
  font-size: 0.75rem;
  color: #808080;
`;

import styled from "styled-components";
import { documentationLink } from "../utils/constants";

export default function HelpComponent() {
  return (
    <StyledHelp>
      {/* TODO(tun43p): Add a tooltip here */}
      <a href={documentationLink} target="_blank">
        ?
      </a>
    </StyledHelp>
  );
}

const StyledHelp = styled.div`
  background: #e67e22;
  display: flex;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4em;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all ease-in-out 0.25s;

  & a {
    font-size: 2rem;
    color: #ffffff;
  }

  &:hover {
    background: #ffffff;

    a {
      color: #e67e22;
    }
  }
`;

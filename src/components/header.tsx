import styled from "styled-components";

export default function HeaderComponent() {
  return (
    <StyledHeader>
      <StyledLogo>Randmeet</StyledLogo>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  padding: 3rem;
`;

const StyledLogo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

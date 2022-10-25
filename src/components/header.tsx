import { CSVLink } from "react-csv";
import styled from "styled-components";
import { Meetings } from "../types";
import { csvHeaders } from "../utils/constants";
import { convertMeetingsToCSV } from "../utils/helpers";

type Props = {
  meetings?: Meetings;
  onUpload: React.ChangeEventHandler<HTMLInputElement>;
};

export default function HeaderComponent({ meetings, onUpload }: Props) {
  const now = new Date().getTime();

  return (
    <StyledHeader id="header" className="header">
      <StyledLogo>Randmeet</StyledLogo>
      <StyledHeaderButtons>
        {meetings && (
          <CSVLink
            className="csv"
            filename={`randmeet_${now}.csv`}
            data={convertMeetingsToCSV(meetings)}
            headers={csvHeaders}
            target="_blank"
          >
            Download
          </CSVLink>
        )}
        <StyledHeaderButton>
          <label htmlFor="input">Upload</label>
          <input
            id="input"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={onUpload}
          />
        </StyledHeaderButton>
      </StyledHeaderButtons>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`;

const StyledLogo = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .csv {
    color: #000000;
    background: #ffffff;
    padding: 0.15rem 1rem;
    margin-right: 2rem;
    border-radius: 0.5rem;

    & *:hover {
      cursor: pointer;
    }
  }
`;

const StyledHeaderButton = styled.div`
  color: #202020;
  background: #ffffff;
  padding: 0.15rem 1rem;
  border-radius: 0.5rem;

  & *:hover {
    cursor: pointer;
  }
`;

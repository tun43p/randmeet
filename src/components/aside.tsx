import { FiBookOpen, FiDownload, FiUpload } from "react-icons/fi";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import { Meetings } from "../types";
import { csvHeaders, documentationLink } from "../utils/constants";
import { convertMeetingsToCSV } from "../utils/helpers";
import IconComponent, { IconColor } from "./icon";

type Props = {
  meetings?: Meetings;
  now: number;
  onUpload: React.ChangeEventHandler;
};

export default function AsideComponent({ meetings, now, onUpload }: Props) {
  return (
    <StyledAside>
      <StyledTitle>Actions</StyledTitle>
      <StyledActionFiled>
        <IconComponent color={IconColor.blue} icon={<FiUpload />} />
        <label htmlFor="input">Importer un fichier CSV</label>
        <input
          id="input"
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={onUpload}
        />
      </StyledActionFiled>
      {meetings && (
        <CSVLink
          className="csv"
          filename={`randmeet_${now}.csv`}
          data={convertMeetingsToCSV(meetings)}
          headers={csvHeaders}
          target="_blank"
        >
          <StyledActionFiled>
            <IconComponent color={IconColor.green} icon={<FiDownload />} />
            Exporter un fichier CSV
          </StyledActionFiled>
        </CSVLink>
      )}
      <a href={documentationLink} target="_blank" rel="noreferrer">
        <StyledActionFiled>
          <IconComponent color={IconColor.purple} icon={<FiBookOpen />} />
          <p>Afficher la documentation</p>
        </StyledActionFiled>
      </a>
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  width: 30%;
  padding: 0 3rem;

  & .csv div {
    color: #202020;
    margin-right: 0.5rem;
  }
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledActionFiled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;

  label,
  p {
    color: #202020;
    margin-left: 0.5rem;
    text-decoration: none;
    cursor: pointer;
  }
`;

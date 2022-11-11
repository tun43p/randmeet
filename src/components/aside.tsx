import { FiBookOpen, FiDownload, FiUpload } from "react-icons/fi";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import { Meetings } from "../types";
import { csvHeaders, documentationLink } from "../utils/constants";
import { convertMeetingsToCSV } from "../utils/helpers";
import IconComponent, { IconColor } from "./icon";

type Props = {
  filters: string;
  meetings?: Meetings;
  now: number;
  onFiltersChange: React.ChangeEventHandler;
  onUpload: React.ChangeEventHandler;
};

export default function AsideComponent({
  filters,
  meetings,
  now,
  onFiltersChange,
  onUpload,
}: Props) {
  return (
    <StyledAside>
      <StyledContainer>
        <StyledTitle>Actions</StyledTitle>
        <StyledActionField>
          <IconComponent color={IconColor.blue} icon={<FiUpload />} />
          <label htmlFor="input">Importer un fichier CSV</label>
          <input
            id="input"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={onUpload}
          />
        </StyledActionField>
        {meetings && (
          <CSVLink
            className="csv"
            filename={`randmeet_${now}.csv`}
            data={convertMeetingsToCSV(meetings)}
            headers={csvHeaders}
            target="_blank"
          >
            <StyledActionField>
              <IconComponent color={IconColor.green} icon={<FiDownload />} />
              Exporter un fichier CSV
            </StyledActionField>
          </CSVLink>
        )}
        <a href={documentationLink} target="_blank" rel="noreferrer">
          <StyledActionField>
            <IconComponent color={IconColor.purple} icon={<FiBookOpen />} />
            <p>Afficher la documentation</p>
          </StyledActionField>
        </a>
      </StyledContainer>
      <StyledContainer>
        <StyledTitle>Filtres</StyledTitle>
        <input value={filters} onChange={onFiltersChange} />
      </StyledContainer>
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

const StyledContainer = styled.div`
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledActionField = styled.div`
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

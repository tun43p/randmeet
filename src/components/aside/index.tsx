import { CSVLink } from "react-csv";
import { Meetings } from "../../types";
import {
  csvDelimiter,
  csvHeaders,
  documentationLink,
} from "../../utils/constants";
import { convertMeetingsToCSV } from "../../utils/helpers";

import "./style.css";

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
    <aside>
      <div className="fixed">
        <div className="part">
          <h2>Filtres</h2>
          <p className="description">
            Chaque nouveau statut à filtrer doit être séparé par{" "}
            <span>une virgule sans espaces</span>, en suivant cette
            nomenclature: DUOA,Manager,PM.
          </p>
          <input value={filters} onChange={onFiltersChange} />
        </div>
        <div className="part">
          <h2>Actions</h2>
          <p className="description">
            Seuls les fichiers{" "}
            <span>CSV avec les données séparées par des points virgules</span>{" "}
            pourront être traités.
          </p>
          <div className="action">
            <label htmlFor="input">Importer un fichier CSV</label>
            <input
              id="input"
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={onUpload}
            />
          </div>
          {meetings ? (
            <CSVLink
              className="csv"
              filename={`randmeet_${now}.csv`}
              data={convertMeetingsToCSV(meetings)}
              headers={csvHeaders}
              separator={csvDelimiter}
              target="_blank"
              aria-disabled={meetings === null}
            >
              <div className="action">Exporter le fichier CSV</div>
            </CSVLink>
          ) : (
            <p className="description">
              Importez un fichier CSV pour pouvoir exporter les données
              générées.
            </p>
          )}
        </div>
        <a href={documentationLink} target="_blank" rel="noreferrer">
          <div>?</div>
        </a>
      </div>
    </aside>
  );
}

// const StyledAside = styled.aside`
//   width: 30%;
//   padding: 0 3rem;

//   & .csv div {
//     color: rgba(255, 255, 255, 0.75);
//     transition: all ease-in-out 0.25s;

//     &:hover {
//       color: #ffffff;
//     }
//   }
// `;

// const StyledContainer = styled.div`
//   margin-bottom: 1rem;
// `;

// const h2 = styled.h2`
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
// `;

// const StyledActionField = styled.div`
//   color: rgba(255, 255, 255, 0.75);
//   background: #56bf89;
//   display: flex;
//   width: 100%;
//   align-items: center;
//   margin-bottom: 0.5rem;
//   font-size: 0.85rem;
//   padding: 0.25rem 0.5rem;
//   border-radius: 0.25rem;
//   text-decoration: none;
//   transition: all ease-in-out 0.25s;
//   cursor: pointer;

//   & p,
//   label,
//   input {
//     width: 100%;
//     cursor: pointer;
//   }

//   &:hover {
//     color: #ffffff;
//     background: #63da9d;
//   }
// `;

// const StyledDescription = styled.p`
//   color: #808080;
//   font-size: 0.75rem;
//   margin-bottom: 0.5rem;
//   font-style: italic;

//   span {
//     color: #606060;
//     font-weight: bold;
//   }
// `;

// const StyledFiltersInput = styled.input`
//   padding: 0.25rem;
//   width: 100%;
// `;

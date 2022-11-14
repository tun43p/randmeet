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
        {/* TODO(tun43p): Fix help position on small screens */}
        <a href={documentationLink} target="_blank" rel="noreferrer">
          <div>?</div>
        </a>
      </div>
    </aside>
  );
}

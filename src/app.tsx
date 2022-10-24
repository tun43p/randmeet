import { CSVLink } from "react-csv";
import { useState } from "react";
import styled from "styled-components";
import { Data, Person, Persons, Results, Rows, Teams } from "./types";

// TODO(tun43p): Split on multiple files
export default function App() {
  const [results, setResults] = useState<Results | null>(null);

  const now = new Date().getTime();
  const docs = "https://github.com/tun43p/randmeet/blob/main/DOCUMENTATION.md";
  const headers = ["Personne A", "Personne B"];

  // TODO(tun43p): Can we use react-csv to import data from file ?
  async function onChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const input = await file.text();

    const rows: Rows = input.split(/\r\n/g).map((row) => ({
      name: row.split(",")[0],
      status: row.split(",")[1],
      team: row.split(",")[2],
    }));

    // TODO(tun43p): Create filters with a client side input
    const statusFilter = ["DUOA", "Manager", "PM"];

    const filteredRows: Rows = rows
      .slice(1) // MARK: Use it if the first row is not a person
      .filter((row) => !statusFilter.includes(row.status));

    const teams: Teams = [];

    const persons: Persons = filteredRows.map((row) => {
      const person: Person = {
        name: row.name,
        team: { index: teams.length, name: row.team },
      };

      if (!teams.includes(row.team)) teams.push(row.team);

      return person;
    });

    const data: Data = { persons, teams };

    const results: Results = [];

    for (let i = 0; i < data.teams.length; i++) {
      const a = data.persons.filter((person) => person.team.index === i);
      const b = data.persons.filter((person) => person.team.index > i);

      // TODO(tun43p): Randomize results
      for (let j = 0; j < a.length; j++) {
        for (let k = 0; k < b.length; k++) {
          results.push({
            a: a[j],
            b: b[k],
          });
        }
      }
    }

    setResults(results);
  }

  return (
    <StyledApp>
      <StyledWrapper>
        <StyledHeader id="header" className="header">
          <StyledLogo>Randmeet</StyledLogo>
          <StyledHeaderButtons>
            {results && (
              <CSVLink
                className="csv"
                filename={`randmeet_${now}.csv`}
                data={results.map((result) => [result.a.name, result.b.name])}
                headers={headers}
                target="_blank"
              >
                Download
              </CSVLink>
            )}
            <StyledButton>
              <label htmlFor="input">Upload</label>
              <input
                id="input"
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={onChange}
              />
            </StyledButton>
          </StyledHeaderButtons>
        </StyledHeader>
        <StyledMain>
          {results !== null &&
            results.map((result, key) => {
              return (
                <StyledResult key={key}>
                  <StyledPerson>
                    <p>{result.a.name}</p>
                  </StyledPerson>
                  <StyledPerson>
                    <p>{result.b.name}</p>
                  </StyledPerson>
                </StyledResult>
              );
            })}
        </StyledMain>
      </StyledWrapper>
      <StyledHelp>
        <a href={docs} target="_blank">
          ?
        </a>
      </StyledHelp>
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

const StyledButton = styled.div`
  color: #202020;
  background: #ffffff;
  padding: 0.15rem 1rem;
  border-radius: 0.5rem;

  & *:hover {
    cursor: pointer;
  }
`;

const StyledMain = styled.main`
  height: calc(100vh - 4rem);
  width: 100%;
  overflow: scroll;
`;

const StyledResult = styled.div`
  display: flex;
  width: 100%;
`;

const StyledPerson = styled.div`
  width: 100%;
  background: #252525;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
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

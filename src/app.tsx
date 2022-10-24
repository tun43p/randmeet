import { useState } from "react";

type Row = {
  name: string;
  status: string;
  team: string;
};

type Person = {
  name: string;
  team: {
    index: number;
    name: string;
  };
};

type Team = string;

export type Results = {
  a: Person;
  b: Person;
}[];

// TODO: Create an input on the website to do this
const statusList = ["DUOA", "Manager", "PM"];

// TODO: Add try catch
async function get(file: File): Promise<{ persons: Person[]; teams: Team[] }> {
  const input = await file.text();

  const rows: Row[] = input.split(/\r\n/g).map((row) => ({
    name: row.split(",")[0],
    status: row.split(",")[1],
    team: row.split(",")[2],
  }));

  const filteredRows: Row[] = rows
    .slice(1) // MARK: Use it if the first row is not a person
    .filter((row) => !statusList.includes(row.status));

  const teams: Team[] = [];

  const persons: Person[] = filteredRows.map((row) => {
    const person: Person = {
      name: row.name,
      team: { index: teams.length, name: row.team },
    };

    if (!teams.includes(row.team)) teams.push(row.team);

    return person;
  });

  return { persons, teams };
}

// TODO: Add try catch
function parse(data: { persons: Person[]; teams: Team[] }): Results {
  const results: Results = [];

  for (let i = 0; i < data.teams.length; i++) {
    const a = data.persons.filter((person) => person.team.index === i);
    const b = data.persons.filter((person) => person.team.index > i);

    // TODO: Randomize results
    for (let j = 0; j < a.length; j++) {
      for (let k = 0; k < b.length; k++) {
        results.push({
          a: a[j],
          b: b[k],
        });
      }
    }
  }

  return results;
}

export default function App() {
  const [results, setResults] = useState<Results | null>(null);

  async function onChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const data = await get(file);
    const results = parse(data);
    setResults(results);
  }

  return (
    <>
      <HeaderComponent />
      <main>
        <h1>Generate randomly your meetings</h1>
        <div>
          <label htmlFor="input">Upload your CSV file</label>
          <input
            id="input"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </div>
        <ResultsComponent results={results} />
      </main>
    </>
  );
}

function ResultsComponent({ results }: { results: Results | null }) {
  if (!results) return <></>;

  return (
    <table>
      <thead>
        <tr>
          <th>A</th>
          <th>B</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, key) => {
          return (
            <tr key={key}>
              <td>{result.a.name}</td>
              <td>{result.b.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function HeaderComponent() {
  return (
    <header id="header" className="header">
      <p id="logo" className="logo">
        Randmeet
      </p>
    </header>
  );
}

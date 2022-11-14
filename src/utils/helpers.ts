import {
  Entities,
  Filters,
  Meetings,
  Person,
  Persons,
  Results,
  Rows,
  Teams,
} from "../types";
import { csvDelimiter } from "./constants";

// TODO(tun43p): Can we use react-csv to import data from file ?
export async function getRowsFromCSVFile(file: File): Promise<Rows> {
  const input = await file.text();

  // If we need to delete some spaces: (/\n/g) / (/\r\n/g)
  const rows: Rows = input.split(/\r\n/g).map((row) => ({
    name: row.split(csvDelimiter)[0],
    status: row.split(csvDelimiter)[1],
    team: row.split(csvDelimiter)[2],
  }));

  const filteredRows = rows.filter((row) => row.name.length !== 0);

  return filteredRows;
}

export function getEntitiesFromRows(rows: Rows): Entities {
  const teams: Teams = [];

  const persons: Persons = rows.slice(1).map((row) => {
    const person: Person = {
      name: row.name,
      status: row.status,
      team: { index: teams.length, name: row.team },
    };

    if (!teams.includes(row.team)) teams.push(row.team);

    return person;
  });

  return { persons, teams };
}

function excludeMeeting(a: Person, b: Person, filters: Filters): boolean {
  const isBothTheSamePerson = a == b;

  const isBothInStatusList =
    a.status !== undefined &&
    b.status != undefined &&
    filters.includes(a.status) &&
    filters.includes(b.status);

  const isBothInTheSameTeam = a.team.name == b.team.name;

  return isBothTheSamePerson || isBothInStatusList || isBothInTheSameTeam;
}

// If we need randomness
// function suffleMeetings(meetings: Meetings): Meetings {
//   return meetings.sort((_a, _b) => 0.5 - Math.random());
// }

export function createMeetings(entities: Entities, filters: Filters): Meetings {
  const meetings: Meetings = [];

  for (let i = 0; i < entities.persons.length; i++) {
    for (let j = 0; j < entities.persons.length; j++) {
      const a = entities.persons[i];
      const b = entities.persons[j];

      if (!excludeMeeting(a, b, filters)) {
        meetings.push({ a: entities.persons[i], b: entities.persons[j] });
      }
    }
  }

  return meetings;
}

// If we modify this function, don't forget to update csvHeaders
export function convertMeetingsToCSV(meetings: Meetings): Results {
  return meetings.map((meeting) => [
    meeting.a.name,
    meeting.a.team.name,
    meeting.a.status ?? "N/A",
    meeting.b.name,
    meeting.b.team.name,
    meeting.b.status ?? "N/A",
  ]);
}

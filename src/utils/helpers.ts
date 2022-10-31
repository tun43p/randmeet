import { Entities, Meetings, Person, Persons, Rows, Teams } from "../types";
import { statusToFilter } from "./constants";

// // TODO(tun43p): Can we use react-csv to import data from file ?
export async function getRowsFromCSVFile(file: File): Promise<Rows> {
  try {
    const input = await file.text();

    // If we need to delete some spaces: input.split(/\r\n/g)
    const rows: Rows = input.split(/\n/g).map((row) => ({
      name: row.split(",")[0],
      status: row.split(",")[1],
      team: row.split(",")[2],
    }));

    return rows;
  } catch (error) {
    throw error;
  }
}

export function getEntitiesFromRows(rows: Rows): Entities {
  try {
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
  } catch (error) {
    throw error;
  }
}

function excludeMeeting(a: Person, b: Person): boolean {
  return (
    a.status !== undefined &&
    b.status != undefined &&
    statusToFilter.includes(a.status) &&
    statusToFilter.includes(b.status)
  );
}

function suffleMeetings(meetings: Meetings): Meetings {
  return meetings.sort((a, b) => 0.5 - Math.random());
}

export function createMeetings(entities: Entities): Meetings {
  try {
    const meetings: Meetings = [];

    for (let i = 0; i < entities.teams.length; i++) {
      const n = entities.persons.filter((person) => person.team.index === i);
      const l = entities.persons.filter((person) => person.team.index > i);

      for (let j = 0; j < n.length; j++) {
        for (let k = 0; k < l.length; k++) {
          const a = n[j],
            b = l[k];

          if (!excludeMeeting(a, b)) {
            meetings.push({ a, b });
          }
        }
      }
    }

    return suffleMeetings(meetings);
  } catch (error) {
    throw error;
  }
}

export function convertMeetingsToCSV(meetings: Meetings) {
  try {
    return meetings.map((meeting) => [meeting.a.name, meeting.b.name]);
  } catch (error) {
    throw error;
  }
}

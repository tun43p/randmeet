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

// FIXME: This function does not work
function meetingsFilter(a: Person, b: Person): boolean {
  const firstCondition =
    a.status !== null &&
    a.status !== undefined &&
    a.status.length !== 0 &&
    statusToFilter.includes(a.status);

  const secondCondition = a.status == b.status;

  return firstCondition && secondCondition;
}

export function createMeetings(entities: Entities): Meetings {
  try {
    const meetings = [];

    for (let i = 0; i < entities.teams.length; i++) {
      const a = entities.persons.filter((person) => person.team.index === i);
      const b = entities.persons.filter((person) => person.team.index > i);

      // TODO(tun43p): Randomize results
      for (let j = 0; j < a.length; j++) {
        for (let k = 0; k < b.length; k++) {
          meetings.push({
            a: a[j],
            b: b[k],
          });
        }
      }
    }

    return meetings;
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

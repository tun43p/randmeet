export type Row = {
  name: string;
  status?: string;
  team: string;
};

export type Rows = Row[];

export type Person = {
  name: string;
  status?: string;
  team: {
    index: number;
    name: string;
  };
};

export type Persons = Person[];

export type Team = string;

export type Teams = Team[];

export type Entities = {
  persons: Persons;
  teams: Teams;
};

export type Meeting = {
  a: Person;
  b: Person;
};

export type Meetings = Meeting[];

export type Filter = string;

export type Filters = Filter[];

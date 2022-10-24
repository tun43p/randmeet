export type Row = {
  name: string;
  status: string;
  team: string;
};

export type Rows = Row[];

export type Person = {
  name: string;
  team: {
    index: number;
    name: string;
  };
};

export type Persons = Person[];

export type Team = string;

export type Teams = Team[];

export type Data = {
  persons: Persons;
  teams: Teams;
};

export type Results = {
  a: Person;
  b: Person;
}[];

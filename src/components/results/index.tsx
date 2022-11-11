import { Meetings } from "../../types";

import "./style.css";

export type Props = {
  meetings?: Meetings;
};

export default function ResultsComponent({ meetings }: Props) {
  return (
    <section>
      <h2>Résultats</h2>
      <div>
        {meetings &&
          meetings.map((meeting, key) => {
            return (
              <div className="persons" key={key}>
                <div className="person">
                  <p>{meeting.a.name}</p>
                  <div>
                    <p>{meeting.a.team.name}</p>
                    <p>{meeting.a.status}</p>
                  </div>
                </div>
                <div className="person">
                  <p>{meeting.b.name}</p>
                  <div>
                    <p>{meeting.b.team.name}</p>
                    <p>{meeting.b.status}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export interface ToDoProps {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  completedTimestamp?: string;
}

export default function ToDoCard(props: ToDoProps) {
  return (
    <section>
      <h2>{props.title}</h2>
      <p>{props.timestamp}</p>
      <p>{props.description}</p>
      {props.deadline && <p>{props.deadline}</p>}
      {!props.completed && <input type="checkbox" />}
      {props.completedTimestamp && <p>{props.completedTimestamp}</p>}
    </section>
  );
}

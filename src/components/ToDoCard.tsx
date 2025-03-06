export interface ToDoProps {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  deadline: boolean;
  deadlineDate?: string;
  completed: boolean;
  completedTimestamp?: string;
  toggleTask?: () => void;
  checkCompleted?: () => void;
  timestampHistory?: string[];
  deadlineHistory?: string[];
  popupDeadline?: boolean;
}

export default function ToDoCard(props: ToDoProps) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.timestamp}</p>
      <p>{props.description}</p>
      {props.deadline && <p>{props.deadline}</p>}
      {!props.completed && (
        <input onChange={props.checkCompleted} type="checkbox" />
      )}
      {props.completedTimestamp && <p>{props.completedTimestamp}</p>}
      <button onClick={props.toggleTask}>Delete Task</button>
    </article>
  );
}

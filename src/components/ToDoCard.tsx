export interface ToDoProps {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  deadline: boolean;
  deadlineDate?: string;
  completed: boolean;
  completedTimestamp?: string;
  deleteTask?: () => void;
}

export default function ToDoCard(props: ToDoProps) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.timestamp}</p>
      <p>{props.description}</p>
      {props.deadline && <p>{props.deadline}</p>}
      {!props.completed && <input type="checkbox" />}
      {props.completedTimestamp && <p>{props.completedTimestamp}</p>}
      <button onClick={props.deleteTask}>Delete Task</button>
    </article>
  );
}

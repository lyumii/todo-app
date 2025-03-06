import ToDoCard, { ToDoProps } from "./ToDoCard";
import { useState, useEffect } from "react";

export default function ToDoHistory() {
  const [toDos, setToDos] = useState<ToDoProps[]>([]);

  const cancelPopup = () => {
    setToDos(
      toDos.map((task: ToDoProps) => ({
        ...task,
        popupDeadline: false,
      }))
    );
  };

  const noDeadline = () => {}; // make deadline for recycled todo to false
  const newDeadline = () => {}; // create state and use it to render the date/month/year input

  const toDoAgain = (id: string) => {
    let toDoArray = JSON.parse(localStorage.getItem("toDoArray") || "[]");

    if (toDoArray.find((task: ToDoProps) => task.id === id)) return;

    const returnedToDo = toDos.find((task: ToDoProps) => task.id === id);
    if (!returnedToDo) return;
    const updatedToDoArray = [...toDoArray, returnedToDo];
    const returnedToDoArray = updatedToDoArray.map((task: ToDoProps) =>
      task.id === id
        ? {
            ...task,
            completed: false,
            completedTimestamp: "",
            timestampHistory: [
              ...(task.timestampHistory ?? []),
              task.completedTimestamp,
            ].filter(Boolean),
            deadlineHistory: [
              ...(task.deadlineHistory ?? []),
              task.deadline,
            ].filter(Boolean),
            deadline: "", // fix after other deadline functions are done
          }
        : task
    );
    localStorage.setItem("toDoArray", JSON.stringify(returnedToDoArray));
    setToDos((current) => current.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const completedToDos = JSON.parse(
      localStorage.getItem("completedToDos") || "[]"
    );

    const addPopupDeadlineToToDos = completedToDos.map((task: ToDoProps) => ({
      ...task,
      popupDeadline: task.popupDeadline ?? false,
    }));

    console.log("Loaded completed tasks:", addPopupDeadlineToToDos);
    setToDos(addPopupDeadlineToToDos);
  }, []);

  return (
    <section>
      <h2>Completed Tasks:</h2>
      {toDos.map((task: ToDoProps) =>
        task.popupDeadline ? (
          <div>
            <h2>Would you like a new deadline?</h2>
            <button onClick={() => newDeadline()}>Yes</button>
            <button onClick={() => noDeadline()}>No</button>
            <button onClick={() => cancelPopup()}>Cancel</button>
          </div>
        ) : (
          <ToDoCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description || undefined}
            timestamp={task.timestamp}
            completed={task.completed}
            deadline={task.deadline}
            completedTimestamp={task.completedTimestamp}
            toggleTask={() => toDoAgain(task.id)}
          />
        )
      )}
    </section>
  );
}

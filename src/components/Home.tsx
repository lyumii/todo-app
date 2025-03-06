import { useState, useEffect } from "react";
import ToDoCard, { ToDoProps } from "./ToDoCard";

export default function Home() {
  const [toDO, setToDo] = useState<ToDoProps[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineState, setDeadlineState] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const day = () => {
    const options = [];
    for (let i = 0; i < 32; i++) {
      options.push(<option key={i}>{i}</option>);
    }
    return options;
  };

  const month = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const displayMonths = months.map((month, index) => (
      <option key={index}>{month}</option>
    ));
    return displayMonths;
  };

  const year = () => {
    const date = new Date();
    const currentYear = date.getFullYear() - 1;
    const yearOptions = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      yearOptions.push(<option key={i}>{i}</option>);
    }
    return yearOptions;
  };

  const deadline = () => {
    return (
      <div>
        <label>Day:</label>
        <select
          onChange={(e) =>
            setDeadlineDate({ ...deadlineDate, day: e.target.value })
          }
        >
          {day()}
        </select>

        <label>Month:</label>
        <select
          onChange={(e) =>
            setDeadlineDate({ ...deadlineDate, month: e.target.value })
          }
        >
          {month()}
        </select>

        <label>Year:</label>
        <select
          onChange={(e) =>
            setDeadlineDate({ ...deadlineDate, year: e.target.value })
          }
        >
          {year()}
        </select>
      </div>
    );
  };

  const addToDo = () => {
    const newToDO = {
      id: crypto.randomUUID(),
      title: title,
      timestamp: new Date().toISOString(),
      description: description,
      deadline: deadlineState,
      deadlineDate: `${deadlineDate.year}-${deadlineDate.month}-${deadlineDate.day}`,
      completed: false,
      completedTimestamp: "",
    };
    const toDoUpdate = [...toDO, newToDO];
    setToDo(toDoUpdate);
    localStorage.setItem("toDoArray", JSON.stringify(toDoUpdate));
  };

  useEffect(() => {
    const toDoArray = JSON.parse(localStorage.getItem("toDoArray") || "[]");
    if (toDoArray.length > 0) setToDo(toDoArray);
  }, []);

  return (
    <section>
      <h2>Add New Task:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addToDo();
        }}
      >
        <label htmlFor="titleinput">Title</label>
        <input
          type="text"
          placeholder="name of task"
          id="titleinput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="descriptioninput">Description:</label>
        <input
          type="text"
          placeholder="description of task"
          id="descriptioninput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <legend>Set A Deadline:</legend>
        <select name="" id="">
          <option onSelect={() => setDeadlineState(false)} value="">
            No Deadline
          </option>
          <option onSelect={() => setDeadlineState(true)} value="">
            Custom Date
          </option>
        </select>
        {deadlineState && deadline()}
        <button>Add Task</button>
      </form>
      <h2>Current Task List:</h2>
      {toDO.map((task) => (
        <ToDoCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description || undefined}
          deadline={task.deadline}
          deadlineDate={task.deadline === true ? task.deadlineDate : undefined}
          timestamp={task.timestamp}
          completed={task.completed}
        />
      ))}
    </section>
  );
}

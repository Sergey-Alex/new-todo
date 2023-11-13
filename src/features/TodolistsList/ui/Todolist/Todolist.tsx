import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "features/TodolistsList/ui/Todolist/Task/Task";
import {
  TodolistDomainType,
  todolistsActions,
  todolistsThunks,
} from "features/TodolistsList/model/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "features/TodolistsList/api/tasksApi";
import { FilterTaskButton } from "features/TodolistsList/ui/Todolist/FilterTaskButton/FilterTaskButton";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function (props: PropsType) {
  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ title, todolistId: props.todolist.id });
    },
    [props.todolist.id],
  );

  const removeTodolistHandler = () => {
    removeTodolist(props.todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: props.todolist.id, title });
    },
    [props.todolist.id],
  );

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed,
    );
  }

  return (
    <div>
      <h3>
        <EditableSpan
          value={props.todolist.title}
          onChange={changeTodolistTitleHandler}
        />
        <IconButton
          onClick={removeTodolistHandler}
          disabled={props.todolist.entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTaskCallback}
        disabled={props.todolist.entityStatus === "loading"}
      />
      <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={props.todolist.id} />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTaskButton todolist={props.todolist} />
      </div>
    </div>
  );
});

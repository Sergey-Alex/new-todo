import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  TodolistDomainType,
  todolistsThunks,
} from "features/TodolistsList/model/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "features/TodolistsList/api/tasksApi";
import { FilterTaskButton } from "features/TodolistsList/ui/Todolist/FilterTaskButton/FilterTaskButton";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";

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
      <Tasks todolist={props.todolist} tasks={props.tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTaskButton todolist={props.todolist} />
      </div>
    </div>
  );
});

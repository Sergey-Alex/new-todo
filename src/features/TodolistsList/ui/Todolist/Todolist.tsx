import React, { memo, useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/TodolistsList/api/tasksApi";
import { FilterTaskButton } from "features/TodolistsList/ui/Todolist/FilterTaskButton/FilterTaskButton";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = memo(function (props: PropsType) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ title, todolistId: props.todolist.id });
    },
    [props.todolist.id],
  );

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />
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

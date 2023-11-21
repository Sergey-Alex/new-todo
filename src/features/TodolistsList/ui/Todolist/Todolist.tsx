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

export const Todolist = memo(({ todolist, tasks }: PropsType) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      return addTask({ title, todolistId: todolist.id }).unwrap();
    },
    [todolist.id],
  );

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCallback}
        disabled={todolist.entityStatus === "loading"}
      />
      <Tasks todolist={todolist} tasks={tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTaskButton todolist={todolist} />
      </div>
    </div>
  );
});

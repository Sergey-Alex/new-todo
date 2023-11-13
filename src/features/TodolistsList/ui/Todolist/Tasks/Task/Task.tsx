import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/api/tasksApi";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import s from "features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css";
type PropsType = {
  task: TaskType;
  todolistId: string;
};

// const removeTask = useCallback(function (taskId: string, todolistId: string) {
//   removeTaskThunk({ taskId, todolistId });
// }, []);

export const Task = React.memo(({ task, todolistId }: PropsType) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () =>
    removeTask({ taskId: task.id, todolistId: todolistId });

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    updateTask({
      taskId: task.id,
      domainModel: { status },
      todolistId: todolistId,
    });
  };

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      updateTask({
        taskId: task.id,
        domainModel: { title },
        todolistId: todolistId,
      });
    },
    [task.id, todolistId],
  );

  return (
    <div
      key={task.id}
      className={task.status === TaskStatuses.Completed ? s.isDone : ""}
    >
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onChangeTaskStatusHandler}
      />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

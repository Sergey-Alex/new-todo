import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { useCallback } from "react";
import {
  TodolistDomainType,
  todolistsThunks,
} from "features/TodolistsList/model/todolists.reducer";
import { useActions } from "common/hooks";

type Props = {
  todolist: TodolistDomainType;
};
export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);
  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ id, title });
    },
    [id],
  );

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </h3>
  );
};

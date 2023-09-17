import { setAppError, setAppStatusAC } from "app/app-reducer";
import { ResponseType } from "api/todolist-api";
import { AppActionsType } from "app/store";
import { Dispatch } from "redux";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<AppActionsType>,
) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]));
  } else {
    dispatch(setAppError("some error"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkError = (
  err: { messages: string },
  dispatch: Dispatch<AppActionsType>,
) => {
  dispatch(setAppError(err.messages ? err.messages : "some error occurred"));
  dispatch(setAppStatusAC("failed"));
};

import { ResponseType } from "api/todolist-api";

import { Dispatch } from "redux";
import { appAction } from "app/app-reducer";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch,
) => {
  if (data.messages.length) {
    dispatch(appAction.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appAction.setAppError({ error: "some error" }));
  }
  dispatch(appAction.setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (
  err: { messages: string },
  dispatch: Dispatch,
) => {
  dispatch(
    appAction.setAppError({
      error: err.messages ? err.messages : "some error occurred",
    }),
  );
  dispatch(appAction.setAppStatus({ status: "failed" }));
};

import { appAction, AppInitialState, appReducer } from "./app-reducer";

let startState: AppInitialState;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: false,
  };
});

test("correct error message should be", () => {
  const endState = appReducer(
    startState,
    appAction.setAppError({ error: "some error" }),
  );
  expect(endState.error).toBe("some error");
});
test("correct status message should be set", () => {
  const endState = appReducer(
    startState,
    appAction.setAppStatus({ status: "failed" }),
  );
  expect(endState.status).toBe("failed");
});

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import authReducer from "./authentication/reducer";
import settingsReducer from "./settings/reducer";
import chatsReducer from "./chats/reducer";
import * as authenticationActions from "./authentication/actions";
import * as settingsActions from "./settings/actions";
import * as chatsActions from "./chats/actions";
import { sagas } from "../sagas";
import { StateType, ActionType } from "typesafe-actions";

const sagaMiddleware = createSagaMiddleware();

export const routeAction = {
  settingsActions,
  authenticationActions,
  chatsActions,
};
export const rootReducer = combineReducers({
  authentication: authReducer,
  settings: settingsReducer,
  chats: chatsReducer,
});

export type RootStore = StateType<typeof import("./index").default>;
export type RootState = StateType<typeof import("./index").rootReducer>;
export type RootAction = ActionType<typeof import("./index").routeAction>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function configureStore() {
  const middlewares: any[] = [sagaMiddleware];
  let customCompose: any = compose;

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
    customCompose = composeWithDevTools;
  }

  const store = createStore(
    rootReducer,
    customCompose(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);

  return store;
}

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import authReducer from "./authentication/reducer";
import contactsReducer from "./contacts/reducer";
import conversationReducer from "./conversation/reducer";
import settingsReducer from "./settings/reducer";
import * as authenticationActions from "./authentication/actions";
import * as contactsActions from "./contacts/actions";
import * as conversationsActions from "./conversation/actions";
import * as settingsActions from "./settings/actions";
import { sagas } from "../sagas";
import { StateType, ActionType } from "typesafe-actions";

const sagaMiddleware = createSagaMiddleware();

export const rootAction = {
  authenticationActions,
  contactsActions,
  conversationsActions,
  settingsActions,
};

export const rootReducer = combineReducers({
  authentication: authReducer,
  contacts: contactsReducer,
  conversations: conversationReducer,
  settings: settingsReducer,
});

export type RootStore = StateType<typeof import("./index").default>;
export type RootState = StateType<typeof import("./index").rootReducer>;
export type RootAction = ActionType<typeof import("./index").rootAction>;

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

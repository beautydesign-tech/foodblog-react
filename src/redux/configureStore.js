import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { resources } from "./resources";
import { comments } from "./comments";
import { promotions } from "./promotions";
import { partners } from "./partners";
import { favorites } from "./favorites";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      resources,
      comments,
      partners,
      promotions,
      favorites,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};

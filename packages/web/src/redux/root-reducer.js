import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import playerReducer from "./musicPlayer/player-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
});

export default rootReducer;

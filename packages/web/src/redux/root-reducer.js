import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import UploaderReducer from "./uploader/uploader-reducer";
import playerReducer from "./musicPlayer/player-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  uploader: UploaderReducer,
});

export default rootReducer;

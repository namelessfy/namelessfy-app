import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import UploaderReducer from "./uploader/uploader-reducer";
import playerReducer from "./musicPlayer/player-reducer";
import userReducer from "./user/user-reducer";
import SongReducer from "./song/song-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  uploader: UploaderReducer,
  user: userReducer,
  song: SongReducer,
});

export default rootReducer;

import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import playerReducer from "./musicPlayer/player-reducer";
import userReducer from "./user/user-reducer";
import SongReducer from "./song/song-reducer";
import PlaylistReducer from "./playlist/playlist-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  user: userReducer,
  song: SongReducer,
  playlist: PlaylistReducer,
});

export default rootReducer;

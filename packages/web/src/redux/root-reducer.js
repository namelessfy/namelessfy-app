import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import UploaderReducer from "./uploader/uploader-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: UploaderReducer,
});

export default rootReducer;

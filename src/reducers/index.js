import { combineReducers } from "redux";
import posts from './posts'
import auth from './Auth/auth'

export default combineReducers({
    posts, auth
})
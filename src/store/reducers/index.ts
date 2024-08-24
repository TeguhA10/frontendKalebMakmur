import { combineReducers } from 'redux';
import authReducers from './authReducers';

const rootReducer = combineReducers({
    auth: authReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

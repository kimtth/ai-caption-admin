import { combineReducers } from 'redux';
import metas from './metaContext';

const rootReducer = combineReducers({
    metas,
});

export default rootReducer;

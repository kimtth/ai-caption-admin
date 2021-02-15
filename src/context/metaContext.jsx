import { createAction, handleActions } from 'redux-actions'

const LOGGEDIN = 'sign/LOGIN';
export const setLoggedIn = createAction(LOGGEDIN);

const initialState = {
    loggedin: false
}

export const metas = handleActions(
    {
        [LOGGEDIN]: (state) => ({ ...state, loggedin: !state.loggedin }),
    },
    initialState,
)

export default metas;
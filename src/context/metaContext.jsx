import { createAction, handleActions } from 'redux-actions'

const USERID = 'user/USERID';
export const setUserId = createAction(USERID);

const initialState = {
    userId: ''
}

export const metas = handleActions(
    {
        [USERID]: (state, { payload: userId }) => ({ ...state, userId: userId }),
    },
    initialState,
)

export default metas;
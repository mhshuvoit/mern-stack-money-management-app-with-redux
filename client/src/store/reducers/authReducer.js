import * as Types from '../actions/types'
//Dispatch ekta object
const init = {
    isAuthenticated: false,
    user: {},
    error: {}
}

const authReducer = (state = init, action) => { //Reducer ekta function
    switch (action.type) {
        case Types.SET_USER: {
            return {
                user: action.payload.user, //jokhn action ghotabo tkhn payload er sathe ekta user object pathabo
                isAuthenticated: Object.keys(action.payload.user).length !== 0, //ey mathod er kaz holo user er object er moddhe joto gulo key ase sob key gulo ekta jagay array akare return korbe
                error: {}
            }
        }
        case Types.USERS_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state
    }
}

export default authReducer
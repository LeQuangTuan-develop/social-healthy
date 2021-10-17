import storage from "../util/storage"

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            storage.set(action.payload)
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "LOGIN_FAILUE":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            }
        case "LOGOUT":
            storage.set(null)
            return {
                user: null,
                isFetching: false,
                error: false,
            }
        case "FOLLOW":
            let follow = {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]
                }
            }
            storage.set(follow.user)
            return follow
        case "UNFOLLOW":
            let unfollow = {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(follow => follow !== action.payload)
                }
            }
            storage.set(unfollow.user)
            return unfollow
        default:
            return state
    }
}

export default AuthReducer
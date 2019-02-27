import {LOAD_USERS, SAVE_USER_ANSWER, SAVE_USER_QUESTION} from '../actions/usersActions'
import {initialState} from '../initialState'

export default function users(state = initialState.users, action) {
    switch (action.type) {
        case LOAD_USERS :
            return {
                ...state,
                ...action.users
            }
        case SAVE_USER_ANSWER :
            return {
                ...state,
                [action.user]: {
                    ...state[action.user],
                    answers: {
                        ...state[action.user].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case SAVE_USER_QUESTION :
            return {
                ...state,
                [action.user]: {
                    ...state[action.user],
                    questions: [...state[action.user].questions, action.qid]
                }
            }
        default :
            return state
    }
}
import {SET_LOGGED_USER, LOGOUT_USER} from '../actions/loggedUserAction'
import {CATEGORIZE_QUESTIONS} from '../actions/questionActions'
import {initialState} from "../initialState";

export default function loggedUser (state = initialState.loggedUser, action) {
    switch (action.type) {
        case SET_LOGGED_USER :
            return loggedUser = action.id
        case LOGOUT_USER:
            return  loggedUser = null
        default :
            return state
    }
}

export function categorizeQuestions (state =initialState.categorize, action){
    switch (action.type) {
        case CATEGORIZE_QUESTIONS:
            return {
                answeredQuestions:action.answered,
                unansweredquestions: action.unanswered,
            }    
        default :
            return state
    }
}
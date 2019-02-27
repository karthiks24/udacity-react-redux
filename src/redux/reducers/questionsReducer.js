import {LOAD_QUESTIONS, SAVE_VOTE, SAVE_QUESTION, } from '../actions/questionActions'
import {initialState} from '../initialState'

export default function questions (state = initialState.questions, action) {
    switch (action.type) {
        case LOAD_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case SAVE_VOTE : {
            const votes = state[action.qid][action.answer].votes
            return {...state, [action.qid] : {...state[action.qid], [action.answer] : { ...state[action.qid][action.answer],
                        votes : votes.concat([action.loggedUser])
                    }
                }
            }
        }
        case SAVE_QUESTION :
            return {
                ...state,
                [action.question.id]: action.question,
            }
        default :
            return state
    }


}
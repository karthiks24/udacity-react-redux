import { combineReducers } from 'redux'
import users from '../reducers/usersReducer'
import questions  from '../reducers/questionsReducer'
import loggedUser, {categorizeQuestions} from '../reducers/loggedUserReducer'

export default combineReducers({
    users,
    questions,
    loggedUser,
    categorizeQuestions
})

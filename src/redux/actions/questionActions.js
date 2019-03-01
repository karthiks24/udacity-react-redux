import {_getQuestions,  _saveQuestion, _saveQuestionAnswer} from '../../utils/_DATA'
import { saveUserAnswer, saveUserQuestion} from './usersActions'

export const LOAD_QUESTIONS= 'LOAD_QUESTIONS'
export const CATEGORIZE_QUESTIONS = 'CATEGORIZE_QUESTIONS'
export const SAVE_VOTE= 'SAVE_VOTE'
export const SAVE_QUESTION= 'SAVE_QUESTION'

export function loadQuestions (questions) {
    return {
        type: LOAD_QUESTIONS,
        questions,
    }
}

export function saveVote (loggedUser, qid, answer) {
    return {
        type: SAVE_VOTE,
        loggedUser,
        qid,
        answer
    }
}

export function saveQuestion (question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

//fetch the available question  in the data sheet
export function getQuestion() {
    return async dispatch => {
        try{
            const questions = await _getQuestions();
            return dispatch(loadQuestions(questions))
        }
        catch(error){
            console.log(error)
        }
    }
}
//to categorize the questions(answered & unanswered)
export function categorizeQuestions (question,loggedUser,users) {
    const questionsArray = Object.values(question)
    const user = (users[loggedUser])
    const loggedUserAnswers = (loggedUser !== undefined)? Object.keys(user.answers): []
    var answered=[]
    var unanswered=[]
    questionsArray.filter((question) => {
        return loggedUserAnswers.includes(question.id) ? answered.push(question) : unanswered.push(question)
    })

    return {
        type: CATEGORIZE_QUESTIONS,
        answered,
        unanswered
    }
}

//To save the voted option
export function handleVote(loggedUser, question, answer) {
    return async dispatch => {
        await _saveQuestionAnswer({authedUser: loggedUser,
            qid: question.id,
            answer: answer})
        try{
            dispatch(saveUserAnswer(loggedUser, question.id, answer));
            dispatch(saveVote(loggedUser, question.id, answer));
        }
        catch(error)  {
            alert('Oops! There was an error. Please try again.')
        }
    }
}

//To Add the question keyed in
export function addQuestion(author, optionOne, optionTwo) {
    const question = {
        author: author,
        optionOneText: optionOne,
        optionTwoText: optionTwo
    }
    return async dispatch => {
        const savedQuestion= await _saveQuestion(question)
        try{
            dispatch(saveQuestion(savedQuestion))
            dispatch(saveUserQuestion(savedQuestion.author, savedQuestion.id))
        }
        catch(error)  {
            alert('Oops! There was an error. Please try again.')
            console.log(error)
        }
    }
}

import { _getUsers } from '../../utils/_DATA'

export const LOAD_USERS = 'LOAD_USERS'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'

export function loadUsers (users) {
    return {
        type: LOAD_USERS,
        users,
    }
}

export function saveUserAnswer (user, qid, answer) {
    return {
        type: SAVE_USER_ANSWER,
        user,
        qid,
        answer
    }
}

export function saveUserQuestion (user, qid) {
    return {
        type: SAVE_USER_QUESTION,
        user,
        qid,
    }
}

export function fetchUsers() {
    return async dispatch => {
        try{
            const users = await  (_getUsers());
            return dispatch(loadUsers(users))
        }
        catch(error){
            console.log(error)
        }
    }
}
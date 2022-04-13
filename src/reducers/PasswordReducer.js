import { v1 as uuid } from 'uuid'
export const PasswordReducer = ( state, action )=>{
    switch(action.type){
        case 'ADD_PASSWORD':
            return [...state, {
                password:action.password,
                date:action.date,
                id:uuid()
            }]
        case "REMOVE_PASSWORD":
            return state.filter(password => password.id!==action.id)
        default:
            return state
    }
}
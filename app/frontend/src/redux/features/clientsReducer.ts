import { Client } from 'src/types/Client'

export const CREATE_CLIENT = 'createClient'
export const UPDATE_CLIENT = 'updateClient'
type ClientActionType = { type: string; payload: string; id: number }

const initialState: Client[] = []

export default function clientsReducer(state = initialState, action: ClientActionType) {
    switch (action.type) {
        case CREATE_CLIENT: {
            // Can return just the new todos array - no extra object around it
            return [
                ...state,
                {
                    text: action.payload,
                    completed: true,
                },
            ]
        }
        /* case UPDATE_CLIENT: {
            return state.map(todo => {
                if (todo.id !== action.payload) {
                    return todo
                }

                return {
                    ...todo,
                    completed: !todo.completed,
                }
            })
        } */
        default:
            return state
    }
}

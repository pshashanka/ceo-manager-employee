import { ApplicationAction, ApplicationState, Role } from '../types/models'

export const initialState: ApplicationState = {
  role: Role.Employee,
  documents: []
}

export const reducer = (state: ApplicationState, action: ApplicationAction) => {
  switch (action.type) {
    case 'role':
      return { ...state, ...action.payload }
    default:
      throw new Error()
  }
}

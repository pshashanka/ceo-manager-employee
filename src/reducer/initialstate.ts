import { ApplicationAction, ApplicationState, Role } from '../types/models'

export const initialState: ApplicationState = {
  role: Role.Employee,
  documents: []
}

export const reducer = (state: ApplicationState, action: ApplicationAction) => {
  switch (action.type) {
    case 'role':
      console.log('new State ', state)
      return { ...state, role: state.role }
    default:
      throw new Error()
  }
}

import React, { useReducer } from 'react'
import RoleSelector from './components/RoleSelector'
import EmployeeScreen from './components/EmployeeScreen'
import ManagerScreen from './components/ManagerScreen'
import CEOScreen from './components/CEOScreen'

import { reducer, initialState, initFunc } from 'reducer/AppState'
import createPayLoad from 'reducer/CreatePayLoad'
import { Approval, Role } from './types/models'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initFunc)
  return (
    <div>
      <div>
        <RoleSelector
          role={state.role}
          onChange={(role) =>
            dispatch({ type: 'role', payload: createPayLoad({ role }) })
          }
        />
        {state.role === Role.Employee && (
          <EmployeeScreen
            role={state.role}
            documents={state.documents}
            createDocument={(document) =>
              dispatch({
                type: 'document',
                payload: createPayLoad({ documents: [document] })
              })
            }
          />
        )}
        {state.role === Role.Manager && (
          <ManagerScreen
            role={state.role}
            documents={state.documents}
            approvals={state.approvals}
            approveDocument={(approval: Approval) =>
              dispatch({
                type: 'approval',
                payload: createPayLoad({
                  approvals: [approval]
                })
              })
            }
          />
        )}
        {state.role === Role.CEO && (
          <CEOScreen
            role={state.role}
            documents={state.documents}
            approvals={state.approvals}
            approveDocument={(approval: Approval) =>
              dispatch({
                type: 'approval',
                payload: createPayLoad({
                  approvals: [approval]
                })
              })
            }
          />
        )}
      </div>
    </div>
  )
}

export default App

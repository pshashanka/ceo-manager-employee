import React, { useReducer } from 'react'
import RoleSelector from './components/RoleSelector'
import { reducer, initialState } from 'reducer/initialstate'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="flex flex-col justify-center py-6 sm:py-12 min-h-screen bg-gray-100">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="relative sm:p-20 py-10 px-4 bg-white sm:rounded-3xl shadow-lg">
          <RoleSelector
            role={state.role}
            onChange={(role) => dispatch({ type: 'role', payload: { role } })}
          />
        </div>
      </div>
    </div>
  )
}

export default App

import React from 'react'
import { Role, Roles } from '../types/models'

interface RoleProps {
  role: Role
  onChange: (role: Role) => void
}

const RoleSelector: React.FC<RoleProps> = ({ role, onChange }) => (
  <div>
    <label htmlFor="roles">Choose a Role:</label>

    <select name="roles" id="roles" value={role}>
      {Roles.map((r, index) => (
        <option key={index} value={r}>
          {r}
        </option>
      ))}
    </select>
  </div>
)

export default RoleSelector

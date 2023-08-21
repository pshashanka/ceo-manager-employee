import { ApplicationState, Role, ApplicationPayload } from '../types/models'

const createPayLoad = ({
  role,
  documents,
  approvals
}: ApplicationPayload): ApplicationState => {
  return {
    role: role || Role.Employee,
    documents: documents || [],
    approvals: approvals || []
  }
}

export default createPayLoad

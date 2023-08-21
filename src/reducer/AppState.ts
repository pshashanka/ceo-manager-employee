import {
  ApplicationAction,
  ApplicationState,
  Role,
  Document,
  Approval,
  DocumentType,
  DocumentStatus
} from '../types/models'
import { REQUISITION_MANAGER_LIMIT } from '../constants/ApplicationConstants'
export const initFunc = (): ApplicationState => {
  return { role: Role.Employee, documents: [], approvals: [] }
}

export const initialState: ApplicationState = {
  role: Role.Employee,
  documents: [],
  approvals: []
}

/**
 * utility function to create approval obj from document
 */
const createApprovalFromDocument = (documents: Document[] = []): Approval[] => {
  return documents.map((doc) => {
    let approver = Role.Manager

    if (
      doc.type === DocumentType.Requisition &&
      doc.cost &&
      doc.cost > REQUISITION_MANAGER_LIMIT
    ) {
      approver = Role.CEO
    }

    const approval: Approval = {
      documentId: doc.id,
      approver: approver,
      decision: DocumentStatus.Pending
    }

    return approval
  })
}

/**
 * utility to get updated documents based on Approvals
 */
const updateDocumentsFromApproal = (
  state: ApplicationState,
  approvals: Approval[]
) => {
  return state.documents.map((doc) => {
    const found = approvals.find((approval) => doc.id === approval.documentId)
    if (found) {
      const newDoc = Object.assign({}, doc)
      newDoc.status = found.decision
      return newDoc
    }
    return doc
  })
}

/**
 * utility to get updated Approvals
 */
const updatedApprovals = (state: ApplicationState, approvals: Approval[]) => {
  const returnObj: Approval[] = []
  state.approvals.forEach((stateApproval) => {
    const found = approvals.find(
      (approval) => stateApproval.documentId === approval.documentId
    )

    if (found) {
      if (found.decision === DocumentStatus.Pending) {
        returnObj.push(found)
      } else {
        //skip adding
      }
    } else {
      returnObj.push(stateApproval)
    }
  })

  return returnObj
}

/**
 * Reducer
 */
export const reducer = (state: ApplicationState, action: ApplicationAction) => {
  switch (action.type) {
    case 'role':
      return { ...state, role: action.payload.role }
    case 'document':
      return {
        ...state,
        documents: state.documents
          ? state.documents.concat(action.payload.documents || [])
          : action.payload.documents,
        approvals: state.approvals
          ? state.approvals.concat(
              createApprovalFromDocument(action.payload.documents)
            )
          : createApprovalFromDocument(action.payload.documents)
      }
    case 'approval':
      return {
        ...state,
        documents: updateDocumentsFromApproal(state, action.payload.approvals),
        approvals: updatedApprovals(state, action.payload.approvals)
      }
    default:
      throw new Error()
  }
}

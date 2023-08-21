export enum Role {
  Employee = 'Employee',
  Manager = 'Manager',
  CEO = 'CEO'
}

export const Roles = [Role.CEO, Role.Employee, Role.Manager]

export enum DocumentType {
  Requisition = 'Requisition',
  ExpenseReport = 'ExpenseReport'
}

export enum DocumentStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export interface Document {
  id: string
  type: DocumentType
  description: string
  cost?: number
  total?: number
  status: DocumentStatus
  submittedAt: Date
}

export interface Approval {
  documentId: string
  approver: Role
  decision: DocumentStatus
}

export interface ApplicationState {
  role: Role
  documents: Document[]
  approvals: Approval[]
}

export interface ApplicationPayload {
  role?: Role
  documents?: Document[]
  approvals?: Approval[]
}

export interface ApplicationAction {
  type: 'role' | 'document' | 'approval'
  payload: ApplicationState
}

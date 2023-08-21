import { reducer, initialState, initFunc } from './AppState'
import {
  Role,
  Document,
  Approval,
  DocumentType,
  DocumentStatus
} from '../types/models'

test('initFunc', () => {
  const initial = initFunc()
  expect(initial.role).toBe(Role.Employee)
})

test('initialState', () => {
  const initial = initialState
  expect(initial.role).toBe(Role.Employee)
})

test('reducer - role', () => {
  const initial = initialState
  const out = reducer(initial, {
    type: 'role',
    payload: { role: Role.Manager, documents: [], approvals: [] }
  })
  expect(out.role).toBe(Role.Manager)
})

test('reducer - document', () => {
  const initial = initialState
  const document: Document = {
    id: 'doc-' + Date.now(),
    type: DocumentType.ExpenseReport,
    description: 'test',
    total: 2000,
    status: DocumentStatus.Pending,
    submittedAt: new Date()
  }
  const out = reducer(initial, {
    type: 'document',
    payload: { role: initial.role, documents: [document], approvals: [] }
  })
  expect(out.documents.length).toBe(1)
  expect(out.approvals.length).toBe(1)
})

test('reducer - approval', () => {
  const initial = initialState
  const document: Document = {
    id: 'doc-' + Date.now(),
    type: DocumentType.ExpenseReport,
    description: 'test',
    total: 2000,
    status: DocumentStatus.Pending,
    submittedAt: new Date()
  }
  const updated = reducer(initial, {
    type: 'document',
    payload: { role: initial.role, documents: [document], approvals: [] }
  })

  const approval: Approval = {
    documentId: document.id,
    decision: DocumentStatus.Approved,
    approver: Role.Manager
  }
  const approvedState = reducer(updated, {
    type: 'approval',
    payload: { role: initial.role, documents: [], approvals: [approval] }
  })
  expect(approvedState.documents.length).toBe(1)
  expect(approvedState.approvals.length).toBe(0)
})

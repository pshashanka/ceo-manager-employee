import React from 'react'
import { Role, Document, Approval, DocumentStatus } from '../types/models'
import { CEO_APPROVAL_TIMEOUT_SECONDS } from '../constants/ApplicationConstants'

interface ManagerScreenProps {
  role: Role
  documents: Document[]
  approvals: Approval[]
  approveDocument: (approval: Approval) => void
}

const ManagerScreen: React.FC<ManagerScreenProps> = ({
  role,
  documents,
  approvals,
  approveDocument
}) => {
  const handleApprove = (documentId: string, decision: DocumentStatus) => {
    const approval: Approval = { documentId, decision, approver: Role.Manager }
    approveDocument(approval)
  }

  const handleRefer = (documentId: string, decision: DocumentStatus) => {
    const approval: Approval = { documentId, decision, approver: Role.CEO }
    approveDocument(approval)
  }

  const filteredApprovals = approvals.filter((approval) => {
    if (approval.approver === Role.Manager) {
      return true
    }

    const document = documents.find((doc) => doc.id === approval.documentId)
    const diffInSeconds =
      (new Date().getTime() - (document?.submittedAt.getTime() || 0)) / 1000
    if (diffInSeconds > CEO_APPROVAL_TIMEOUT_SECONDS) {
      return true
    }

    return false
  })

  return (
    <div>
      <h1>Welcome, {role}!</h1>
      <div>
        <h2>Documents Pending Your Approval</h2>
        <ul>
          {filteredApprovals.map((approval) => {
            const document = documents.find(
              (doc) => doc.id === approval.documentId
            )
            return (
              document && (
                <li key={document.id}>
                  {document.description} - {document.status}
                  <p />
                  <button
                    onClick={() =>
                      handleApprove(document.id, DocumentStatus.Approved)
                    }
                  >
                    Approve
                  </button>
                  <span style={{ marginLeft: '20px' }} />
                  <button
                    onClick={() =>
                      handleApprove(document.id, DocumentStatus.Rejected)
                    }
                  >
                    Reject
                  </button>
                  <span style={{ marginLeft: '20px' }} />
                  <button
                    onClick={() =>
                      handleRefer(document.id, DocumentStatus.Pending)
                    }
                  >
                    Refer to CEO
                  </button>
                  <p />
                </li>
              )
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ManagerScreen

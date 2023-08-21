import React from 'react'
import { Role, Document, Approval, DocumentStatus } from '../types/models'
import { CEO_APPROVAL_TIMEOUT_SECONDS } from '../constants/ApplicationConstants'

interface CEOScreenProps {
  role: Role
  documents: Document[]
  approvals: Approval[]
  approveDocument: (approval: Approval) => void
}

const CEOScreen: React.FC<CEOScreenProps> = ({
  role,
  documents,
  approvals,
  approveDocument
}) => {
  const handleApprove = (documentId: string, decision: DocumentStatus) => {
    const approval: Approval = { documentId, decision, approver: Role.CEO }
    approveDocument(approval)
  }

  const filteredApprovals = approvals.filter((approval) => {
    if (approval.approver === Role.CEO) {
      const document = documents.find((doc) => doc.id === approval.documentId)
      const diffInSeconds =
        (new Date().getTime() - (document?.submittedAt.getTime() || 0)) / 1000
      if (diffInSeconds > CEO_APPROVAL_TIMEOUT_SECONDS) {
        return false
      }
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

export default CEOScreen

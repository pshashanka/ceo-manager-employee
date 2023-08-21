import React, { useState } from 'react'
import { Role, DocumentType, DocumentStatus, Document } from '../types/models'

interface EmployeeScreenProps {
  role: Role
  documents: Document[]
  createDocument: (document: Document) => void
}

const EmployeeScreen: React.FC<EmployeeScreenProps> = ({
  role,
  documents,
  createDocument
}) => {
  const [documentType, setDocumentType] = useState(DocumentType.Requisition)
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [total, setTotal] = useState(0)

  const handleCreateDocument = () => {
    const document: Document = {
      id: 'doc-' + Date.now(),
      type: documentType,
      description,
      cost,
      total,
      status: DocumentStatus.Pending,
      submittedAt: new Date()
    }
    createDocument(document)
    setDescription('')
    setCost(0)
    setTotal(0)
  }

  return (
    <div className="top-10">
      <h1 className="block text-2xl">Welcome, {role}!</h1>
      <div className="space-y-5">
        <h2 className="block text-lg">Create Document</h2>
        <label className="block">
          Type:
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
          >
            <option value={DocumentType.Requisition}>Requisition</option>
            <option value={DocumentType.ExpenseReport}>Expense Report</option>
          </select>
        </label>
        <p />
        <label>
          Description:{' '}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <p />
        {documentType === DocumentType.Requisition && (
          <label>
            Cost:{' '}
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </label>
        )}
        {documentType === DocumentType.ExpenseReport && (
          <label>
            Total:{' '}
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
            />
          </label>
        )}
        <p />
        <button className="rounded-full" onClick={handleCreateDocument}>
          Submit Document
        </button>
      </div>
      <div>
        <h2>Your Documents</h2>
        <ul>
          {documents?.map((document) => (
            <li key={document.id}>
              {document.description} - {document.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EmployeeScreen

import styled from 'styled-components';
import { useState, useRef } from 'react';
import API from '../api';

const UploadContainer = styled.div`
  background: ${({ isDragging }) => (isDragging ? '#d0f0ff' : '#e6f7ff')};
  border: 2px dashed ${({ isDragging }) => (isDragging ? '#339af0' : '#74c0fc')};
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 2rem;
  box-shadow: 0 6px 14px rgba(91, 88, 88, 0.04);
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgb(15, 58, 98);
  display: block;
  margin-bottom: 1rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Status = styled.div`
  margin-top: 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ type }) =>
    type === 'success' ? '#2f9e44' :
    type === 'error' ? '#d6336c' :
    type === 'info' ? '#1c7ed6' : '#495057'};
`;

export default function UploadBox({ onUpload }) {
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const handleUpload = async (file) => {
    if (!file || !file.name.toLowerCase().endsWith('.md')) {
      setStatus({ message: 'Only .md files are allowed.', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus({ message: 'Uploading...', type: 'info' });
      await API.post('/upload', formData);
      setStatus({ message: 'Upload successful!', type: 'success' });
      onUpload();
    } catch {
      setStatus({ message: 'Upload failed. Please try again.', type: 'error' });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <UploadContainer
      isDragging={isDragging}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current.click()}
    >
      <Label>Click or drag a Markdown (.md) file here</Label>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept=".md"
        onChange={(e) => handleUpload(e.target.files[0])}
      />
      {status.message && <Status type={status.type}>{status.message}</Status>}
    </UploadContainer>
  );
}

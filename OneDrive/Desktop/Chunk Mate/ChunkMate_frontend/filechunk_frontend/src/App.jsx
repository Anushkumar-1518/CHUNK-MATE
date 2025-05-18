import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from './api';
import Sidebar from './components/Sidebar';
import UploadBox from './components/UploadBox';
import ChunkViewer from './components/ChunkViewer';

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;

const RightPanel = styled.div`
  flex: 1;
  background: #f1f3f5;
  padding: 1rem;
  overflow-y: auto;
`;

function App() {
  const [documents, setDocuments] = useState([]);
  const [chunks, setChunks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchDocuments = async () => {
    const res = await API.get('/documents');
    setDocuments(res.data);
  };

  const fetchChunks = async (id) => {
    const res = await API.get(`/documents/${id}/chunks`);
    setChunks(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (selectedId) fetchChunks(selectedId);
  }, [selectedId]);

  return (
    <Container>
      <Sidebar
        documents={documents}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <RightPanel>
        <UploadBox onUpload={fetchDocuments} />
        <ChunkViewer chunks={chunks} />
      </RightPanel>
    </Container>
  );
}

export default App;

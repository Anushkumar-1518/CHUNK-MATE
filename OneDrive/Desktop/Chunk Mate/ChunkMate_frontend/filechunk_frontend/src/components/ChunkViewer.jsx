import styled from 'styled-components';

const ViewerContainer = styled.div`
  padding: 1rem;
  background-color: #f0f8ff; 
  border-radius: 12px;
`;

const ChunkBox = styled.div`
  background:rgb(60, 83, 104);
  border: 1px solid #ced4da;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(32, 30, 30, 0.03);
  color:rgb(24, 40, 106); 
`;

const ChunkNumber = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color:rgb(51, 90, 232);
`;

const ChunkContent = styled.pre`
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export default function ChunkViewer({ chunks }) {
  return (
    <ViewerContainer>
      <h3 style={{ marginBottom: '1rem', color: '#1c3faa' }}>Chunks</h3>
      {chunks.map((chunk) => (
        <ChunkBox key={chunk._id}>
          <ChunkNumber>Chunk {chunk.chunkNumber}</ChunkNumber>
          <ChunkContent>{chunk.content}</ChunkContent>
        </ChunkBox>
      ))}
    </ViewerContainer>
  );
}

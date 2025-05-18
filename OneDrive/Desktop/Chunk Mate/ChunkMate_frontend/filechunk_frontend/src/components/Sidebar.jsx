import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background:rgb(27, 12, 44);
  border-right: 1px solid #ddd;
  padding: 1rem;
`;

const DocItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  background: ${({ active }) => (active ? '#dee2e6' : '#fff')};
  cursor: pointer;
  &:hover {
    background:rgb(65, 121, 242);
  }
`;

export default function Sidebar({ documents, selectedId, onSelect }) {
  return (
    <SidebarContainer>
      <h3>Documents</h3>
      {documents.map((doc) => (
        <DocItem
          key={doc._id}
          active={selectedId === doc._id}
          onClick={() => onSelect(doc._id)}
        >
          {doc.name}
        </DocItem>
      ))}
    </SidebarContainer>
  );
}

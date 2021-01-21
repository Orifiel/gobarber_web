import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #212329;
  padding: 16px;
  width: 100%;
  color: #f5ede8;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }
  input {
    background: transparent;
    border: 0;
    flex: 1;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

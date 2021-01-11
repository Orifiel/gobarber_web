import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  border: 2px solid #212329;
  color: #666360;

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    background: transparent;
    border: 0;
    flex: 1;

    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }

    & + input {
      margin-top: 8px;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

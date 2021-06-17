import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  height: 100%;
`;
export const TopText = styled.p`
  color: ${({ theme }) => theme.textColor.dark};
  margin-bottom: 0.2rem;
  min-height: 1.25rem;
`;
export const BottomText = styled.p`
  color: ${({ theme }) => theme.textColor.dark};

  flex: 0 0 none;
  text-align: center;
  margin-top: 0.2rem;
  min-height: 1.25rem;
`;
export const StyledMatch = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
`;

export const Team = styled.div``;
export const Score = styled.div`
  display: flex;
  height: 100%;
  padding: 0 1rem;
  align-items: center;
  width: 20%;
  justify-content: center;
  background: ${({ theme, won }) =>
    won ? theme.darkCanvas3 : theme.darkCanvas3};
  color: ${({ theme, won }) =>
    won ? theme.textColor.main : theme.textColor.dark};
`;
export const Side = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1rem;
  background: ${({ theme, won }) =>
    won ? theme.darkCanvas5 : theme.darkCanvas4};

  :first-of-type {
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-top-width: 2px;
  }
  :last-of-type {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-width: 2px;
  }
  border-right: 4px solid ${({ theme }) => theme.mediumCanvas2};
  border-left: 4px solid ${({ theme }) => theme.mediumCanvas2};
  border-top: 1px solid ${({ theme }) => theme.mediumCanvas2};
  border-bottom: 1px solid ${({ theme }) => theme.mediumCanvas2};

  transition: border-color 0.5s ${({ theme }) => theme.smooth};
  ${Team} {
    color: ${({ theme, won }) =>
      won ? theme.textColor.main : theme.textColor.dark};
  }
  ${Score} {
    color: ${({ theme, won }) =>
      won ? theme.textColor.main : theme.textColor.dark};
  }
  ${({ hovered, theme, won }) =>
    hovered &&
    css`
      /* background: ${theme.mediumCanvas1}; */
      border-color: ${theme.lightCanvas3};
      ${Team} {
        color: ${theme.textColor.main};
      }
      ${Score} {
        color: ${won ? theme.highlight.main : theme.attention.main};
      }
    `}
`;
export const Line = styled.div`
  height: 1px;
  transition: border-color 0.5s ${({ theme }) => theme.smooth};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ highlighted, theme }) =>
    highlighted ? theme.lightCanvas3 : theme.mediumCanvas2};
`;

export const Anchor = styled.a`
  font-family: ${props => (props.font ? props.font : props.theme.fontFamily1)};
  font-weight: ${props => (props.bold ? '700' : '400')};
  color: ${props => props.theme.textColor.main};
  font-size: ${props => (props.size ? props.size : '1rem')};
  line-height: 1.375rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

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

interface ScoreProps {
  won?: boolean;
}
export const Score = styled.div<ScoreProps>`
  display: flex;
  height: 100%;
  padding: 0 1rem;
  align-items: center;
  width: 20%;
  justify-content: center;
  background: ${({ theme, won }: any) =>
    won ? theme.darkCanvas3 : theme.darkCanvas3};
  color: ${({ theme, won }: any) =>
    won ? theme.textColor.main : theme.textColor.dark};
`;
interface SideProps {
  won?: boolean;
  hovered?: boolean;
}
export const Side = styled.div<SideProps>`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1rem;
  background: ${({ theme, won }: any) =>
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
  border-right: 4px solid ${({ theme }) => theme.lineColor};
  border-left: 4px solid ${({ theme }) => theme.lineColor};
  border-top: 1px solid ${({ theme }) => theme.lineColor};
  border-bottom: 1px solid ${({ theme }) => theme.lineColor};

  transition: border-color 0.5s ${({ theme }) => theme.smooth};
  ${Team} {
    color: ${({ theme, won }: any) =>
      won ? theme.textColor.main : theme.textColor.dark};
  }
  ${Score} {
    color: ${({ theme, won }: any) =>
      won ? theme.textColor.main : theme.textColor.dark};
  }
  ${({ hovered, theme, won }: any) =>
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
interface LineProps {
  highlighted?: boolean;
}
export const Line = styled.div<LineProps>`
  height: 1px;
  transition: border-color 0.5s ${({ theme }) => theme.smooth};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ highlighted, theme }: any) =>
    highlighted ? theme.lightCanvas3 : theme.lineColor};
`;

export const Anchor = styled.a`
  font-family: ${(props: any) =>
    props.font ? props.font : props.theme.fontFamily1};
  font-weight: ${(props: any) => (props.bold ? '700' : '400')};
  color: ${(props: any) => props.theme.textColor.main};
  font-size: ${(props: any) => (props.size ? props.size : '1rem')};
  line-height: 1.375rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

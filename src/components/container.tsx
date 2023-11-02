import { styled } from "styled-components";

export const Container = styled.div`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.foreground};
`;

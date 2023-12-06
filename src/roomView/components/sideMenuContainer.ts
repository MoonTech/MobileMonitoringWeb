import { styled } from "styled-components";

export const SideMenuContainer = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.secondaryDark};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: 0.2s all;
`;

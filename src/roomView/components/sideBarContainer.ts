import { styled } from "styled-components";

export const SideBarContainer = styled.div`
  height: 100%;
  flex: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.colors.primaryLight};
  display: flex;
  flex-direction: column;
  transition: 0.2s all;
`;

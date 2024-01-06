import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyledLink = styled.div`
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.light};
`;

type SideMenuOptionProps = {
  isClickable?: boolean;
  link?: string;
  children: ReactNode | ReactNode[];
};

const SideMenuOptionContainer = styled.div<{ isClickable?: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isClickable
      ? props.theme.colors.secondaryDark
      : props.theme.colors.secondaryDarker};
  border-radius: 10px;
  transition: 0.2s all;
  &:hover {
    ${(props) =>
      props.isClickable
        ? `background-color: ${props.theme.colors.secondary};\n
    cursor: pointer;`
        : ""}
  }
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.light};
`;

export const SideMenuOption = ({
  isClickable,
  link,
  children,
}: SideMenuOptionProps) => {
  const navigate = useNavigate();
  return (
    <SideMenuOptionContainer isClickable={isClickable}>
      {isClickable ? (
        <StyledLink
          onClick={() => {
            navigate(link!);
            // window.location.reload();
          }}
        >
          {children}
        </StyledLink>
      ) : (
        <>{children}</>
      )}
    </SideMenuOptionContainer>
  );
};

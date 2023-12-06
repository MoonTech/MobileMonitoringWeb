import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
`;

export const AuthorizationForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.colors.lightColored};
`;

export const Header = styled.h2`
  color: ${(props) => props.theme.colors.primary};
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.lightColoredDarker};
`;

export const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  font-weight: bolder;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;
export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.red};
  margin-top: 10px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  margin-top: 10px;
  transition: color 0.1s;

  &:hover {
    color: ${(props) => props.theme.colors.primaryHover};
  }
`;

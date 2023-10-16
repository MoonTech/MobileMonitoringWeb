import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.foreground};
`;

export const AuthorizationForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.h2`
  color: ${(props) => props.theme.colors.light};
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.colors.foreground2};
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => props.theme.colors.middle};
  color: ${(props) => props.theme.colors.light};
  font-weight: bolder;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkMiddle};
  }
`;
export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.red};
  margin-top: 10px;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.foreground};
  font-size: 14px;
  margin-top: 10px;
  transition: color 0.1s;

  &:hover {
    color: #fff
  }
`;
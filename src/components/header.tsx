import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.colors.background2};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
`;

const Logo = styled.h1`
  font-family: "Droid Sans", serif;
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: flex;
  letter-spacing: 2px;
  color: ${(props) => props.theme.colors.light};
`;

const Header: React.FC = () => {
    return (
        <Container>
            <Logo>WatchTower</Logo>
        </Container>
    );
};

export default Header;
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Layout = () => {
  return (
    <Container>
      <Nav>
        <Nav.Item>
          <Nav.Link to="/">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </Container>
  )
};

export default Layout;

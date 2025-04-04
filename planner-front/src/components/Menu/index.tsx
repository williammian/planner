import { Navbar, Container, Nav } from "react-bootstrap";
import { PAGE } from "../../constants";

const Menu = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-1">
            <Container>
                <Navbar.Brand href={PAGE.ROOT}>Agenda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href={PAGE.ROOT}>Home</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu;
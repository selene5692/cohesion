import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'


export default function Navigation() {
  const navigate = useNavigate();
  
  async function handleSignOut() {
    try {
      await signOut(auth);
      // Redirect to the login page after successful sign-out
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  return (
    <Navbar variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="/">Cohesion!</Navbar.Brand>
        <Nav>
          <Nav.Link href="/add">New Activity</Nav.Link>
          <Nav.Link onClick={(e) => handleSignOut()}>Sign Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
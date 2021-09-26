import {Navbar, Container} from 'react-bootstrap'
const Header = () => {
    return (

        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={process.env.PUBLIC_URL + '/spinner.png'}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Alabinator
          </Navbar.Brand>
        </Container>
      </Navbar>

    )
}
export default Header;
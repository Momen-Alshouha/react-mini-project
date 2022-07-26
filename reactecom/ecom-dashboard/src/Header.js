import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Header() {

    let user = JSON.parse(localStorage.getItem('user-info'));
    let naviage = useNavigate();

    function logout(){
        localStorage.clear();
        naviage('/login')
    }

    return (
    <>
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
            <Nav className="me-auto navbar_wrapper">
                {
                    (localStorage.getItem('user-info'))?
                    <>
                    <NavLink to="/">Products List</NavLink>
                    <NavLink to="/add">Add Product</NavLink>
                    </>
                    :
                    <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    </>
                }
               
            
            </Nav>
            {
                localStorage.getItem('user-info') ?
                <Nav>
                    <NavDropdown title={user && user.name}>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>:null
            }
            </Container>
        </Navbar> 
    </div>
    <div className="jumbotron col-sm-6 offset-sm-3"><br />
        <h1 className="display-4">Welcome {user.name} !</h1>
        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non vulputate erat. Nunc interdum felis felis, nec hendrerit ipsum finibus id. Sed porta mi id eros mattis, eu vehicula risus mollis. Nulla facilisi.</p>
        <hr className="my-4" />
    </div>
    </>
    
    )
} 

export default Header
import './styles/scss/App.css';

// add 
import Container from 'react-bootstrap/Container';
import {BrowserRouter,Link, Route, Routes} from "react-router-dom";
import BoardRegister from './pages/board/BoardRegister';
import BoardList from './pages/board/BoardList';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Home from './pages/Home';
import BoardView from './pages/board/BoardView';
import { NavLink } from 'react-router-dom';
import Login from './pages/users/Login';
import SignUp from './pages/users/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Container fluid className="p-0">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">
            
            YONI FANS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/board/list" className="nav-link" >게시글</Link>
              <Link to="/board/add" className="nav-link" >등록</Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav >
              <Link to="/login" className="nav-link" >로그인</Link>
            </Nav>
            
          </Navbar.Collapse>      
        </Navbar>
        <ToastContainer />
      </Container>
      <Container className='p-5'>
          <Routes>
            <Route path='/' element={<Home/>} ></Route>
            <Route path='/board/list' element={<BoardList/>} ></Route>
            <Route path='/board/add' element={<BoardRegister/>} ></Route>
            <Route path='/board/:boardId' element={<BoardView/>} ></Route>
            <Route path='/board/edit/:boardId' element={<BoardRegister/>} ></Route>
            <Route path='/login' element={<Login/>} ></Route>
            <Route path='/signup' element={<SignUp/>} ></Route>
          </Routes>
      </Container>
    </BrowserRouter>

    </>
  );
}

export default App;

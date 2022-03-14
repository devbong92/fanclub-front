import './styles/scss/App.css';

// add 
import Container from 'react-bootstrap/Container';
import {BrowserRouter,Link, Route, Routes} from "react-router-dom";
import BoardRegister from './pages/board/BoardRegister';
import BoardList from './pages/board/BoardList';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Home from './pages/Home';
import BoardView from './pages/board/BoardView';
import Login from './pages/users/Login';
import SignUp from './pages/users/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { delCookie, getCookie, setCookie } from './utils/Cookie';

function App() {

  const REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 1;       // 1시간
  const [isAuth,setIsAuth] = useState(false);


  useEffect(() => {

    /**
     * TODO: 현재는 토큰을 쿠키에 넣고 있지만, 보안(XSS?)에 취약하므로, 수정 필요. 
     * react-redux를 이용해 accessToken는 따로 보관하거나, 다른 방법을 찾아보아야 할듯. 
     */
    if(getCookie('refreshToken') != null ){
      reIssue(getCookie('refreshToken'), getCookie('accessToken'));
    }
    
    
  },[axios.defaults.headers.common['Authorization']]);


  const reIssue = async (refreshToken:string, accessToken:string) => {
    await axios.post('/auth/reissue', {refreshToken,accessToken}).then((res? :any) => {
      console.log(' login: res  => {}',res);

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
      // refreshToken1 = `Bearer ${res.data.accessToken}`;

      const expires = new Date()
      expires.setTime(Date.now() + REFRESH_TOKEN_EXPIRE_TIME);

      setCookie('refreshToken',`${res.data.refreshToken}`,{path: '/', expires});
      setIsAuth(true);
    }).catch((err) => {
      console.log(' err , reIssue => {}' ,err);
      setIsAuth(false);
    });
  }

  const logOut = () => {
    
    delCookie('refreshToken'); 
    delCookie('accessToken');
    axios.defaults.headers.common['Authorization'] = ``;

    setIsAuth(false);
    
  }
  

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
              {
              isAuth 
              ? <Nav.Link onClick={logOut} className="nav-link" >로그아웃</Nav.Link>
              : <Link to="/login" className="nav-link" >로그인</Link>
              }
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

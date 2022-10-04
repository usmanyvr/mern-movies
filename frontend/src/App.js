import React from 'react'
import { Route, Routes, Router, Link,  useLocation} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav'
import { Navbar } from 'react-bootstrap'

import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

import logo from './logo.svg';
import './App.css';

function App() {
  const [user, setUser] = React.useState(null)
  
  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  const location = useLocation();

  return (
    <div className="App">
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link href='#link'>
              <Nav.Link>
                { user ? (
                  <a onClick={logout}>Logout User</a>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )
                }
              </Nav.Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes location={location} >
        <Route  path="/" element={<MoviesList />}>
        </Route>
        <Route  path="/movies" element={<MoviesList />}>
          {/* <Route path=":id" element={<Movie user={user} />}>
            <Route path="review" element={<AddReview user={user} />} />
          </Route> */}
        </Route>
        <Route path="/movies/:id/" element={<Movie user={user} />}></Route>
        <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        {/* <Route path="/movies/:id/review" render={(props) =>
          <AddReview {...props} user={user} />
        }> 
        </Route>
        <Route path="/movies/:id/" render={(props) => 
          <Movie {...props} user={user} />
        }>
        </Route> */}
        <Route path="/login" element={<Login login={login} />} />
        {/* <Route path='/login' render={(props) => 
          <Login {...props} login={login} />
        }>
        </Route> */}
      </Routes>

    </div>
  );
}

export default App;

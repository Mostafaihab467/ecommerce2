import React,{useEffect} from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { IUserModel } from '../../Models/userModel'

import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, Login } from '../../store/Action/userAction'
import { Logout } from './../../store/Action/userAction';
function Header() {



  let nav = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user.user) as IUserModel


  const getUsers=()=>{
   
    nav('../AlUsers')
  }

  useEffect(()=>{


  },[user.token])

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect >
        <Container className=''>
          <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => { nav('../../') }}>Pro Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ml-auto header_items">
              <Nav.Link href="../cart/"><i className='fas fa-shopping-cart' /> Cart</Nav.Link>
              {user.token == '' ? 
              <Nav.Link href='../../login'><i className='fas fa-user' />
                Sign In</Nav.Link> : 


              <div style={{display:'flex'}}>
                <NavDropdown title={user.name}>
                  <NavDropdown.Item href='../../MyProfile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{dispatch(Logout())}}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                
                {user.isAdmin ?
                  <NavDropdown title={user.isAdmin ? 'Admin' : null }>
                    <NavDropdown.Item href='../AlUsers' onClick={()=>{}}>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href='../AdminsEditScreen' onClick={()=>{}}>
                    Edit Products
                  </NavDropdown.Item>
                  </NavDropdown>
                  : null }
              </div>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
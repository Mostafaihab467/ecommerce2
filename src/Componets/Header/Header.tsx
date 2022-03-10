import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import './Header.scss'
function Header() {



  let nav =  useNavigate()

  return (
    <header>
    <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect >
    <Container className=''>
      <Navbar.Brand style={{cursor:'pointer'}} onClick={()=>{nav('../../')}}>Pro Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
     
        <Nav className="ml-auto header_items">
          <Nav.Link href="../cart/"><i className='fas fa-shopping-cart'/> Cart</Nav.Link>
          <Nav.Link href="#link"><i className='fas fa-user'/>  Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </header>
  )
}

export default Header
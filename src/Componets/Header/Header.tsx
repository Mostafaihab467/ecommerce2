import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "./../../store/Action/userAction";
import { toggleDarkMode } from "./../../store/Action/AppStateAction";
import { IUserModel } from "../../Models/userModel";
import SideBar from "./../Widgets/SideBar/SideBar"; // Import the SideBar component
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Header.scss";

function Header() {
  let nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user) as IUserModel;
  const isDarkMode = useSelector((state: any) => state.AppState.isDarkMode);
  const { t } = useTranslation();
  const { isRTL, changeLanguage } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSideBar, setShowSideBar] = useState(false); // State for sidebar visibility

  useEffect(() => {
    if (!user || !user.token) {
      nav("/login");
    }
  }, [user, nav]);

  useEffect(() => {
    // Apply dark mode class to body element
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    nav(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleSideBarClose = () => setShowSideBar(false); // Function to close the sidebar
  const handleSideBarShow = () => setShowSideBar(true); // Function to show the sidebar

  return (
    <header>
      <Navbar
        className="Header"
        variant={isDarkMode ? "dark" : "light"}
        bg={isDarkMode ? "dark" : "light"}
        expand="sm"
      >
        <Container>
          <div onClick={handleSideBarShow} className="Menuebar">
            {/* Hamburger menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => {
              nav("/");
            }}
          >
            {t('home.welcome')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className="ml-auto header_items">
              <Form onSubmit={handleSearch} className="d-flex">
                <Form.Control
                  type="search"
                  placeholder={t('common.search')}
                  className="me-2 Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-primary" type="submit">
                  {t('common.search')}
                </Button>
              </Form>

              <Nav.Link href="/cart" className="icon-link">
                <i className="fas fa-shopping-cart" /> {t('navigation.cart')}
              </Nav.Link>
              
              {!user || user.token === "" ? (
                <Nav.Link href="/login" className="icon-link">
                  <i className="fas fa-user" /> Sign In
                </Nav.Link>
              ) : (
                <div className="navWrapper">
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                     title={
                      <span className="user-info">
                        <Card.Img
                          src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                          alt="Profile"
                          className="profile-image"
                        />
                        <span>{user?.name || 'User'}</span>
                      </span>
                    }
                    menuVariant={isDarkMode ? "dark" : "light"}
                  >
                    <NavDropdown.Item href="/MyProfile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/AddProduct">
                      Add Product
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        dispatch(Logout());
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                    
                    <NavDropdown.Divider />
                    
                    {/* Language Switcher in Dropdown */}
                    <NavDropdown.Item>
                      <div className="language-dropdown-item">
                        <span className="language-label">{t('common.language')}:</span>
                        <div className="language-options">
                          <button 
                            className={`language-option ${isRTL ? 'active' : ''}`}
                            onClick={() => changeLanguage('ar')}
                          >
                            🇸🇦 العربية
                          </button>
                          <button 
                            className={`language-option ${!isRTL ? 'active' : ''}`}
                            onClick={() => changeLanguage('en')}
                          >
                            🇺🇸 English
                          </button>
                        </div>
                      </div>
                    </NavDropdown.Item>
                    
                    {user?.isAdmin && (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/AlUsers">
                          Users
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/AdminsEditScreen">
                          Edit Products
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                  <i
                    onClick={() => dispatch(toggleDarkMode())} // Dispatch the toggle action
                    className={`fas fa-${isDarkMode ? "sun" : "moon"}`}
                    style={{ marginRight: 10, cursor: "pointer" }}
                  />
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Render the SideBar component */}
      <SideBar show={showSideBar} handleClose={handleSideBarClose} />
    </header>
  );
}

export default Header;

import React, { useState, useEffect, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Dropdown
} from 'reactstrap';

import logo from '../../assets/logo.png';
import Loader from './Loader';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';



import usericon from '../../assets/usericon.svg';
import cart from '../../assets/cart.svg';
import logouticon from '../../assets/logout.svg';



const Header = (props) => {
  const { isUserAuthenticated, userDetails, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const [userD, setUserD] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(isUserAuthenticated());

  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdowntoggle = () => setDropdownOpen(!dropdownOpen);

  const [userdropdownOpen, setuserDropdownOpen] = useState(false);

  const userdropdowntoggle = () => setuserDropdownOpen(!userdropdownOpen);


  const [headerClass, setheaderClass] = useState(props.isFixedColor ? "scrolled" : "");

  const handleScroll = () => {
    if (!props.isFixedColor) setheaderClass(window.pageYOffset > 300 ? "scrolled" : "");
  }
  const scrollToRef = (ref) => {
    // console.log(props.sectionRef);
    if (window.innerWidth <= 770) toggle();

    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' })
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setUserD(userDetails());

  }, [])
  return (
    <>
      <header className={`main_header  ${headerClass}`}>
        <Navbar expand="md">
          <div className="container">
            <NavbarBrand href="/" className="mpartial_logo">
              <img src={logo} alt="logo" />
            </NavbarBrand>
            {/* <NavbarToggler onClick={toggle} /> */}
            <NavbarToggler onClick={toggle} className="mr-2" />

            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto main_navbar" navbar>

                <NavItem>
                  <NavLink className="nav-link" to="/#Approach" onClick={() => scrollToRef(props.sectionRef.home)}>Approach</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/#Ground-Truth-Data" onClick={() => scrollToRef(props.sectionRef.hero)}>Ground-Truth Data</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/#How-It-Works" onClick={() => scrollToRef(props.sectionRef.hIW)}>How It Works</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/#Fee-Structure" onClick={() => scrollToRef(props.sectionRef.wFall)}>Fee Structure</NavLink>
                </NavItem>
                <NavItem className="dropdown_desktop">

                  <Dropdown nav isOpen={dropdownOpen} toggle={dropdowntoggle}>
                    <DropdownToggle nav>
                      <NavLink className="nav-link" to="/" >Example Deliverables</NavLink>
                      <DropdownMenu>
                        <DropdownItem onClick={() => scrollToRef(props.sectionRef.Deli)}>Immaculate. Impartial. [ESX & PDF]</DropdownItem>
                        <DropdownItem onClick={() => scrollToRef(props.sectionRef.Deli)}>TrueSketch PLUS [SKX]</DropdownItem>
                      </DropdownMenu>
                    </DropdownToggle>

                  </Dropdown>
                </NavItem>
                <NavItem className="dropdown_mobile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <NavLink className="nav-link" to="#"  >Example Deliverables</NavLink>
                  {
                    dropdownOpen ? (
                      <>
                        <NavLink className="nav-link" to="#" onClick={() => scrollToRef(props.sectionRef.Deli)}>Immaculate. Impartial. [ESX & PDF]</NavLink>
                        <NavLink className="nav-link" to="#" onClick={() => scrollToRef(props.sectionRef.Deli)}>TrueSketch PLUS [SKX]</NavLink>
                      </>
                    ) : ''
                  }

                </NavItem >
                <NavItem>
                  <NavLink className="nav-link" to="#" onClick={() => scrollToRef(props.sectionRef.cont)}>Contact Us</NavLink>
                </NavItem >

                {isLoggedIn ? (
                  <>
                    <NavItem className="dropdown_desktop">
                      <Dropdown nav isOpen={userdropdownOpen} toggle={userdropdowntoggle}>
                        <DropdownToggle nav>
                          <NavLink className="nav-link" to="#" >Hi, {userD.lastName}</NavLink>
                          <DropdownMenu className="profile_header_links">
                            <DropdownItem><Link to="/profile"><img src={usericon} alt="" /> My Account</Link></DropdownItem>
                            <DropdownItem><Link to="/orders"><img src={cart} alt="" /> My Orders</Link></DropdownItem>
                            <DropdownItem onClick={logout}><img src={logouticon} alt="" /> Logout</DropdownItem>
                          </DropdownMenu>
                        </DropdownToggle>
                      </Dropdown>
                    </NavItem >
                    <NavItem className="dropdown_mobile user_logged_link" onClick={() => setuserDropdownOpen(!userdropdownOpen)}>
                      <NavLink className="nav-link" to="#"  >Hi, {userD.lastName}</NavLink>
                      {
                        userdropdownOpen ? (
                          <>
                            <Link to="/profile"><img src={usericon} alt="" /> My Account</Link>
                            <Link to="/orders"><img src={cart} alt="" /> My Orders</Link>
                            <Link to="#" onClick={logout}><img src={logouticon} alt="" /> Logout</Link>
                          </>
                        ) : ''
                      }

                    </NavItem >
                  </>
                ) : (
                    <NavItem>
                      <Link to="/login">
                        <button className="btn btn-primary login_btn">Login</button>
                      </Link>
                    </NavItem>
                  )}


              </Nav >
            </Collapse >

          </div>
        </Navbar >
      </header >
      <Loader></Loader>
    </>
  );
};


export default Header;

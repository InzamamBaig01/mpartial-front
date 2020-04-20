import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Dropdown
} from 'reactstrap';

import logo from '../../assets/logo.png';
import Loader from './Loader';
import { Link } from 'react-router-dom';
const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdowntoggle = () => setDropdownOpen(!dropdownOpen);


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
                  <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.home)}>Approach</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.hero)}>Ground-Truth Data</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.hIW)}>How It Works</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.wFall)}>Fee Structure</NavLink>
                </NavItem>
                <NavItem className="dropdown_desktop">

                  <Dropdown nav isOpen={dropdownOpen} toggle={dropdowntoggle}>
                    <DropdownToggle nav>
                      <NavLink href="#" >Example Deliverables</NavLink>
                      <DropdownMenu>
                        <DropdownItem onClick={() => scrollToRef(props.sectionRef.Deli)}>Immaculate. Impartial. [ESX & PDF]</DropdownItem>
                        <DropdownItem onClick={() => scrollToRef(props.sectionRef.Deli)}>TrueSketch PLUS [SKX]</DropdownItem>
                      </DropdownMenu>
                    </DropdownToggle>

                  </Dropdown>
                </NavItem>
                <NavItem className="dropdown_mobile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <NavLink href="#"  >Example Deliverables</NavLink>
                  {
                    dropdownOpen ? (
                      <>
                        <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.Deli)}>Immaculate. Impartial. [ESX & PDF]</NavLink>
                        <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.Deli)}>TrueSketch PLUS [SKX]</NavLink>
                      </>
                    ) : ''
                  }

                </NavItem >
                <NavItem>
                  <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.cont)}>Contact Us</NavLink>
                </NavItem >
              </Nav >
              <NavbarText>
                <Link to="/login">
                  <button className="btn btn-primary login_btn">Login</button>
                </Link>
              </NavbarText>
            </Collapse >

          </div>
        </Navbar >
      </header >
      <Loader></Loader>
    </>
  );
};


export default Header;

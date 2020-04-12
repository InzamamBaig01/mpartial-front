

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
  NavbarText
} from 'reactstrap';

import logo from '../../assets/logo.png';
import Loader from './Loader';
const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [headerClass, setheaderClass] = useState("");

  const handleScroll = () => {
    setheaderClass(window.pageYOffset > 300 ? "scrolled" : "");
  }
  const scrollToRef = (ref) => {
    // window.scrollTo(0, ref.current.offsetTop)
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
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto main_navbar" navbar>

                <NavItem>
                  <NavLink href="javascript:;" onClick={() => scrollToRef(props.sectionRef.home)}>Approach</NavLink>
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
                <NavItem>
                  <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.Deli)}>Example Deliverables</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={() => scrollToRef(props.sectionRef.cont)}>Contact Us</NavLink>
                </NavItem >
              </Nav >
              <NavbarText>
                <button className="btn btn-primary login_btn">Login</button>
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
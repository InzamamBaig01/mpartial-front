import React, { useState, useEffect, useContext } from "react";
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
  Dropdown,
} from "reactstrap";

import logo from "../../assets/logo.png";
import Loader from "./Loader";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "contexts/authContext";

import usericon from "../../assets/usericon.svg";
import cart from "../../assets/cart.svg";
import logouticon from "../../assets/logout.svg";
import rightarrow from "../../assets/right-arrow.svg";
import rightarrowdark from "../../assets/right-arrow-dark.svg";

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

  const [headerClass, setheaderClass] = useState(
    props.isFixedColor ? "scrolled" : ""
  );

  const handleScroll = () => {
    if (!props.isFixedColor)
      setheaderClass(window.pageYOffset > 300 ? "scrolled" : "");
  };
  const scrollToRef = (ref) => {
    // console.log(props.sectionRef);
    if (window.innerWidth <= 770) toggle();

    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setUserD(userDetails());
  }, []);
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
                {isLoggedIn ? (
                  <>
                    <NavItem>
                      <NavLink className="nav-link" to="/order">
                        Submission Portal
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className="nav-link"
                        to="/#Contact-US"
                        onClick={() => {
                          if (props.sectionRef)
                            scrollToRef(props.sectionRef.cont);
                        }}
                      >
                        Contact Us
                      </NavLink>
                    </NavItem>

                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        <span className="nav-link" id="toBold">
                          Hey, {userD.lastName}
                          {headerClass == "" && window.innerWidth >= 1030 ? (
                            <img src={rightarrow} alt="right arrow" />
                          ) : (
                            <img src={rightarrowdark} alt="dark right arrow" />
                          )}
                        </span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <Link to="/profile">
                            <img src={usericon} alt="user icon" /> My Account
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/orders">
                            <img src={cart} alt="cart" /> My Orders
                          </Link>
                        </DropdownItem>
                        <DropdownItem onClick={logout}>
                          <img src={logouticon} alt="logout icon" /> Sign Out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </>
                ) : (
                  <>
                    <NavItem>
                      <NavLink
                        className="nav-link"
                        to="/#Ground-Truth-Data"
                        onClick={() => {
                          if (props.sectionRef)
                            scrollToRef(props.sectionRef.hero);
                        }}
                      >
                        Ground-Truth Data
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-link"
                        to="/#How-It-Works"
                        onClick={() => {
                          if (props.sectionRef)
                            scrollToRef(props.sectionRef.hIW);
                        }}
                      >
                        How It Works
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-link"
                        to="/#Fee-Structure"
                        onClick={() => {
                          if (props.sectionRef)
                            scrollToRef(props.sectionRef.wFall);
                        }}
                      >
                        Fee Structure
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-link"
                        to="/#Example-Deliverables"
                        onClick={() => {
                          if (props.sectionRef)
                            scrollToRef(props.sectionRef.Deli);
                        }}
                      >
                        Example Deliverables
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/order">
                        Submission Portal
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className="nav-link"
                        to="/#Contact-US"
                        onClick={() => {
                          if (props.sectionRef)
                            scrollToRef(props.sectionRef.cont);
                        }}
                      >
                        Contact Us
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <Link to="/login">
                        <button className="btn btn-primary login_btn">
                          Sign In
                        </button>
                      </Link>
                    </NavItem>
                  </>
                )}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </header>
    </>
  );
};

export default Header;

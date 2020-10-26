import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron fluid>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>Food By Us</h1>
                <h2>a foodie's journey of going local</h2>
              </div>
            </div>
          </div>
        </Jumbotron>

        <Navbar dark sticky="top" expand="md">
          <div className="container">
            <NavbarBrand href="/">Food By Us</NavbarBrand>
            {/* insert an image above ^^ <img src="/assets/images/logo.png" height="30" width="30" alt="Food 4 Us Logo" /> */}
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <i className="fa fa-cutlery fa-lg" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <i className="fa fa-book fa-lg" /> Our Story
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/resources">
                    <i className="fa fa-lightbulb-o fa-lg" /> Resources
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <i className="fa fa-send fa-lg" /> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;

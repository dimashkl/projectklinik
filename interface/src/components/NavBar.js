import {NavLink} from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import React, { Component } from "react";

export default class NavBar extends Component {
    render(){
        return(
         <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <NavLink href="/" className="navbar-brand">
              <img src={logo} alt="" width={100} height={50}/>
            </NavLink>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="navbarCollapse">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav navbarScroll">
                <a href="/" class="nav-item nav-link">HOME</a>
                <a href="/listklinik" class="nav-item nav-link">KLINIK</a>
            </div>
            <div class="navbar-nav ms-auto navbarScroll">              	
                <a href="/custom2" class="nav-item nav-link">BOOKING</a>
            </div>
            </div>
          </div>
          </nav>
          
        )
    }
  }
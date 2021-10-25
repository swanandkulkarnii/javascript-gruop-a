import React from 'react'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">React Project</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/project" activeClassName="active">Project</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/modules" activeClassName="active">Modules</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/api" activeClassName="active">Api</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users" activeClassName="active">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/useraddress" activeClassName="active">User Address</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    )
}

export default Navbar
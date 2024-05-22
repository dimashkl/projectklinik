import {NavLink} from 'react-bootstrap';
import logo from '../assets/images/logo.png';
//import React, { useState ,useEffect } from "react";
//import axios from 'axios';
import { Nav, /*NavDropdown*/ Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
import { confirmAlert } from 'react-confirm-alert';

const NavigationBar = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      
      //const {user} = useSelector((state) => state.auth);

      /*const logout = () =>{
        dispatch(LogOut());
        dispatch(reset.reset());
        navigate("/")
      }*/

      const logout = () => {
        confirmAlert({
        title: 'Konfirmasi',
        message: 'Apakah Anda yakin ingin keluar ?',
        buttons: [
            {
            label: 'Ya',
            onClick: () => {
              dispatch(LogOut());
              dispatch(reset());
              navigate("/loginadmin");
              alert('Anda berhasil Logout !');
            }
            },
            {
            label: 'Tidak',
            onClick: () => {
                    navigate("/admin");
                
            }
            }
        ]
        });
    };

      const { user } = useSelector((state) => state.auth);

    /*  const redirect = () =>{
        alert("Anda sudah melakukan submit profile faskes sebelumnya, silakan tekan OK untuk melihat formulir anda");
            navigate("/profilefaskesadmin");
      }

      const redirectform = () =>{
        alert("Anda sudah melakukan submit formulir sebelumnya, silakan tekan OK untuk melihat formulir anda");
            navigate("/customformadmin");
      }*/


     // const [profilefaskes, setProfileFaskes] = useState([]);
      //const [dynamics, setDynamics] = useState([]);

  /*useEffect(()=>{
    getProfileFaskes();
  },[]);

  useEffect(()=>{
    getDynamics();
  },[]);

  const getProfileFaskes = async()=>{
    const response = await axios.get("http://localhost:5001/profilefaskes");
    setProfileFaskes(response.data);
  };

  const getDynamics = async()=>{
    const response = await axios.get("http://localhost:5001/dynamics");
    setDynamics(response.data);
  }*/
        return(
         <nav className="navbar navbar-expand-lg navbar-light" style={{position:"fixed", width:"100%"}}>
          <div className="container-fluid">
            <NavLink href="/admin" className="navbar-brand">
              <img src={logo} alt="" width={100} height={50}/>
            </NavLink>
            <Container fluid>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className='me-auto' navbarScroll>
                <NavLink style={{color:'gray'}} href="/editprofilefaskes">
                  <div style={{fontSize: "20px", marginTop:"10px"}}>
                      Welcome,  <strong>{user && user.firstname + " " + user.lastname}</strong>
                  </div>
                </NavLink>
                </Nav>
                  <Button onClick={logout} style={{marginRight:'20px', paddingRight:'30px', paddingLeft:'30px'}} variant="danger">LogOut</Button>
              </Navbar.Collapse>
            </Container>
          </div>
          </nav>
          
        )
    }
  
    export default NavigationBar

    /*<NavLink style={{color:'gray'}} href="/admin">HOME</NavLink>
                  {
                    profilefaskes.length === 0 ?
                    <NavLink style={{color:'gray'}} href="/inputprofilefaskes">PROFILE</NavLink>
                    :
                    <NavLink style={{color:'gray'}} onClick={redirect} >PROFILE</NavLink>
                  }
                  {
                    dynamics.length === 0 ?
                    <NavLink style={{color:'gray'}} href="/inputcustomform">CUSTOM DATA</NavLink>
                    :
                    <NavLink style={{color:'gray'}} onClick={redirectform} >CUSTOM DATA</NavLink>
                  }
                  
                  <NavLink style={{color:'gray'}} href="/datapasien">BOOK DATA</NavLink>
                  <NavDropdown className="NavFont" title="EDIT DATA" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/editprofilefaskes">Edit Profile Faskes</NavDropdown.Item>
                        <NavDropdown.Item href="/jadwaldokteradmin">Edit Jadwal Dokter</NavDropdown.Item>
                        <NavDropdown.Item href="/inputfasilitas">Edit Fasilitas</NavDropdown.Item>
                        <NavDropdown.Item href="/editcustomform">Edit Custom Data</NavDropdown.Item>
                  </NavDropdown>*/

import "../style/faskes.css";
//import Search from "./search";
import JadwalDokterAdmin from "./JadwalDokterAdmin";
import Layout from "./Layout"
import { getMe } from "../features/authSlice";
import React, {useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const ListJadwalDokterAdmin = () => {

    const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isError } = useSelector((state) => state.auth);
    
        useEffect(() => {
            dispatch(getMe());
          }, [dispatch]);
        
          useEffect(() => {
            if (isError) {
              navigate("/");
            }
          }, [isError, navigate]);

  return (
    <Layout>
    <div style={{marginTop:"150px"}}>
    <h2 className="title" style={{fontSize:"24px", fontWeight:"bolder", marginLeft:"145px"}}>List Informasi dan Jadwal Dokter</h2>
    <div className="listContainer">
    <div className="listWrapper" style={{width:"850px", marginBottom:"150px", marginLeft:"50px"}}>
      <div className="listSearch">
            <JadwalDokterAdmin />
      </div>
      <div className="border shadow-lg rounded" style={{position:"fixed", padding:"40px 487px", bottom:"30px", background:"white", marginLeft:"-20px"}}>
        <Button className="button is-success text-white rounded" href="/tambahjadwaldokter" style={{position:"absolute", top:"20px", left:"425px"}}>ADD NEW DOCTOR</Button>
      </div>
    </div>
  </div>
   </div>
   </Layout>
  )
}

export default ListJadwalDokterAdmin;
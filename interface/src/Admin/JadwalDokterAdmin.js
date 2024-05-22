import React, { useState ,useEffect } from 'react';
import "../style/landing.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { Container } from 'react-bootstrap';
import { getMe } from "../features/authSlice";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';

const JadwalDokterAdmin = () => {
    const [jadwalDokter, setJadwalDokter] = useState("");

    useEffect(()=>{
        getJadwalDokter();
      }, []);

      const getJadwalDokter = async() =>{
        const response = await axios.get('http://localhost:5000/jadwaldokter');
        setJadwalDokter(response.data)
        console.log(response.data)
        
        }

       /* const deleteJadwalDokter = async (jadwalId) => {
            await axios.delete(`http://localhost:5001/jadwaldokter/${jadwalId}`);
            getJadwalDokter();
          };*/

          const showAlertDelete = (jadwalId) => {
            confirmAlert({
            title: 'Konfirmasi',
            message: 'Apakah anda yakin akan menghapus data ini ?',
            buttons: [
                {
                label: 'Ya',
                onClick: async() => {
                  await axios.delete(`http://localhost:5000/jadwaldokter/${jadwalId}`);
                  getJadwalDokter();
                  navigate("/listjadwaldokteradmin");
                }
                },
                {
                label: 'Tidak',
                onClick: () => {
                        navigate("/listjadwaldokteradmin");
                    
                }
                }
            ]
            });
        };
    
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
            <div>
              {jadwalDokter && jadwalDokter.map((jadwal) => (
                <div className="searchItem" key={jadwal.uuid} style={{marginBottom:"25px", marginTop:"25px"}}>
                  <figure className='image is-96x96'>
                  <img style={{height:"96px", width:"96px"}}
                    src = {jadwal.url}
                    alt = ""
                  />
                  </figure>
                  <div className="siDesc">
                      <h1 className="siTitle">{jadwal.namaDokter}</h1>      
                      <h1 className="sijenisTitle">{jadwal.poli}</h1>
                      <span className="siSubtitle">
                      {jadwal.noSIP}, {jadwal.noSTR}
                  </span>
              </div>
              <div className="siDetails" style={{marginTop:"70px", marginLeft:"450px"}}>
              <div className="field">
                <Link to={`/editjadwaldokter/${jadwal.uuid}`} style={{marginLeft:"-20px", marginRight:"10px"}} className="button is-small is-info">
                    Edit
                </Link>
                <button
                    onClick={()=> showAlertDelete(jadwal.uuid)}
                    className="button is-small is-danger">
                    Delete
                </button>
              </div>
              </div>
              </div>
              ))}
            </div>
        
          );
    


}

export default JadwalDokterAdmin

import React, { useState ,useEffect } from 'react';
import "../style/landing.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { getMe } from "../features/authSlice";
import axios from 'axios';
import Layout from './Layout';

const CobaTampilJadwalDokter = () => {

    const minggu = [
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
    ];


    const [jadwalpraktikdokter, setJadwalPraktikDokter] = useState(minggu);
    const [jadwalDokter, setJadwalDokter] = useState([]);

    const [fileSIP, setFileSIP] = useState("");
    const [previewSIP, setPreviewSIP] = useState("");

    const [fileSTR, setFileSTR] = useState("");
    const [previewSTR, setPreviewSTR] = useState("");
    const {id} = useParams();

    useEffect(()=>{
        const getJadwalDokterById= async() =>{
            try {
                const response = await axios.get(`http://localhost:5000/jadwaldokterbyid/${id}`);
                if (response.data.length === 0) {
                setJadwalPraktikDokter({ day:"", date:"OFF", check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "OFF", jamBerakhirPraktikPagi: "OFF", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "OFF", jamBerakhirPraktikSiang: "OFF", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "OFF", jamBerakhirPraktikMalam: "OFF"});
                return;
                }
                setJadwalDokter(response.data);
                console.log(response.data)
                const varr = JSON.parse(response.data.jadwalpraktikdokter);
                const varrdoc = JSON.parse(varr);
                setJadwalPraktikDokter(varrdoc);

                
            } catch (error) {
                
            }
            }
        getJadwalDokterById();
      }, [id]);

    
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
        
          const loadLinkSIP = (e) => {
            const pdfSIP = e.target.files[0];
            setFileSIP(pdfSIP);
            setPreviewSIP(URL.createObjectURL(pdfSIP));
          }
        
        const loadLinkSTR = (e) => {
            const pdfSTR = e.target.files[0];
            setFileSTR(pdfSTR);
            setPreviewSTR(URL.createObjectURL(pdfSTR));
          }

          return (
            <Layout>
            <div>
                <Container>
                    <div className="column is-centered">
                    <h2 style={{fontSize:"24px", fontWeight:"bolder", textAlign:"center"}}>Preview Informasi dan Jadwal Dokter</h2>
                    <Button href={`/cobaeditjadwaldokter/${id}`} style={{marginLeft:'565px',}}>Edit</Button>
                        <div className="column is-centered">
                            <form class="form">
                                <div className="column is-half">
                                <div className="field">
                                    <label className="label">Foto Profile Dokter</label>
                                    <div className="control" key={jadwalDokter}>
                                        <figure className='image is-96x96'>
                                            <img
                                            src = {jadwalDokter.url}
                                            alt = ""
                                            />
                                        </figure>
                                            </div>
                                        </div>
                                        <div  className="field">
                                        <label className="label">Nama Dokter</label>
                                            <td className='input'>{jadwalDokter.namaDokter}</td>
                                    </div>
                                    <div className="field">
                                                <label className="label">ID Dokter</label>
                                                <div className="control">
                                                    <td className='input'>{jadwalDokter.idDokter}</td>
                                                </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Sertifikasi SIP Dokter</label>
                                        <div className="control">
                                        {previewSIP && (
                                        <a href={previewSIP} target="_blank">
                                            Check Sertifikasi
                                        </a>
                                        )}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Sertifikasi STR Dokter</label>
                                        <div className="control">
                                        </div>
                                        {previewSTR && (
                                        <a href={previewSTR} target="_blank">
                                            Check Sertifikasi
                                        </a>
                                        )}
                                    </div>
                                    <div className="field">
                                                <label className="label">No SIP Dokter</label>
                                                <div className="control">
                                                    <td className='input'>{jadwalDokter.noSIP}</td>
                                                </div>
                                    </div>
                                    <div className="field">
                                                <label className="label">No STR Dokter</label>
                                                <div className="control">
                                                    <td className='input'>{jadwalDokter.noSTR}</td>
                                                </div>
                                    </div>
                                    <div className="field">
                                                <label className="label">Poli Dokter</label>
                                                <div className="control">
                                                    <td className='input'>{jadwalDokter.poli}</td>
                                                </div>
                                    </div>
                                    </div>
                                    <div className="field" style={{marginLeft:"10px"}}>
                                        <label className="label">Jadwal Dokter</label>
                                        <div className="control">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Tanggal</th>
                                                    <th>Hari Operasional</th>
                                                    <th>Open/Closed</th>
                                                    <th>Jam Operasional</th>
                                                    <th>Off/On</th>
                                                    <th>Jam Mulai Praktik</th>
                                                    <th>Jam Selesai Praktik</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                            {jadwalpraktikdokter.map((days) => (
                                                <tr>
                                               <td>{days.date ? days.date.toString() : "OFF"}</td>
                                                <td>{days.day}</td>
                                                <td>{days.check ? "OPEN" : "CLOSED"}</td>
                                                <td>
                                                    {days.shiftPagi}<br></br>
                                                    {days.shiftSiang}<br></br>
                                                    {days.shiftMalam}<br></br>
                                                </td>
                                                <td>
                                                    {days.checkshiftPagi ? "ON" : "OFF"}<br></br>
                                                    {days.checkshiftSiang ? "ON" : "OFF"}<br></br>
                                                    {days.checkshiftMalam ? "ON" : "OFF"}<br></br>
                                                </td>
                                                <td>
                                                    {days.jamMulaiPraktikPagi || ""}<br></br>
                                                    {days.jamMulaiPraktikSiang || ""}<br></br>
                                                    {days.jamMulaiPraktikMalam || ""}<br></br>
                                                </td>
                                                <td>
                                                    {days.jamBerakhirPraktikPagi || ""}<br></br>
                                                    {days.jamBerakhirPraktikSiang || ""}<br></br>
                                                    {days.jamBerakhirPraktikMalam || ""}<br></br>
                                                </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                          
                            </form>
                            <Button variant="primary" href="/listjadwaldokteradmin">Done</Button>
                        </div>
                        </div>
                    </Container>
                            
            </div>
            </Layout>
        )
}

export default CobaTampilJadwalDokter
import React, { useState, useEffect } from "react";
import "../style/landing.css";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import {format} from "date-fns";
import { id } from "date-fns/locale";
import Layout from "./Layout";


const InputJadwalDokter = () => {


    const navigate = useNavigate();
        const dispatch = useDispatch();
        const { isError } = useSelector((state) => state.auth);
    
        useEffect(() => {
            dispatch(getMe());
          }, [dispatch]);
        
          useEffect(() => {
            if (isError) {
              navigate("/loginAdmin");
            }
          }, [isError, navigate]);

    useEffect(() => {
        getFasilitas();
    }, []);

    const getFasilitas = async () => {
        const response = await axios.get("http://localhost:5000/fasilitas");
        setDataPoli(response.data);
    };

    const [namaDokter, setNamaDokter] = useState("");
    const [idDokter, setidDokter] = useState("");
    const [noSIP, setNoSIP] = useState("");
    const [noSTR, setNoSTR] = useState("");
    const [poli, setPoli] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");

    const [fileSIP, setFileSIP] = useState("");
    const [previewSIP, setPreviewSIP] = useState("");

    const [fileSTR, setFileSTR] = useState("");
    const [previewSTR, setPreviewSTR] = useState("");

    
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
    const [dataPoli, setDataPoli] = useState([]);

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
      }
    
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
    

    const saveJadwal = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileSIP", fileSIP);
        formData.append("fileSTR", fileSTR);
        formData.append("namaDokter", namaDokter);
        formData.append("idDokter", idDokter);
        formData.append("noSIP", noSIP);
        formData.append("noSTR", noSTR);
        formData.append("poli", poli);
        formData.append("jadwalpraktikdokter", JSON.stringify(jadwalpraktikdokter));
        try {
            await axios.post("http://localhost:5000/jadwaldokter", formData,
                { 
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(res=>{
                    alert('Informasi Jadwal Dokter Berhasil Disimpan!');
                });
            navigate("/listjadwaldokteradmin")
            console.log(formData)
        } catch (error) {
            if(error.response){
                console.log(error)
            }
        }
    }

    const handleInput = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].check = !newJadwal[index].check;
        setJadwalPraktikDokter(newJadwal)
    }

    const handleInputShift1 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkshiftPagi = !newJadwal[index].checkshiftPagi;
        setJadwalPraktikDokter(newJadwal)
    }

    const handleInputShift2 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkshiftSiang = !newJadwal[index].checkshiftSiang;
        setJadwalPraktikDokter(newJadwal)
    }

    const handleInputShift3 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkshiftMalam = !newJadwal[index].checkshiftMalam;
        setJadwalPraktikDokter(newJadwal)
    }

    const handleDateChange = (date, index) => {
        setJadwalPraktikDokter(date);
        const minggu = format(date, 'EEEE', {locale: id});
        const tanggal = format(date,'dd/MM/yyy');
        //console.log(`Selected day of week: ${minggu}`)
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].day = minggu;
        newJadwal[index].date = tanggal;
        setJadwalPraktikDokter(newJadwal);
      };

    return (
        <Layout>
        <div className="cfBG" style={{marginTop:"80px"}}>
            <Container>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <form onSubmit={saveJadwal} class="form">
                        <h2 className="title">Informasi dan Jadwal Dokter</h2>
                        <div className="field">
                                <label className="label">Foto Profile Dokter</label>
                                <div className="control">
                                    <label className="file-label">
                                    <input
                                        type="file" 
                                        className="file-input"
                                        onChange={loadImage} />
                                        <span className="file-cta">
                                            <span className="file-label">
                                                Browse...
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                {preview ? (
                                    <figure className="image is-128x128">
                                        <img src ={preview} alt="Preview"></img>
                                    </figure>
                                ): ( ""
                                )}

                            </div>
                        <div className="field">
                        <label className="label">Nama Dokter</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={namaDokter} 
                            onChange={(e)=> setNamaDokter(e.target.value)} 
                            placeholder='Nama Dokter'
                            />
                        </div>
                        </div>
                        <div className="field">
                            <label className="label">ID Dokter</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={idDokter} 
                                onChange={(e)=> setidDokter(e.target.value)} 
                                placeholder='ID Dokter'
                                />
                            </div>
                            </div>
                            <div className="field">
                                <label className="label">Upload Sertifikasi SIP Dokter</label>
                                <div className="control">
                                    <label className="file-label">
                                    <input
                                        type="file" 
                                        className="file-input"
                                        onChange={loadLinkSIP} />
                                        <span className="file-cta">
                                            <span className="file-label">
                                                Browse...
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                {previewSIP && (
                                <a href={previewSIP} target="_blank">
                                    Klik link ini untuk memeriksa kembali dokumen yang dipilih
                                </a>
                                )}
                            </div>
                            <div className="field">
                                <label className="label">Upload Sertifikasi STR Dokter</label>
                                <div className="control">
                                    <label className="file-label">
                                    <input
                                        type="file" 
                                        className="file-input"
                                        onChange={loadLinkSTR} />
                                        <span className="file-cta">
                                            <span className="file-label">
                                                Browse...
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                {previewSTR && (
                                <a href={previewSTR} target="_blank">
                                    Klik link ini untuk memeriksa kembali dokumen yang dipilih
                                </a>
                                )}
                            </div>
                            <div className="field">
                            <label className="label">No SIP</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={noSIP} 
                                onChange={(e)=> setNoSIP(e.target.value)} 
                                placeholder='Masukkan No SIP Dokter'
                                />
                            </div>
                            </div>
                            <div className="field">
                            <label className="label">No STR(Registrasi)</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={noSTR} 
                                onChange={(e)=> setNoSTR(e.target.value)} 
                                placeholder='Masukkan No STR/ Registrasi Dokter'
                                />
                            </div>
                            </div>
                            <div className="field">
                                <label className="label">Poli</label>
                                <select key={poli.id}
                                        value={poli}
                                        onChange={e =>setPoli(e.target.value)}>
                                    <option value="">Pilih Poli Dokter</option>
                                    {dataPoli.map(poli => (
                                        <option key={poli.namafasilitas} value={poli.namafasilitas}>{poli.namafasilitas}</option>
                                    ))}
                                </select>
                            </div>
                <div className="field">
                            <div className="control">
                                <h1 style={{ fontSize: "1,5rem" }}>Isi Jadwal Shift Dokter :</h1>
                                <table className="table" style={{marginTop:"50px"}}>
                                    <thead>
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Hari Operasional</th>
                                            <th>Off/On</th>
                                            <th>Jam Operasional</th>
                                            <th>Off/On</th>
                                            <th>Jam Mulai Praktik</th>
                                            <th>Jam Selesai Praktik</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jadwalpraktikdokter.map((day, index) => (
                                            <tr key={day.jadwalpraktik}>
                                            <td>
                                                <DatePicker value={day.date}
                                                onChange={date => handleDateChange(date, index)}
                                                placeholderText="Pilih Tanggal"
                                                dateFormat="dd/MM/yyy"
                                                locale={id} />
                                                
                                            </td>
                                            <td>
                                                <label>{day.day}</label>
                                                </td>
                                            <td>
                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.check} 
                                                onChange={() => handleInput(index)} />
                                                <span className="slider round"></span>
                                                </label>
                                            </td>
                                            <td>
                                            {day.check && (
                                                <div>
                                                <label>{day.shiftPagi}</label> <br></br>
                                                <label>{day.shiftSiang}</label> <br></br>
                                                <label>{day.shiftMalam}</label>
                                                </div>
                                            )} 
                                            </td>
                                            {day.check &&(
                                                <td>
                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkshiftPagi} 
                                                onChange={() => handleInputShift1(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkshiftSiang} 
                                                onChange={() => handleInputShift2(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkshiftMalam} 
                                                onChange={() => handleInputShift3(index)} />
                                                <span className="slider round"></span>
                                                </label> 
                                                </td>
                                            )}
                                            <td>
                                                {day.checkshiftPagi && (
                                                <input type="time" value={day.jamMulaiPraktikPagi} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamMulaiPraktikPagi = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkshiftSiang && (
                                                <input type="time" value={day.jamMulaiPraktikSiang} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamMulaiPraktikSiang = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkshiftMalam && (
                                                <input type="time" value={day.jamMulaiPraktikMalam} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamMulaiPraktikMalam = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                            </td>
                                             <td>
                                                {day.checkshiftPagi && (
                                                <input type="time" value={day.jamBerakhirPraktikPagi} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamBerakhirPraktikPagi = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkshiftSiang && (
                                                <input type="time" value={day.jamBerakhirPraktikSiang} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamBerakhirPraktikSiang = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkshiftMalam && (
                                                <input type="time" value={day.jamBerakhirPraktikMalam} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamBerakhirPraktikMalam = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                            </td>

                                            </tr>
                                            
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="field">
                        <button type="submit" className='button is-success'>Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
        </Layout>
        
    )
}

export default InputJadwalDokter

/* <td>
                                                {day.check && (
                                                <input type="time" value={day.jamMulaiPraktik} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamMulaiPraktik = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                            </td>
                                            
                                             <td>
                                                {day.check && (
                                                <input type="time" value={day.jamBerakhirPraktik} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamBerakhirPraktik = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                            </td>*/

                                            /*<label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkshift2} 
                                                onChange={() => handleInputShift2(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkshift3} 
                                                onChange={() => handleInputShift3(index)} />
                                                <span className="slider round"></span>
                                                </label> */
                                                /*<p>Date: {date}</p>*/
                                                /* <div>
                        <DatePicker selected={selectedDate} onChange={handleDateChange} />
                        <p>Day: {dayName}</p>
                        </div>*/
                        /*<DatePicker selected={day.date}
                                                onChange={date => handleDateChange(date, index)} />*/
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
import LangkahTiga from "../assets/images/LangkahTiga.jpg"
import {format} from "date-fns";
import { id } from "date-fns/locale";
import { confirmAlert } from "react-confirm-alert";


const CobaInputJadwalAwal = () => {


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

      const showAlertSubmit = () => {
        confirmAlert({
        title: 'Konfirmasi',
        message: 'Apakah anda ingin mengisi formulir jadwal dokter lagi ?',
        buttons: [
            {
            label: 'Ya',
            onClick: async() => {
                const formData = new FormData();
                formData.append("file", file);
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
                    navigate("/inputjadwaldokter");
                    window.location.reload();
                } catch (error) {
                    if(error.response){
                        console.log(error)
                    }
                }
            }
            },
            {
            label: 'Tidak',
            onClick: async() => {
                const formData = new FormData();
                formData.append("file", file);
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
                    navigate("/customform");
                } catch (error) {
                    if(error.response){
                        console.log(error)
                    }
                }
            }
            }
        ]
        });
    };   
    
    const showAlertCancel = () => {
        confirmAlert({
        title: 'Konfirmasi',
        message: 'Semua perubahan belum disimpan, apakah anda yakin ingin membatalkannya?',
        buttons: [
            {
            label: 'Ya',
            onClick: async() => {
                navigate("/customform")
            }
            },
            {
            label: 'Tidak',
            onClick: async() => {
                navigate("/inputjadwaldokter")
            }
            }
        ]
        });
    }; 

    return (
        <div className="cfBG">
            <Container>
                <div className="column is-centered">
                <img
                style={{position:"relative", left:"330px", width:"450px"}}
                src={LangkahTiga}
            />
                <h2 style={{fontSize:"24px", fontWeight:"bolder", textAlign:"center", marginTop:"20px"}}>Input Informasi dan Jadwal Dokter</h2>
                    <div className="column">
                        <div className="column is-half">
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
                            </div>
                            
                            <div className="field">
                            <div className="control">
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
                                                {(day.check && day.checkshiftPagi) && (
                                                <input type="time" value={day.jamMulaiPraktikPagi} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamMulaiPraktikPagi = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {(day.check && day.checkshiftSiang) && (
                                                <input type="time" value={day.jamMulaiPraktikSiang} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamMulaiPraktikSiang = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {(day.check && day.checkshiftMalam) && (
                                                <input type="time" value={day.jamMulaiPraktikMalam} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamMulaiPraktikMalam = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                            </td>
                                             <td>
                                                {(day.check && day.checkshiftPagi) && (
                                                <input type="time" value={day.jamBerakhirPraktikPagi} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamBerakhirPraktikPagi = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {(day.check && day.checkshiftSiang) && (
                                                <input type="time" value={day.jamBerakhirPraktikSiang} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamBerakhirPraktikSiang = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {(day.check && day.checkshiftMalam) && (
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
                        <button type="submit" onClick={showAlertSubmit} className='button is-success'>Submit</button>
                        </div>
                        <div className="field" style={{marginTop:"-52px", marginLeft:"90px"}}>
                        <button type="submit" onClick={showAlertCancel} className='button is-danger'>Cancel</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CobaInputJadwalAwal
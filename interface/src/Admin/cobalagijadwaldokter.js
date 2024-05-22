import React, { useState, useEffect } from "react";
import "../style/landing.css";
import NavigationBar from "./NavigationBar";
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
import Moment from "react-moment";


const CobaLagiJadwalDokter = () => {


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
    const [poli, setPoli] = useState("");

    
    const minggu = [
        { day:"", date:new Date(), check: false, 
        shiftPagi:"Pagi", checkshiftPagi: false, jamPraktikPagi1: "07:00", checkPagi1: false, jamPraktikPagi2: "08:00", checkPagi2: false, jamPraktikPagi3: "09:00", checkPagi3: false, jamPraktikPagi4: "10:00", checkPagi4: false, jamPraktikPagi5: "11:00", checkPagi5: false, 
        shiftSiang:"Siang", checkshiftSiang: false,  jamPraktikSiang1: "12:00", checkSiang1: false, jamPraktikSiang2: "13:00", checkSiang2: false, jamPraktikSiang3: "14:00", checkSiang3: false, jamPraktikSiang4: "15:00", checkSiang4: false, jamPraktikSiang5: "16:00", checkSiang5: false, 
        shiftMalam:"Malam", checkshiftMalam: false, jamPraktikMalam1: "17:00", checkMalam1: false, jamPraktikMalam2: "18:00", checkMalam2: false, jamPraktikMalam3: "19:00", checkMalam3: false, jamPraktikMalam4: "20:00", checkMalam4: false, jamPraktikMalam5: "21:00", checkMalam5: false},
        { day:"", date:new Date(), check: false, 
        shiftPagi:"Pagi", checkshiftPagi: false, jamPraktikPagi1: "07:00", checkPagi1: false, jamPraktikPagi2: "08:00", checkPagi2: false, jamPraktikPagi3: "09:00", checkPagi3: false, jamPraktikPagi4: "10:00", checkPagi4: false, jamPraktikPagi5: "11:00", checkPagi5: false, 
        shiftSiang:"Siang", checkshiftSiang: false,  jamPraktikSiang1: "12:00", checkSiang1: false, jamPraktikSiang2: "13:00", checkSiang2: false, jamPraktikSiang3: "14:00", checkSiang3: false, jamPraktikSiang4: "15:00", checkSiang4: false, jamPraktikSiang5: "16:00", checkSiang5: false, 
        shiftMalam:"Malam", checkshiftMalam: false, jamPraktikMalam1: "17:00", checkMalam1: false, jamPraktikMalam2: "18:00", checkMalam2: false, jamPraktikMalam3: "19:00", checkMalam3: false, jamPraktikMalam4: "20:00", checkMalam4: false, jamPraktikMalam5: "21:00", checkMalam5: false},
        { day:"", date:new Date(), check: false, 
        shiftPagi:"Pagi", checkshiftPagi: false, jamPraktikPagi1: "07:00", checkPagi1: false, jamPraktikPagi2: "08:00", checkPagi2: false, jamPraktikPagi3: "09:00", checkPagi3: false, jamPraktikPagi4: "10:00", checkPagi4: false, jamPraktikPagi5: "11:00", checkPagi5: false, 
        shiftSiang:"Siang", checkshiftSiang: false,  jamPraktikSiang1: "12:00", checkSiang1: false, jamPraktikSiang2: "13:00", checkSiang2: false, jamPraktikSiang3: "14:00", checkSiang3: false, jamPraktikSiang4: "15:00", checkSiang4: false, jamPraktikSiang5: "16:00", checkSiang5: false, 
        shiftMalam:"Malam", checkshiftMalam: false, jamPraktikMalam1: "17:00", checkMalam1: false, jamPraktikMalam2: "18:00", checkMalam2: false, jamPraktikMalam3: "19:00", checkMalam3: false, jamPraktikMalam4: "20:00", checkMalam4: false, jamPraktikMalam5: "21:00", checkMalam5: false},
        { day:"", date:new Date(), check: false, 
        shiftPagi:"Pagi", checkshiftPagi: false, jamPraktikPagi1: "07:00", checkPagi1: false, jamPraktikPagi2: "08:00", checkPagi2: false, jamPraktikPagi3: "09:00", checkPagi3: false, jamPraktikPagi4: "10:00", checkPagi4: false, jamPraktikPagi5: "11:00", checkPagi5: false, 
        shiftSiang:"Siang", checkshiftSiang: false,  jamPraktikSiang1: "12:00", checkSiang1: false, jamPraktikSiang2: "13:00", checkSiang2: false, jamPraktikSiang3: "14:00", checkSiang3: false, jamPraktikSiang4: "15:00", checkSiang4: false, jamPraktikSiang5: "16:00", checkSiang5: false, 
        shiftMalam:"Malam", checkshiftMalam: false, jamPraktikMalam1: "17:00", checkMalam1: false, jamPraktikMalam2: "18:00", checkMalam2: false, jamPraktikMalam3: "19:00", checkMalam3: false, jamPraktikMalam4: "20:00", checkMalam4: false, jamPraktikMalam5: "21:00", checkMalam5: false},
        { day:"", date:new Date(), check: false, 
        shiftPagi:"Pagi", checkshiftPagi: false, jamPraktikPagi1: "07:00", checkPagi1: false, jamPraktikPagi2: "08:00", checkPagi2: false, jamPraktikPagi3: "09:00", checkPagi3: false, jamPraktikPagi4: "10:00", checkPagi4: false, jamPraktikPagi5: "11:00", checkPagi5: false, 
        shiftSiang:"Siang", checkshiftSiang: false,  jamPraktikSiang1: "12:00", checkSiang1: false, jamPraktikSiang2: "13:00", checkSiang2: false, jamPraktikSiang3: "14:00", checkSiang3: false, jamPraktikSiang4: "15:00", checkSiang4: false, jamPraktikSiang5: "16:00", checkSiang5: false, 
        shiftMalam:"Malam", checkshiftMalam: false, jamPraktikMalam1: "17:00", checkMalam1: false, jamPraktikMalam2: "18:00", checkMalam2: false, jamPraktikMalam3: "19:00", checkMalam3: false, jamPraktikMalam4: "20:00", checkMalam4: false, jamPraktikMalam5: "21:00", checkMalam5: false},
        { day:"", date:new Date(), check: false, 
        shiftPagi:"Pagi", checkshiftPagi: false, jamPraktikPagi1: "07:00", checkPagi1: false, jamPraktikPagi2: "08:00", checkPagi2: false, jamPraktikPagi3: "09:00", checkPagi3: false, jamPraktikPagi4: "10:00", checkPagi4: false, jamPraktikPagi5: "11:00", checkPagi5: false, 
        shiftSiang:"Siang", checkshiftSiang: false,  jamPraktikSiang1: "12:00", checkSiang1: false, jamPraktikSiang2: "13:00", checkSiang2: false, jamPraktikSiang3: "14:00", checkSiang3: false, jamPraktikSiang4: "15:00", checkSiang4: false, jamPraktikSiang5: "16:00", checkSiang5: false, 
        shiftMalam:"Malam", checkshiftMalam: false, jamPraktikMalam1: "17:00", checkMalam1: false, jamPraktikMalam2: "18:00", checkMalam2: false, jamPraktikMalam3: "19:00", checkMalam3: false, jamPraktikMalam4: "20:00", checkMalam4: false, jamPraktikMalam5: "21:00", checkMalam5: false},
        { day:"", date:new Date(), check: false, 
        shiftPagi:"Pagi", checkshiftPagi: false, jamPraktikPagi1: "07:00", checkPagi1: false, jamPraktikPagi2: "08:00", checkPagi2: false, jamPraktikPagi3: "09:00", checkPagi3: false, jamPraktikPagi4: "10:00", checkPagi4: false, jamPraktikPagi5: "11:00", checkPagi5: false, 
        shiftSiang:"Siang", checkshiftSiang: false,  jamPraktikSiang1: "12:00", checkSiang1: false, jamPraktikSiang2: "13:00", checkSiang2: false, jamPraktikSiang3: "14:00", checkSiang3: false, jamPraktikSiang4: "15:00", checkSiang4: false, jamPraktikSiang5: "16:00", checkSiang5: false, 
        shiftMalam:"Malam", checkshiftMalam: false, jamPraktikMalam1: "17:00", checkMalam1: false, jamPraktikMalam2: "18:00", checkMalam2: false, jamPraktikMalam3: "19:00", checkMalam3: false, jamPraktikMalam4: "20:00", checkMalam4: false, jamPraktikMalam5: "21:00", checkMalam5: false},
    ];

    const [jadwalpraktikdokter, setJadwalPraktikDokter] = useState(minggu);
    const [dataPoli, setDataPoli] = useState([]);

    const saveJadwal = async (e) => {
        e.preventDefault();
        //setJadwalDokter((jadwal) => [...jadwal, jadwalDokter]);
        //const schedule = {jadwal: JSON.stringify(jadwal)};
        try {
            await axios.post('http://localhost:5000/jadwaldokter',{
                namaDokter,
                idDokter,
                poli,
                jadwalpraktikdokter : jadwalpraktikdokter
            });
            navigate("/cobatampiljadwaldokter")
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
    
    ///SHIFT PAGI
    const handlePagi1 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkPagi1 = !newJadwal[index].checkPagi1;
        setJadwalPraktikDokter(newJadwal)
    }
    const handlePagi2 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkPagi2 = !newJadwal[index].checkPagi2;
        setJadwalPraktikDokter(newJadwal)
    }
    const handlePagi3 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkPagi3 = !newJadwal[index].checkPagi3;
        setJadwalPraktikDokter(newJadwal)
    }
    const handlePagi4 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkPagi4 = !newJadwal[index].checkPagi4;
        setJadwalPraktikDokter(newJadwal)
    }
    const handlePagi5 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkPagi5 = !newJadwal[index].checkPagi5;
        setJadwalPraktikDokter(newJadwal)
    }

    ///SHIFT SIANG
    const handleSiang1 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkSiang1 = !newJadwal[index].checkSiang1;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleSiang2 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkSiang2 = !newJadwal[index].checkSiang2;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleSiang3 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkSiang3 = !newJadwal[index].checkSiang3;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleSiang4 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkSiang4 = !newJadwal[index].checkSiang4;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleSiang5 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkSiang5 = !newJadwal[index].checkSiang5;
        setJadwalPraktikDokter(newJadwal)
    }

    ///SHIFT MALAM
    const handleMalam1 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkMalam1 = !newJadwal[index].checkMalam1;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleMalam2 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkMalam2 = !newJadwal[index].checkMalam2;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleMalam3 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkMalam3 = !newJadwal[index].checkMalam3;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleMalam4 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkMalam4 = !newJadwal[index].checkMalam4;
        setJadwalPraktikDokter(newJadwal)
    }
    const handleMalam5 = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].checkMalam5 = !newJadwal[index].checkMalam5;
        setJadwalPraktikDokter(newJadwal)
    }

    const handleDateChange = (date, index) => {
        setJadwalPraktikDokter(date);
        const minggu = format(date, 'EEEE', {locale: id});
        const tanggal = format(date,'dd/MM/yyy');
        console.log(`Selected day of week: ${minggu}`)
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].day = minggu;
        newJadwal[index].date = tanggal;
        setJadwalPraktikDokter(newJadwal);
      };

    return (
        <div className="cfBG">
            <NavigationBar/>
            <Container>
                <div className="column is-centered">
                    <div className="column is-half">
                        <form onSubmit={saveJadwal} class="form">
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
                                <table className="table" style={{marginTop:"50px"}}>
                                    <thead>
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Hari Operasional</th>
                                            <th>Off/On</th>
                                            <th>Jam Operasional</th>
                                            <th>Off/On</th>
                                            <th>Check</th>
                                            <th>Jam Praktik 1</th>
                                            <th>Jam Praktik 2</th>
                                            <th>Jam Praktik 3</th>
                                            <th>Jam Praktik 4</th>
                                            <th>Jam Praktik 5</th>
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
                                            {day.checkshiftPagi &&(
                                                <td>
                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkPagi1} 
                                                onChange={() => handlePagi1(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkPagi2} 
                                                onChange={() => handlePagi2(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkPagi3} 
                                                onChange={() => handlePagi3(index)} />
                                                <span className="slider round"></span>
                                                </label> 

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkPagi4} 
                                                onChange={() => handlePagi4(index)} />
                                                <span className="slider round"></span>
                                                </label> 

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkPagi5} 
                                                onChange={() => handlePagi5(index)} />
                                                <span className="slider round"></span>
                                                </label> 
                                                </td>
                                            )}
                                            {day.checkshiftSiang &&(
                                                <td>
                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkSiang1} 
                                                onChange={() => handleSiang1(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkSiang2} 
                                                onChange={() => handleSiang2(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkSiang3} 
                                                onChange={() => handleSiang3(index)} />
                                                <span className="slider round"></span>
                                                </label> 

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkSiang4} 
                                                onChange={() => handleSiang4(index)} />
                                                <span className="slider round"></span>
                                                </label> 

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkSiang5} 
                                                onChange={() => handleSiang5(index)} />
                                                <span className="slider round"></span>
                                                </label> 
                                                </td>
                                            )}
                                            {day.checkshiftMalam &&(
                                                <td>
                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkMalam1} 
                                                onChange={() => handleMalam1(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkMalam2} 
                                                onChange={() => handleMalam2(index)} />
                                                <span className="slider round"></span>
                                                </label>

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkMalam3} 
                                                onChange={() => handleMalam3(index)} />
                                                <span className="slider round"></span>
                                                </label> 

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkMalam4} 
                                                onChange={() => handleMalam4(index)} />
                                                <span className="slider round"></span>
                                                </label> 

                                                <label class="form-check form-switch">
                                                <input class="form-check-input" 
                                                type="checkbox" 
                                                role="switch" 
                                                id="flexSwitchCheckDefault" 
                                                checked={day.checkMalam5} 
                                                onChange={() => handleMalam5(index)} />
                                                <span className="slider round"></span>
                                                </label> 
                                                </td>
                                            )}
                                            <td>
                                                {day.checkPagi1 && (
                                                <input type="time" value={day.jamPraktikPagi1} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikPagi1 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkPagi2 && (
                                                <input type="time" value={day.jamPraktikPagi2} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikPagi2 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkPagi3 && (
                                                <input type="time" value={day.jamPraktikPagi3} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikPagi3 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkPagi4 && (
                                                <input type="time" value={day.jamPraktikPagi4} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikPagi4 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkPagi5 && (
                                                <input type="time" value={day.jamPraktikPagi5} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikPagi5 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkSiang1 && (
                                                <input type="time" value={day.jamPraktikSiang1} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikSiang1 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkSiang2 && (
                                                <input type="time" value={day.jamPraktikSiang2} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikSiang2 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkSiang3 && (
                                                <input type="time" value={day.jamPraktikSiang3} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikSiang3 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkSiang4 && (
                                                <input type="time" value={day.jamPraktikSiang4} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikSiang4 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkSiang5 && (
                                                <input type="time" value={day.jamPraktikSiang5} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikSiang5 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkMalam1 && (
                                                <input type="time" value={day.jamPraktikMalam1} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikMalam1 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkMalam2 && (
                                                <input type="time" value={day.jamPraktikMalam2} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikMalam2 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkMalam3 && (
                                                <input type="time" value={day.jamPraktikMalam3} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikMalam3 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkMalam4 && (
                                                <input type="time" value={day.jamPraktikMalam4} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikMalam4 = e.target.value;
                                                    setJadwalPraktikDokter(newJadwal);
                                                }} />
                                                )}
                                                <br></br>
                                                {day.checkMalam5 && (
                                                <input type="time" value={day.jamPraktikMalam5} onChange={(e) => {
                                                    const newJadwal = [...jadwalpraktikdokter];
                                                    newJadwal[index].jamPraktikMalam5 = e.target.value;
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
        
    )
}

export default CobaLagiJadwalDokter

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
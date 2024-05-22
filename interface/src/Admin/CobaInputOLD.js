import React, { useState, useEffect } from "react";
import "../style/landing.css";
import NavigationBar from "./NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

const CobaInputOLD = () => {

    const [namaDokter, setNamaDokter] = useState("");
    const [idDokter, setidDokter] = useState("");

    
    const minggu = [
        { jadwalpraktik: "Senin", check: false, jamMulaiPraktik: "", jamBerakhirPraktik: ""},
        { jadwalpraktik: "Selasa", check: false, jamMulaiPraktik: "", jamBerakhirPraktik: ""},
        { jadwalpraktik: "Rabu", check: false, jamMulaiPraktik: "", jamBerakhirPraktik: ""},
        { jadwalpraktik: "Kamis", check: false, jamMulaiPraktik: "", jamBerakhirPraktik: ""},
        { jadwalpraktik: "Jumat", check: false, jamMulaiPraktik: "", jamBerakhirPraktik: ""},
        { jadwalpraktik: "Sabtu", check: false,jamMulaiPraktik: "", jamBerakhirPraktik: ""},
        { jadwalpraktik: "Minggu", check: false, jamMulaiPraktik: "", jamBerakhirPraktik: ""},
    ];

    const [jadwalpraktikdokter, setJadwalPraktikDokter] = useState(minggu);

    /*useEffect(()=>{
        getJadwalDokter();
      },[]);

      const getJadwalDokter = async()=>{
        const response = await axios.get("http://localhost:5000/jadwaldokter");
        setJadwal(response.data);
    };*/

    const saveJadwal = async (e) => {
        e.preventDefault();
        //setJadwalDokter((jadwal) => [...jadwal, jadwalDokter]);
        //const schedule = {jadwal: JSON.stringify(jadwal)};
        try {
            await axios.post('http://localhost:5000/jadwaldokter',{
                namaDokter,
                idDokter,
                jadwalpraktikdokter : jadwalpraktikdokter
            });
            navigate("/jadwaldokter")
        } catch (error) {
            if(error.response){
                console.log(error)
            }
        }
    }

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

    const handleInput = (index) => {
        const newJadwal = [...jadwalpraktikdokter];
        newJadwal[index].check = !newJadwal[index].check;
        setJadwalPraktikDokter(newJadwal)
    }
      

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
                            <div className="control">
                                <table className="table" style={{marginTop:"50px"}}>
                                    <thead>
                                        <tr>
                                            <th>Hari Operasional</th>
                                            <th>On/Off</th>
                                            <th>Jam Mulai Praktik</th>
                                            <th>Jam Selesai Praktik</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jadwalpraktikdokter.map((day, index) => (
                                            <tr key={day.jadwalpraktik}>
                                            <td>
                                                <label>{day.jadwalpraktik}</label>
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

export default CobaInputOLD
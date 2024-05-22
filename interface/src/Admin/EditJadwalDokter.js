import React, { useState, useEffect } from "react";
import "../style/landing.css";
import NavigationBar from "./NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditJadwalDokter = () => {

    const [namaDokter, setNamaDokter] = useState("");
    const [idDokter, setidDokter] = useState("");
    const {id} = useParams();

    
    const [jadwal, setJadwal] = useState([
        { jadwalpraktikSenin: "Senin", present: true, jamMulaiPraktikSenin: "08.00", jamBerakhirPraktikSenin: "13.00"},
        { jadwalpraktikSelasa: "Selasa", present: false, jamMulaiPraktikSelasa: "08.00", jamBerakhirPraktikSelasa: "13.00"},
        { jadwalpraktikRabu: "Rabu", present: false, jamMulaiPraktikRabu: "08.00", jamBerakhirPraktikRabu: "13.00"},
        { jadwalpraktikKamis: "Kamis", present: false, jamMulaiPraktikKamis: "08.00", jamBerakhirPraktikKamis: "13.00"},
        { jadwalpraktikJumat: "Jumat", present: false, jamMulaiPraktikJumat: "08.00", jamBerakhirPraktikJumat: "13.00"},
        { jadwalpraktikSabtu: "Sabtu", present: false, jamMulaiPraktikSabtu: "08.00", jamBerakhirPraktikSabtu: "13.00"},
        { jadwalpraktikMinggu: "Minggu", present: false, jamMulaiPraktikMinggu: "08.00", jamBerakhirPraktikMinggu: "13.00"},
    ]);

    
    const [newJadwalSenin, setNewJadwalSenin] = useState({
        jadwalpraktikSenin: "Senin",
        present: true,
        jamMulaiPraktikSenin: "",
        jamBerakhirPraktikSenin: "",
    })

    const [newJadwalSelasa, setNewJadwalSelasa] = useState({
        jadwalpraktikSelasa: "Selasa",
        present: false,
        jamMulaiPraktikSelasa: "",
        jamBerakhirPraktikSelasa: "",
    })

    const [newJadwalRabu, setNewJadwalRabu] = useState({
        jadwalpraktikRabu: "Rabu",
        present: false,
        jamMulaiPraktikRabu: "",
        jamBerakhirPraktikRabu: "",
    })

    const [newJadwalKamis, setNewJadwalKamis] = useState({
        jadwalpraktikKamis: "Kamis",
        present: false,
        jamMulaiPraktikKamis: "",
        jamBerakhirPraktikKamis: "",
    })

    const [newJadwalJumat, setNewJadwalJumat] = useState({
        jadwalpraktikJumat: "Jumat",
        present: false,
        jamMulaiPraktikJumat: "",
        jamBerakhirPraktikJumat: "",
    })

    const [newJadwalSabtu, setNewJadwalSabtu] = useState({
        jadwalpraktikSabtu: "Sabtu",
        present: false,
        jamMulaiPraktikSabtu: "",
        jamBerakhirPraktikSabtu: "",
    })

    const [newJadwalMinggu, setNewJadwalMinggu] = useState({
        jadwalpraktikMinggu: "Minggu",
        present: false,
        jamMulaiPraktikMinggu: "",
        jamBerakhirPraktikMinggu: "",
    })

    const [msg, setMsg] = useState("");
    const [checkData1, setCheckData1] = useState(false);
    const [checkData2, setCheckData2] = useState(false);
    const [checkData3, setCheckData3] = useState(false);
    const [checkData4, setCheckData4] = useState(false);
    const [checkData5, setCheckData5] = useState(false);
    const [checkData6, setCheckData6] = useState(false);
    const [checkData7, setCheckData7] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
      }, [dispatch]);
    
      useEffect(() => {
        if (isError) {
          navigate("/");
        }
      }, [isError, navigate]);

      useEffect(() =>{
        const getJadwalDokterById = async() => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/jadwaldokter/${id}`
                );   
                setNamaDokter(response.data.namaDokter);
                setidDokter(response.data.idDokter);
                const hariSenin = JSON.parse(response.data.jadwalpraktikSenin);
                setNewJadwalSenin(hariSenin);
                if (hariSenin.length > 0) setCheckData1(hariSenin.checkData1 || false);
                const hariSelasa = JSON.parse(response.data.jadwalpraktikSelasa);
                setNewJadwalSelasa(hariSelasa);
                if (hariSelasa.length > 0) setCheckData2(true);
                const hariRabu = JSON.parse(response.data.jadwalpraktikRabu);
                setNewJadwalRabu(hariRabu);
                if (hariRabu.length > 0) setCheckData3(true);
                const hariKamis = JSON.parse(response.data.jadwalpraktikKamis);
                setNewJadwalKamis(hariKamis);
                if (hariKamis.length > 0) setCheckData4(true);
                const hariJumat = JSON.parse(response.data.jadwalpraktikJumat);
                setNewJadwalJumat(hariJumat);
                if (hariJumat.length > 0) setCheckData5(true);
                const hariSabtu = JSON.parse(response.data.jadwalpraktikSabtu);
                setNewJadwalSabtu(hariSabtu);
                if (hariSabtu.length > 0) setCheckData6(true);
                const hariMinggu = JSON.parse(response.data.jadwalpraktikMinggu);
                setNewJadwalMinggu(hariMinggu);
                if (hariMinggu.length > 0) setCheckData7(true);
            } catch (error) {
            }
        };
        getJadwalDokterById()
      }, [id])
    

    const updateJadwal = async (e) => {
        e.preventDefault();
        setJadwal((jadwal) => [...jadwal, newJadwalSenin]);
        setJadwal((jadwal) => [...jadwal, newJadwalSelasa]);
        setJadwal((jadwal) => [...jadwal, newJadwalRabu]);
        setJadwal((jadwal) => [...jadwal, newJadwalKamis]);
        setJadwal((jadwal) => [...jadwal, newJadwalJumat]);
        setJadwal((jadwal) => [...jadwal, newJadwalSabtu]);
        setJadwal((jadwal) => [...jadwal, newJadwalMinggu]);
        try {
            await axios.patch('http://localhost:5000/jadwaldokter',{
                namaDokter,
                idDokter,
                jadwalpraktikSenin: newJadwalSenin,
                jadwalpraktikSelasa: newJadwalSelasa,
                jadwalpraktikRabu: newJadwalRabu,
                jadwalpraktikKamis: newJadwalKamis,
                jadwalpraktikJumat: newJadwalJumat,
                jadwalpraktikSabtu: newJadwalSabtu,
                jadwalpraktikMinggu: newJadwalMinggu
            });
            navigate("/jadwaldokter")
        } catch (error) {
            if(error.response){
                console.log(error)
            }
        }
    }

    const handleInputSenin=(e, index)=>{
        const { name, value } = e.target;
        newJadwalSenin = [...jadwal];
        newJadwalSenin[index].present = !newJadwalSenin[index].present;
        setNewJadwalSenin((jadwal) => ({
            ...jadwal,
            [name] : value,
        }));
    };

    const handleInputSelasa=(e)=>{
        const { name, value } = e.target;
        setNewJadwalSelasa((jadwal) => ({
            ...jadwal,
            [name] : value,
        }));
    };

    const handleInputRabu=(e)=>{
        const { name, value } = e.target;
        setNewJadwalRabu((jadwal) => ({
            ...jadwal,
            [name] : value,
        }));
    };

    const handleInputKamis=(e)=>{
        const { name, value } = e.target;
        setNewJadwalKamis((jadwal) => ({
            ...jadwal,
            [name] : value,
        }));
    };

    const handleInputJumat=(e)=>{
        const { name, value } = e.target;
        setNewJadwalJumat((jadwal) => ({
            ...jadwal,
            [name] : value,
        }));
    };

    const handleInputSabtu=(e)=>{
        const { name, value } = e.target;
        setNewJadwalSabtu((jadwal) => ({
            ...jadwal,
            [name] : value,
        }));
    };

    const handleInputMinggu=(e)=>{
        const { name, value } = e.target;
        setNewJadwalMinggu((jadwal) => ({
            ...jadwal,
            [name] : value,
        }));
    };

    return (
        <div className="cfBG">
            <NavigationBar/>
        <div className="columns is-centered">
            <div className="column is-half">
                <form onSubmit={updateJadwal} class='form'>
                        <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <br />
                                <br />
                                <br />
                                <label className="label">Nama Dokter</label>
                                <div className="control" >
                                    <input 
                                    type="text" 
                                    className='input'
                                    value ={namaDokter} 
                                    onChange={(e)=> setNamaDokter(e.target.value)} 
                                    placeholder='Masukan Nama Dokter'
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
                                    placeholder='Masukan ID Dokter'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <table className="table" style={{marginTop:"50px"}}>
                                        <thead>
                                            <tr>
                                                <th>Hari Praktik</th>
                                                <th>Jam Mulai Praktik</th>
                                                <th>Jam Berakhir Praktik</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr> 
                                                <td>
                                                    <label htmlFor="jadwalpraktikSenin"></label>
                                                    <input 
                                                    type="checkbox" 
                                                    id="jadwalpraktikSenin"
                                                    name="jadwalpraktikSenin"
                                                    value ={newJadwalSenin.jadwalpraktikSenin}
                                                    checked={checkData1}
                                                    onChange={()=>handleInputSenin("Senin")}
                                                    onClick={()=>setCheckData1(!checkData1)}/> 
                                                    Senin
                                                    </td>
                                                {
                                                checkData1 === true?
                                                <td>
                                                    <label htmlFor="jamMulaiPraktikSenin"></label>
                                                    <input 
                                                    type="time" 
                                                    id="jamMulaiPraktikSenin"
                                                    name="jamMulaiPraktikSenin"
                                                    value ={newJadwalSenin.jamMulaiPraktikSenin}
                                                    onChange={handleInputSenin}/>
                                                    </td>
                                                :
                                                <td><input type="time" disabled/></td>
                                                }
                                                {
                                                    checkData1 === true?
                                                    <td>
                                                        <label htmlFor="jamBerakhirPraktikSenin"></label>
                                                        <input 
                                                        type="time" 
                                                        id="jamBerakhirPraktikSenin"
                                                        name="jamBerakhirPraktikSenin"
                                                        value ={newJadwalSenin.jamBerakhirPraktikSenin} 
                                                        onChange={handleInputSenin}/>
                                                        </td>
                                                    :
                                                    <td><input type="time" disabled/></td>
                                                    
                                                }
                                            </tr>
                                            
                                            <tr>
                                                <td>
                                                    <label htmlFor="jadwalpraktikSelasa"></label>
                                                    <input 
                                                    type="checkbox" 
                                                    id="jadwalpraktikSelasa"
                                                    name="jadwalpraktikSelasa"
                                                    value ={newJadwalSelasa.jadwalpraktikSelasa}
                                                    onChange={()=>handleInputSelasa("Selasa")} 
                                                    onClick={()=>setCheckData2(!checkData2)}/>
                                                    Selasa
                                                    </td>
                                                {
                                                checkData2 === true?
                                                <td>
                                                    <label htmlFor="jamMulaiPraktikSelasa"></label>
                                                    <input 
                                                    type="time" 
                                                    id="jamMulaiPraktikSelasa"
                                                    name="jamMulaiPraktikSelasa"
                                                    value ={newJadwalSelasa.jamMulaiPraktikSelasa} 
                                                    onChange={handleInputSelasa} />
                                                    </td>
                                                :
                                                <td><input type="time" disabled/></td>
                                                }
                                                {
                                                    checkData2 === true?
                                                    <td>
                                                        <label htmlFor="jamBerakhirPraktikSelasa"></label>
                                                        <input 
                                                        id="jamBerakhirPraktikSelasa"
                                                        name="jamBerakhirPraktikSelasa"
                                                        type="time" 
                                                        value ={newJadwalSelasa.jamBerakhirPraktikSelasa} 
                                                        onChange={handleInputSelasa}/>
                                                        </td>
                                                    :
                                                    <td><input type="time" disabled/></td>
                                                }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="jadwalpraktikRabu"></label>
                                                    <input 
                                                    type="checkbox" 
                                                    id="jadwalpraktikRabu"
                                                    name="jadwalpraktikRabu"
                                                    value ={newJadwalRabu.jadwalpraktikRabu}
                                                    onChange={()=>handleInputRabu("Rabu")} 
                                                    onClick={()=>setCheckData3(!checkData3)}/>
                                                    Rabu
                                                    </td>
                                                {
                                                checkData3 === true?
                                                <td>
                                                    <label htmlFor="jamMulaiPraktikRabu"></label>
                                                    <input 
                                                    type="time" 
                                                    id="jamMulaiPraktikRabu"
                                                    name="jamMulaiPraktikRabu"
                                                    value ={newJadwalRabu.jamMulaiPraktikRabu} 
                                                    onChange={handleInputRabu} />
                                                    </td>
                                                :
                                                <td><input type="time" disabled/></td>
                                                }
                                                {
                                                    checkData3 === true?
                                                    <td>
                                                        <label htmlFor="jamBerakhirPraktikRabu"></label>
                                                        <input 
                                                        type="time" 
                                                        id="jamBerakhirPraktikRabu"
                                                        name="jamBerakhirPraktikRabu"
                                                        value ={newJadwalRabu.jamBerakhirPraktikRabu} 
                                                        onChange={handleInputRabu}/>
                                                        </td>
                                                    :
                                                    <td><input type="time" disabled/></td>
                                                }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="jadwalpraktikKamis"></label>
                                                    <input 
                                                    type="checkbox"
                                                    id="jadwalpraktikKamis"
                                                    name="jadwalpraktikKamis" 
                                                    value ={newJadwalKamis.jadwalpraktikKamis} 
                                                    onChange={()=>handleInputKamis("Kamis")} 
                                                    onClick={()=>setCheckData4(!checkData4)}/> 
                                                    Kamis
                                                    </td>
                                                {
                                                checkData4 === true?
                                                <td>
                                                    <label htmlFor="jamMulaiPraktikKamis"></label>
                                                    <input 
                                                    type="time" 
                                                    id="jamMulaiPraktikKamis"
                                                    name="jamMulaiPraktikKamis"
                                                    value ={newJadwalKamis.jamMulaiPraktikKamis} 
                                                    onChange={handleInputKamis} />
                                                    </td>
                                                :
                                                <td><input type="time" disabled/></td>
                                                }
                                                {
                                                    checkData4 === true?
                                                    <td>
                                                        <label htmlFor="jamBerakhirPraktikKamis"></label>
                                                        <input 
                                                        type="time"
                                                        id="jamBerakhirPraktikKamis"
                                                        name="jamBerakhirPraktikKamis" 
                                                        value ={newJadwalKamis.jamBerakhirPraktikKamis} 
                                                        onChange={handleInputKamis}/>
                                                        </td>
                                                    :
                                                    <td><input type="time" disabled/></td>
                                                }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="jadwalpraktikJumat"></label>
                                                    <input 
                                                    type="checkbox" 
                                                    id="jadwalpraktikJumat"
                                                    name="jadwalpraktikJumat"
                                                    value ={newJadwalJumat.jadwalpraktikJumat}
                                                    onChange={()=>handleInputJumat("Jumat")} 
                                                    onClick={()=>setCheckData5(!checkData5)}/> 
                                                    Jumat
                                                    </td>
                                                {
                                                checkData5 === true?
                                                <td>
                                                    <label htmlFor="jamMulaiPraktikJumat"></label>
                                                    <input 
                                                    type="time" 
                                                    id="jamMulaiPraktikJumat"
                                                    name="jamMulaiPraktikJumat"
                                                    value ={newJadwalJumat.jamMulaiPraktikJumat} 
                                                    onChange={handleInputJumat} />
                                                    </td>
                                                :
                                                <td><input type="time" disabled/></td>
                                                }
                                                {
                                                    checkData5 === true?
                                                    <td>
                                                        <label htmlFor="jamBerakhirPraktikJumat"></label>
                                                        <input 
                                                        type="time" 
                                                        id="jamBerakhirPraktikJumat"
                                                        name="jamBerakhirPraktikJumat"
                                                        value ={newJadwalJumat.jamBerakhirPraktikJumat} 
                                                        onChange={handleInputJumat}/>
                                                        </td>
                                                    :
                                                    <td><input type="time" disabled/></td>
                                                }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="jadwalpraktikSabtu"></label>
                                                    <input 
                                                    type="checkbox" 
                                                    id="jadwalpraktikSabtu"
                                                    name="jadwalpraktikSabtu"
                                                    value ={newJadwalSabtu.jadwalpraktikSabtu}
                                                    onChange={()=>handleInputSabtu("Sabtu")} 
                                                    onClick={()=>setCheckData6(!checkData6)}/> 
                                                    Sabtu
                                                    </td>
                                                {
                                                checkData6 === true?
                                                <td>
                                                    <label htmlFor="jamMulaiPraktikSabtu"></label>
                                                    <input 
                                                    type="time" 
                                                    id="jamMulaiPraktikSabtu"
                                                    name="jamMulaiPraktikSabtu"
                                                    value ={newJadwalSabtu.jamMulaiPraktikSabtu} 
                                                    onChange={handleInputSabtu} />
                                                    </td>
                                                :
                                                <td><input type="time" disabled/></td>
                                                }
                                                {
                                                    checkData6 === true?
                                                    <td>
                                                        <label htmlFor="jamBerakhirPraktikSabtu"></label>
                                                        <input 
                                                        type="time" 
                                                        id="jamBerakhirPraktikSabtu"
                                                        name="jamBerakhirPraktikSabtu"
                                                        value ={newJadwalSabtu.jamBerakhirPraktikSabtu} 
                                                        onChange={handleInputSabtu}/>
                                                        </td>
                                                    :
                                                    <td><input type="time" disabled/></td>
                                                }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="jadwalpraktikMinggu"></label>
                                                    <input 
                                                    type="checkbox" 
                                                    id="jadwalpraktikMinggu"
                                                    name="jadwalpraktikMinggu"
                                                    value ={newJadwalMinggu.jadwalpraktikMinggu}
                                                    onChange={()=>handleInputMinggu("Minggu")} 
                                                    onClick={()=>setCheckData7(!checkData7)}/> 
                                                    Minggu
                                                    </td>
                                                {
                                                checkData7 === true?
                                                <td>
                                                    <label htmlFor="jamMulaiPraktikMinggu"></label>
                                                    <input 
                                                    type="time" 
                                                    id="jamMulaiPraktikMinggu"
                                                    name="jamMulaiPraktikMinggu"
                                                    value ={newJadwalMinggu.jamMulaiPraktikMinggu} 
                                                    onChange={handleInputMinggu} />
                                                    </td>
                                                :
                                                <td><input type="time" disabled/></td>
                                                }
                                                {
                                                    checkData7 === true?
                                                    <td>
                                                        <label htmlFor="jamBerakhirPraktikMinggu"></label>
                                                        <input 
                                                        type="time" 
                                                        id="jamBerakhirPraktikMinggu"
                                                        name="jamBerakhirPraktikMinggu"
                                                        value ={newJadwalMinggu.jamBerakhirPraktikMinggu} 
                                                        onChange={handleInputMinggu}/>
                                                        </td>
                                                    :
                                                    <td><input type="time" disabled/></td>
                                                }
                                            </tr>
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
        </div>
    )
}

export default EditJadwalDokter;
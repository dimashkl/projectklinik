import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button } from "react-bootstrap"
import axios from "axios";
import "../style/landing.css";
//import NavigationBar from "./NavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import "../style/forminputprofile.css";


const InputProfileClinic = () => {

    const [Name, setName] = useState("");
    const [Profile, setProfile] = useState("");

    const [HariOperasional1, setHariOperasional1] = useState("");
    const [JamOPAwal1, setJamOPAwal1] = useState("");
    const [JamOPAkhir1, setJamOPAkhir1] = useState("");
    
    const [HariOperasional2, setHariOperasional2] = useState("");
    const [JamOPAwal2, setJamOPAwal2] = useState("");
    const [JamOPAkhir2, setJamOPAkhir2] = useState("");

    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Poli, setPoli] = useState("");
    const [DetPoli, setDetPoli] = useState("");


    const navigate = useNavigate();

    const inputJadwal = async (e) => {
        e.preventDefault();
        console.log(HariOperasional1);
        try {
            await axios.post('http://localhost:5000/profileklinik',{
                Name,
                Profile,

                HariOperasional1,
                JamOPAwal1,
                JamOPAkhir1,
                
                HariOperasional2,
                JamOPAwal2,
                JamOPAkhir2,

                Address,
                Phone,
                Email,
                Poli,
                DetPoli
            });
            alert('Berhasil menyimpan Profile Klinik!');
            //navigate("/profileclinic")
        } catch (error) {
            console.log(error);
        }
    }

    const {id} = useParams();




    return (
        <div className="formInput mt-5 is-centered">
            <form>

                <div className='shorten'>
                    <label className='label'>Nama Klinik</label>
                    <div className='control'>
                        <input 
                        type="text" 
                        className="input" 
                        value={Name}
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='Nama Klinik'/>
                    </div>
                </div>

                <div className='upper'>
                    <label className='label'>Profile Klinik</label>
                    <div className='shorten'>
                        <textarea 
                        rows={4} 
                        className="input" 
                        value={Profile}
                        onChange={(e)=> setProfile(e.target.value)}
                        placeholder='Profile'/>
                    </div>
                </div>

                <div className='upper'>
                    <label className='label'>Hari Operasional</label>
                    <div className='shorten'>
                        <select value={HariOperasional1} onChange={e => setHariOperasional1(e.target.value)}>
                            <option value="Senin - Jumat">Senin - Jum'at</option>
                            <option value="Sabtu - Minggu">Sabtu - Minggu</option>
                            <option value="Senin - Minggu">Senin - Minggu</option>
                        </select>
                    </div>
                </div>

                <div className='pindah'>
                    <label className='label'>Jam Operasional</label>
                    <div className="ganti">
                        <div className='control'>
                            <Container>
                                <Row>
                                    <Col md={2} className="controltime">
                                    <input 
                                    type="time" 
                                    className="input" 
                                    value={JamOPAwal1}
                                    onChange={(e)=> setJamOPAwal1(e.target.value)}
                                    placeholder='Jam Operasional Mulai'/>
                                    </Col>
                                    <Col md={2} className="controltime">
                                    <input 
                                    type="time" 
                                    className="input" 
                                    value={JamOPAkhir1}
                                    onChange={(e)=> setJamOPAkhir1(e.target.value)}
                                    placeholder='Jam Operasional Akhir'/>
                                    </Col>
                                </Row>
                            </Container>
                            </div>
                        </div>
                </div>

                <div className='upper'>
                    <label className='label'>Hari Operasional</label>
                    <div className='control'>
                    <select value={HariOperasional2} onChange={e => setHariOperasional2(e.target.value)}>
                            <option value="Senin - Jumat">Senin - Jum'at</option>
                            <option value="Sabtu - Minggu">Sabtu - Minggu</option>
                            <option value="Senin - Minggu">Senin - Minggu</option>
                        </select>
                    </div>
                </div>

                <div className='pindah'>
                    <label className='label'>Jam Operasional</label>
                    <div className="ganti">
                        <div className='control'>
                            <Container>
                                <Row>
                                    <Col md={2} className="controltime">
                                    <input 
                                    type="time" 
                                    className="input" 
                                    value={JamOPAwal2}
                                    onChange={(e)=> setJamOPAwal2(e.target.value)}
                                    placeholder='Jam Operasional Mulai'/>
                                    </Col>
                                    <Col md={2} className="controltime">
                                    <input 
                                    type="time" 
                                    className="input" 
                                    value={JamOPAkhir2}
                                    onChange={(e)=> setJamOPAkhir2(e.target.value)}
                                    placeholder='Jam Operasional Akhir'/>
                                    </Col>
                                </Row>
                            </Container>
                            </div>
                        </div>
                </div>
                
                <div className='shorten'>
                    <label className='label'>Address</label>
                    <div className='control'>
                        <input 
                        type="text"
                        className="input" 
                        value={Address}
                        onChange={(e)=> setAddress(e.target.value)}
                        placeholder='Address'/>
                    </div>
                </div>
                <div className='filled'>
                    <label className='label'>Phone</label>
                    <div className='control'>
                        <input 
                        type="text"
                        className="input" 
                        value={Phone}
                        onChange={(e)=> setPhone(e.target.value)}
                        placeholder='Phone'/>
                    </div>
                </div>
                <div className='shorten'>
                    <label className='label'>Email</label>
                    <div className='control'>
                        <input 
                        type="text"
                        className="input" 
                        value={Email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='Email'/>
                    </div>
                </div>
                <div className='shorten'>
                    <label className='label'>Poli</label>
                    <div className='control'>
                        <input 
                        type="text"
                        className="input" 
                        value={Poli}
                        onChange={(e)=> setPoli(e.target.value)}
                        placeholder='Poli'/>
                    </div>

                    <label className='label'>Lebih Detail Mengenai Poli</label>
                    <div className='control'>
                        <textarea 
                        rows={4}
                        className="input" 
                        value={DetPoli}
                        onChange={(e)=> setDetPoli(e.target.value)}
                        placeholder='DetPoli'/>
                    </div>

                </div>


                <div className='field'>
                    <button onClick={inputJadwal} type="submit" className='button is-success'>Submit Profile</button>
                </div>
            </form>
        </div>
      )
    }

export default InputProfileClinic
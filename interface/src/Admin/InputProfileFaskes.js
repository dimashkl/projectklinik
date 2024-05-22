import React, {useState, useEffect} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import "../style/landing.css";
import LangkahSatu from '../assets/images/LangkahSatu.png'
//import NavigationBar from "./NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const InputProfileFaskes = () => {
    const [msg, setMsg] = useState("");
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

      const [name, setName] = useState("");
      const [file, setFile] = useState("");
      const [preview, setPreview] = useState("");
      const [deskripsiklinik, setDeskripsiKlinik] = useState("");
      const [jenisFaskes, setJenisFaskes] =useState("");
  
      /*const [hariOperasionalSatu, setHariOperasionalSatu] = useState("");
      const [jamBukaSatu, setJamBukaSatu] = useState("");
      const [jamTutupSatu, setJamTutupSatu] = useState("");
      
      const [hariOperasionalDua, setHariOperasionalDua] = useState("");
      const [jamBukaDua, setJamBukaDua] = useState("");
      const [jamTutupDua, setJamTutupDua] = useState("");*/

      const daysOfWeek = [
        { day: 'Senin', isOpen: true, openingTime: '', closingTime: '' },
        { day: 'Selasa', isOpen: false, openingTime: '', closingTime: '' },
        { day: 'Rabu', isOpen: false, openingTime: '', closingTime: '' },
        { day: 'Kamis', isOpen: false, openingTime: '', closingTime: '' },
        { day: 'Jumat', isOpen: false, openingTime: '', closingTime: '' },
        { day: 'Sabtu', isOpen: false, openingTime: '', closingTime: '' },
        { day: 'Minggu', isOpen: false, openingTime: '', closingTime: '' }
      ];

      

      const [days, setDays] = useState(daysOfWeek);
      const [address, setAddress] = useState("");
      const [kelurahan, setKelurahan] = useState("");
      const [kecamatan, setKecamatan] = useState("");
      const [kota, setKota] = useState("");
      const [provinsi, setProvinsi] = useState("");

      const [phone, setPhone] = useState("");
      const [email, setEmail] = useState("");
      //const [msg, setMsg] = useState("");
  
      const [profilefaskes, setProfileFaskes] = useState("");

      useEffect(()=>{
        getProfileFaskes();
      },[]);

      const getProfileFaskes = async()=>{
        const response = await axios.get("http://localhost:5000/profilefaskes");
        setProfileFaskes(response.data);
      };

      const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
      }
    

    /*const saveProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name",name);
        formData.append("deskripsiklinik",deskripsiklinik);
        formData.append("jenisFaskes",jenisFaskes);*/
        /*formData.append("hariOperasionalSatu",hariOperasionalSatu);
        formData.append("jamBukaSatu",jamBukaSatu);
        formData.append("jamTutupSatu",jamTutupSatu);
        formData.append("hariOperasionalDua",hariOperasionalDua);
        formData.append("jamBukaDua",jamBukaDua);
        formData.append("jamTutupDua",jamTutupDua);*/
        /*formData.append("days", JSON.stringify(days));
        formData.append("address",address);
        formData.append("kelurahan",kelurahan);
        formData.append("kecamatan",kecamatan);
        formData.append("kota",kota);
        formData.append("provinsi",provinsi);
        formData.append("phone",phone);
        formData.append("email",email);
        //console.log(formData);
        if (profilefaskes.length === 0) {
            try {
                await axios.post("http://localhost:5001/profilefaskes", formData,
            { 
                headers: {"Content-Type": "multipart/form-data"}
            }).then(res=>{
                alert('Form berhasil disimpan ^^');
            });
            navigate("/admin");
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                  }
            }
        } else {
            alert("Anda sudah melakukan submit formulir sebelumnya, silakan tekan OK untuk melihat formulir anda");
            navigate("/profilefaskesadmin");
        } 
    }*/

    const handleToggle = (index) => {
        const newDays = [...days];
        newDays[index].isOpen = !newDays[index].isOpen;
        setDays(newDays);
      };
    
    const showAlertSubmit = () => {
        confirmAlert({
        title: 'Konfirmasi',
        message: 'Anda yakin dengan data yang sudah diisi ? jika sudah yakin maka data akan tersimpan dan anda akan diarahkan ke halaman selanjutnya.',
        buttons: [
            {
            label: 'Ya',
            onClick: async() => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("name",name);
                formData.append("deskripsiklinik",deskripsiklinik);
                formData.append("jenisFaskes",jenisFaskes);
                formData.append("days", JSON.stringify(days));
                formData.append("address",address);
                formData.append("kelurahan",kelurahan);
                formData.append("kecamatan",kecamatan);
                formData.append("kota",kota);
                formData.append("provinsi",provinsi);
                formData.append("phone",phone);
                formData.append("email",email);
                if (profilefaskes.length === 0) {
                    await axios.post("http://localhost:5000/profilefaskes", formData,
                    { 
                        headers: {"Content-Type": "multipart/form-data"}
                    })
                    navigate("/inputfasilitas");
                } else {
                    alert("Anda sudah melakukan submit formulir sebelumnya, silakan tekan OK untuk melihat formulir anda");
                    navigate("/profilefaskesadmin");
                } 
            }
            },
            {
                label: 'Tidak',
                onClick: () => {
                    navigate("/inputprofilefaskes");
                }
            } 
        ]
        });
    };

    const fieldKosong = ()=>{
        setMsg("Ada informasi yang belum anda isi, silakan isi semua informasi diminta.")
      }


    return(
        <div className="cfBG">
            <Container>
            <div className="columns is-centered">
            <div className="column is-half">
            <img
            style={{position:"relative", left:"50px", width:"450px", marginTop:"25px"}}
            src={LangkahSatu}
            />
                <div className="field" style={{marginTop:"0px", zIndex:""}}>
                        <h2 className="title">Profile Klinik</h2>
                        <label className="label">Foto Profile Klinik</label>
                        <div className="control" key={profilefaskes}>
                            <label className="file-label">
                            <input
                                type="file" 
                                className="file-input"
                                onChange={loadImage} />
                                <span className="file-cta">
                                    <span className="file-label">
                                        choose a file...
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
                        <label className="label">Jenis Fasilitas Kesehatan</label>
                        <div className="control">
                        <select value={jenisFaskes} onChange={e =>setJenisFaskes(e.target.value)}>
                            <option value="Pilih Jenis Fasilitas Kesehatan">Pilih Jenis Fasilitas Kesehatan</option>
                            <option value="Klinik Pratama">Klinik Pratama</option>
                            <option value="Klinik Utama">Klinik Utama</option>
                        </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nama Faskes</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={name} 
                            onChange={(e)=> setName(e.target.value)} 
                            placeholder='Masukan Nama Faskes'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Deskripsi Klinik</label>
                        <div className="control">
                            <textarea
                            rows={4}
                            type="text" 
                            className='input' 
                            value ={deskripsiklinik} 
                            onChange={(e)=> setDeskripsiKlinik(e.target.value)} 
                            placeholder='Deskrpsi Klinik'
                            />
                        </div>
                    </div>
                        <Row>
                        <div className="field">
                            <label className="label">Alamat Faskes</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={address} 
                                onChange={(e)=> setAddress(e.target.value)} 
                                placeholder='Masukan Alamat Faskes'
                                />
                            </div>
                        </div>
                    <Col md={6}>
                        <div className="field">
                            <label className="label">Kelurahan</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={kelurahan} 
                                onChange={(e)=> setKelurahan(e.target.value)} 
                                placeholder='Masukan Kelurahan'
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="field">
                            <label className="label">Kecamatan</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={kecamatan} 
                                onChange={(e)=> setKecamatan(e.target.value)} 
                                placeholder='Masukan Kecamatan'
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="field">
                            <label className="label">Kota/Kabupaten</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={kota} 
                                onChange={(e)=> setKota(e.target.value)} 
                                placeholder='Masukan Kota/Kabupaten'
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="field">
                            <label className="label">Provinsi</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input'
                                value ={provinsi} 
                                onChange={(e)=> setProvinsi(e.target.value)} 
                                placeholder='Masukan Provinsi'
                                />
                            </div>
                        </div>
                    </Col>
                    </Row>

                    <div className="field">
                        <label className="label">No Telepon</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={phone} 
                            onChange={(e)=> setPhone(e.target.value)} 
                            placeholder='Masukan Nomor Telepon Faskes'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={email} 
                            onChange={(e)=> setEmail(e.target.value)} 
                            placeholder='Masukan Email'
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
                                        <th>Jam Buka</th>
                                        <th>Jam Tutup</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {days.map((day, index) => (
                                        <tr key={day.day}>
                                        <td>
                                            <label>{day.day}</label>
                                            </td>
                                        <td>
                                            <label class="form-check form-switch">
                                            <input class="form-check-input" 
                                            type="checkbox" 
                                            role="switch" 
                                            id="flexSwitchCheckDefault" 
                                            checked={day.isOpen} 
                                            onChange={() => handleToggle(index)} />
                                            <span className="slider round"></span>
                                            </label>
                                        </td>
                                        <td>
                                            {day.isOpen && (
                                            <input type="time" value={day.openingTime} onChange={(e) => {
                                                const newDays = [...days];
                                                newDays[index].openingTime = e.target.value;
                                                setDays(newDays);
                                            }} />
                                            )}
                                        </td>
                                        <td>
                                            {day.isOpen && (
                                            <input type="time" value={day.closingTime} onChange={(e) => {
                                                const newDays = [...days];
                                                newDays[index].closingTime = e.target.value;
                                                setDays(newDays);
                                            }} />
                                            )}
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="has-text-centered" style={{color: "red", marginBottom:"50px"}}>{msg}</p>
                    <div className="field">
                    {
                            preview === "" || name === "" || deskripsiklinik === "" || jenisFaskes === "" || address === "" || kelurahan === "" 
                            || kecamatan === "" || kota === "" || provinsi === "" || phone === "" || email === "" ?
                            <div className="field">
                                <button type="submit" className='button is-success' onClick={fieldKosong}>Submit</button>
                            </div>
                            :
                            <div className="field">
                                <button type="submit" className='button is-success' onClick={showAlertSubmit}>Submit</button>
                            </div>
                        }
                    </div>
            </div>
        </div>
        </Container>
        </div>
    )
}

export default InputProfileFaskes


/*<div className="field">
                        <label className="label">Hari Operasional</label>
                        <div className="control">
                            <select value={hariOperasionalSatu} onChange={e => setHariOperasionalSatu(e.target.value)}>
                                <option value="Pilih Hari Operasional 1">Pilih Hari Operasional 1</option>
                                <option value="Senin - Jumat">Senin - Jum'at</option>
                                <option value="Sabtu - Minggu">Sabtu - Minggu</option>
                                <option value="Senin - Minggu">Senin - Minggu</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Jam Operasional</label>
                        <div className="control">
                            <input 
                            type="time" 
                            className="input" 
                            value={jamBukaSatu}
                            onChange={(e)=> setJamBukaSatu(e.target.value)}
                            placeholder='Jam Operasional Mulai'/>
                            <input 
                            type="time" 
                            className="input" 
                            value={jamTutupSatu}
                            onChange={(e)=> setJamTutupSatu(e.target.value)}
                            placeholder='Jam Operasional Akhir'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Hari Operasional</label>
                        <div className="control">
                            <select value={hariOperasionalDua} onChange={e => setHariOperasionalDua(e.target.value)}>
                                <option value="Pilih Hari Operasional 2">Pilih Hari Operasional 2</option>
                                <option value="Senin - Jumat">Senin - Jum'at</option>
                                <option value="Sabtu - Minggu">Sabtu - Minggu</option>
                                <option value="Senin - Minggu">Senin - Minggu</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Jam Operasional</label>
                        <div className="control">
                            <input 
                            type="time" 
                            className="input" 
                            value={jamBukaDua}
                            onChange={(e)=> setJamBukaDua(e.target.value)}
                            placeholder='Jam Operasional Mulai'/>

                            <input 
                            type="time" 
                            className="input" 
                            value={jamTutupDua}
                            onChange={(e)=> setJamTutupDua(e.target.value)}
                            placeholder='Jam Operasional Akhir'/>
                        </div>
                    </div>*/

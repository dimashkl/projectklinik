import React, {useState, useEffect} from "react";
import axios from "axios";
import "../style/landing.css";
import NavigationBar from "./NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { confirmAlert } from "react-confirm-alert";

const EditProfileFaskes = () => {
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

      //const { user } = useSelector((state) => state.auth);
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
      const [msg, setMsg] = useState("");

      useEffect(()=>{
        getProfileFaskes();
      },[]);

      const getProfileFaskes = async () =>{
        const response = await axios.get("http://localhost:5000/profilefaskes");
        setName(response.data[0].name);
        setDeskripsiKlinik(response.data[0].deskripsiklinik);
        setJenisFaskes(response.data[0].jenisFaskes);
        setFile(response.data[0].image);
        setPreview(response.data[0].url);
        
        /*setHariOperasionalSatu(response.data[0].hariOperasionalSatu);
        setJamBukaSatu(response.data[0].jamBukaSatu);
        setJamTutupSatu(response.data[0].jamTutupSatu);

        setHariOperasionalDua(response.data[0].hariOperasionalDua);
        setJamBukaDua(response.data[0].jamBukaDua);
        setJamTutupDua(response.data[0].jamTutupDua);*/
        const hari = JSON.parse(response.data[0].days);
        const hari2 = JSON.parse(hari);
        setDays(hari2)
        setAddress(response.data[0].address);
        setKelurahan(response.data[0].kelurahan);
        setKecamatan(response.data[0].kecamatan);
        setKota(response.data[0].kota);
        setProvinsi(response.data[0].provinsi);
        setPhone(response.data[0].phone);
        setEmail(response.data[0].email);
      };

      const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
      }

      const handleToggle = (index) => {
        const newDays = [...days];
        newDays[index].isOpen = !newDays[index].isOpen;
        setDays(newDays);
      };

      const showAlertSubmit = () => {
        confirmAlert({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin ingin menyimpan data ini ?',
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
                try {
                    await axios.patch('http://localhost:5000/profilefaskes', formData,{
                        headers: {"Content-Type": "multipart/form-data"}
                        });
                    alert('Profile Klinik berhasil diupdate !');
                    navigate("/profilefaskesAdmin");
                     } catch (error) {
                        alert("gagal mengupdate data, mohon pastikan semua pertanyaan sudah terisi");
                        navigate("/editprofilefaskes");
                   }
            }
            },
            {
            label: 'Tidak',
            onClick: () => {
                    navigate("/editprofilefaskes");
            }
            }
        ]
        });
    };    

    const showAlertCancel = () => {
        confirmAlert({
        title: 'Konfirmasi',
        message: 'Semua perubahan belum disimpan, apakah anda yakin ingin membatalkannya ?',
        buttons: [
            {
            label: 'Ya',
            onClick: () => {
                    navigate("/profileklinik");
            }
            },
            {
            label: 'Tidak',
            onClick: () => {
                    navigate("/editprofilefaskes");
                
            }
            }
        ]
        });
    };

    const fieldKosong = ()=>{
        setMsg("Ada informasi yang belum anda isi, silakan isi semua informasi diminta.")
      }
      


    return(
        <Layout>
        <div style={{height:"auto"}}>
            <div style={{marginLeft:"200px"}} className="columns is-centered">
            <div className="column is-half">
                <div className="field">
                        <br />
                        <br />
                        <br />
                        <label className="label">Foto Profile Klinik</label>
                        <div className="control">
                            <div className="file">
                            <label className="file-label">
                            <input
                                type="file" 
                                className="file-input"
                                onChange={loadImage} 
                                />
                                <span className="file-cta">
                                    <span className="file-label">
                                        choose a file...
                                    </span>
                                </span>
                            </label>
                            </div>
                        </div>
                    </div>
                    {preview ? (
                            <figure className="image is-128x128">
                                <img src ={preview} alt="Preview"></img>
                            </figure>
                        ): ( ""
                        )}

                    <div className="field">
                        <label className="label">Jenis Fasilitas Kesehatan</label>
                        <div className="control">
                        <select value={jenisFaskes} onChange={e =>setJenisFaskes(e.target.value)}>
                            <option value="Pilih Jenis Fasilitas Kesehatan">Pilih Jenis Fasilitas Kesehatan</option>
                            <option value="Klinik Pratama">Klinik Pratama</option>
                            <option value="Klinik Utama">Klinik Utama</option>
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
                    <div className="field">
                        <label className="label">Kelurahan</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={kelurahan} 
                            onChange={(e)=> setKelurahan(e.target.value)} 
                            placeholder='Masukan Alamat Faskes'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kecamatan</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={kecamatan} 
                            onChange={(e)=> setKecamatan(e.target.value)} 
                            placeholder='Masukan Alamat Faskes'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kota</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={kota} 
                            onChange={(e)=> setKota(e.target.value)} 
                            placeholder='Masukan Alamat Faskes'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Provinsi</label>
                        <div className="control">
                            <input 
                            type="text" 
                            className='input'
                            value ={provinsi} 
                            onChange={(e)=> setProvinsi(e.target.value)} 
                            placeholder='Masukan Alamat Faskes'
                            />
                        </div>
                    </div>
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
                                            checked={day.isOpen} onChange={() => handleToggle(index)} />
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
                    <footer className="border shadow-lg rounded" style={{marginLeft:"-280px",position:"fixed", padding:"30px 450px", bottom:"30px", background:"white"}}>
            <p className="has-text-centered" style={{color: "red", position:"absolute", top:"-15px", left:"0px", background:"white", width:"1040px"}}>{msg}</p>
                {
                preview === "" || name === "" || deskripsiklinik === "" || jenisFaskes === "" || address === "" || kelurahan === "" 
                || kecamatan === "" || kota === "" || provinsi === "" || phone === "" || email === "" ?
                <div>
                    <button className="button is-success" onClick={fieldKosong} style={{position:"absolute", top:"20px", left:"350px"}}>SUBMIT</button>
                    <button className="button is-danger" onClick={showAlertCancel} style={{position:"absolute", top:"20px", left:"500px"}}>CANCEL</button>
                </div>
                :
                <div>
                    <button className="button is-success" onClick={showAlertSubmit} style={{position:"absolute", top:"20px", left:"350px"}}>SUBMIT</button>
                    <button className="button is-danger" onClick={showAlertCancel} style={{position:"absolute", top:"20px", left:"500px"}}>CANCEL</button>
                </div>
                }
            </footer>
            </div>
        </div>
        </div>
        </Layout>
    )
}

export default EditProfileFaskes
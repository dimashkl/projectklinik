import React, {useState ,useEffect} from 'react';
//import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Layout from './Layout';

const ProfileFaskesAdmin = () => {
  const [profilefaskes, setProfileFaskes] = useState([])
  const [days, setDays] =useState([]);

  const [msg, setMsg] = useState("");

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
      
    useEffect(()=>{
        getProfileFaskes();
      }, []);

  const getProfileFaskes = async() =>{
    const response = await axios.get('http://localhost:5000/profilefaskes');
    setProfileFaskes(response.data[0]);
    const hari = JSON.parse(response.data[0].days);
    const hari2 = JSON.parse(hari);
    setDays(hari2)
    //console.log(hari2)
    }

    const deleteProfileFaskes = async(profilefaskesId) =>{
      try {
      const response = await axios.delete(`http://localhost:5000/profilefaskes/${profilefaskesId}`);
      getProfileFaskes(response.data[0]);
      alert('Berhasil menghapus Profile Klinik!');
      navigate("/")
      } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg);
      }
      }
    }

  return (
    <Layout>
    <div style={{marginTop:"100px"}}>
        <div className='title'>
          Profile Klinik
        </div>
        <p>{msg}</p>
        <div className="columns mt-1 is-centered">
        <Button type='submit' className='button is-info' href={`/editprofilefaskes`} style={{marginTop:"-30px"}}>EDIT FORM</Button>
        </div>
        <div className="columns mt-1 mx-5 is-centered">
          <div className="column">
            <div>
            <form class='form'>
                    <p className="has-text-centered"></p>
                    <div className="field">
                        <label className="label">Foto Profile Klinik</label>
                        <div className="control" key={profilefaskes}>
                        <figure className='image is-96x96'>
                          <img
                          src = {profilefaskes.url}
                          alt = ""
                          />
                      </figure>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Jenis Fasilitas Kesehatan</label>
                        <div className="control">
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.jenisFaskes}</label>
                        </div>
                    
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nama Faskes</label>
                        <div className="control" key={profilefaskes}>
                            <label 
                            className='input'>{profilefaskes.name}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Deskripsi Klinik</label>
                        <div className="control" key={profilefaskes}>
                            <label 
                            className='input'>{profilefaskes.deskripsiklinik}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Alamat Faskes</label>
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.address}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kelurahan</label>
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.kelurahan}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kecamatan</label>
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.kecamatan}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kota</label>
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.kota}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Provinsi</label>
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.provinsi}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">No Telepon</label>
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.phone}</label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                            <div className="control" key={profilefaskes}>
                            <label className='input'>{profilefaskes.email}</label>
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
                        {days.map((day) => (
                            <tr>
                              {
                                day.isOpen === false?
                                <td style={{background:"gray"}}>{day.day}</td>
                                :
                                <td>{day.day}</td>
                              }
                              {
                                day.isOpen === false?
                                <td style={{background:"gray"}}>{"OFF"}</td>
                                :
                                <td>{"ON"}</td>
                              }
                              {
                                day.isOpen === false?
                                <td style={{background:"gray"}}>{"OFF"}</td>
                                :
                                <td>{day.openingTime}</td>
                              }
                              {
                                day.isOpen === false?
                                <td style={{background:"gray"}}>{"OFF"}</td>
                                :
                                <td>{day.closingTime}</td>
                              }
                            </tr>
                        ))}
                        </tbody>
                    
                        </table>
                    </div>
                    </div>
                </form>
                </div>
        </div>
        </div>
    </div>
    </Layout>
  )
}

export default ProfileFaskesAdmin

/*<form className="columns mt-1 is-centered">
              <div className='fields has-addons'>
                <div className='control has-expanded'>
                  <input 
                    type='text'
                    classname='input'
                    placeholder='Find Something Here..'
                    style={{padding:'6px', marginLeft:'50px', width:'1120px', marginBottom:'10px'}}
                  />
                  <button type='submit' className='button is-info'>Search</button>
                </div>
              </div>
            </form >*/
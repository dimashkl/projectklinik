import React, {useState ,useEffect} from 'react';
import "../style/fasilitas.css";
import JenisLayanan from "../components/JenisLayanan";
import NavFooter from "../components/NavFooter";
import NavBar from "../components/NavBar";
import axios from "axios";
import moment from 'moment';
import { useParams } from 'react-router-dom';

const Fasilitas = () => {
    const [profilefaskes, setProfileFaskes] = useState([]);
    const [days, setDays] = useState([]);
    const [currentTime, setCurrentTime] = useState(moment());
    const {id} =useParams();


useEffect(() => {
    const getProfileFaskesByUserId = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/fasilitas/${id}`);
            const hari = JSON.parse(response.data.days);
            const hari2 = JSON.parse(hari);
            setDays(hari2)
            setProfileFaskes (response.data);
            console.log(response.data)
            console.log(hari2)

        } catch (error) {
            
        }
    };
    getProfileFaskesByUserId();
},[id]);


useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentTime(moment());
  }, 1000);
  return () => clearInterval(intervalId);
}, []);

const today = new Date().toLocaleDateString('id', { weekday: 'long' });
//console.log(new Date)

const clinicToday = days.find(day => day.day === today);
//console.log(clinicToday)


function isClinicOpen(day) {
  const openingTime = moment(day.openingTime, 'HH:mm');
      const closingTime = moment(day.closingTime, 'HH:mm');
      const currentTimeFormatted = moment(currentTime.format('HH:mm'), 'HH:mm');
  if ((day.day === today && day.isOpen)  && currentTimeFormatted.isBetween(openingTime, closingTime)) {
   console.log(currentTimeFormatted);
    return true;
  }
}

    return (
        <div>
            <NavBar />
                <div className="headerfasil" style={{marginTop:"50px"}}>
                <div className="headerfasil-item">
                <figure className='image is-128x128'>
                    <img
                        src = {profilefaskes.url}
                        alt = ""
                    />
          </figure>
                </div>
                <div className="headerfasil-info">  
                    <h1 className="headerFasilTitle">{profilefaskes.name}</h1>
                    <span className="headerfasilJenis">{profilefaskes.jenisFaskes}</span>
                   
                    <div>
                    {clinicToday && isClinicOpen(clinicToday) ? (
                      <label 
                        style={{position:"relative", width:"60px",color:"white",textAlign:"center",borderRadius:"5px", background:"green"}}>
                        OPEN
                      </label>
                    ) : (
                      <label
                        style={{position:"relative", width:"60px",color:"white",textAlign:"center",borderRadius:"5px", background:"red"}}>
                        CLOSED
                      </label>
                    )}
                    
                    </div>


                    <span className="headerfasilLok">
                        {profilefaskes.kecamatan}, {profilefaskes.kota}
                     </span>
                </div>
            </div> 
            <div>
                    <div className="fasilinfo">
                <div className="fasilgrp">
                    <h1 className="fasilTitle">Alamat</h1>
                    <span className="fasilex">
                   {profilefaskes.address}, {profilefaskes.kelurahan}, {profilefaskes.kecamatan}, {profilefaskes.kota}, {profilefaskes.provinsi}
                    </span>
                </div>

                <div className="fasilgrp">
                    <h1 className="fasilTitle">Profil Faskes</h1>
                    <span className="fasilex">
                        {profilefaskes.deskripsiklinik}
                    </span>
                </div>

                <div className="field">
                <h1 className="fasilTitle">Operasional Klinik</h1>
                    <div className="control">
                        <table className="table">
                        <thead>
                            <tr>
                            <th>Hari Operasional</th>
                            <th>Jam Buka</th>
                            <th>Jam Tutup</th>
                            </tr>
                        </thead>
                        <tbody>
                        {days.map((day) => (
                        <tr>
                          {isClinicOpen(day) ? (
                            <td style={{ color: 'green', fontWeight: 'bold' }}>{day.day}</td>
                          ) : (
                            <td>{day.day}</td>
                          )}
                          {isClinicOpen(day) ? (
                            <td style={{ color: 'green', fontWeight: 'bold' }}>{day.openingTime}</td>
                          ) : (
                            <td>{day.openingTime}</td>
                          )}
                          {isClinicOpen(day) ? (
                            <td style={{ color: 'green', fontWeight: 'bold' }}>{day.closingTime}</td>
                          ) : (
                            <td>{day.closingTime}</td>
                          )}
                        </tr>
                      ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                <div>
                    <div className="jenislayananTitle">
                    <h1>Fasilitas Layanan Kesehatan</h1>
                    </div>
                    <JenisLayanan/>
                </div>
            <NavFooter/>
        </div>
    )
  }
  
  export default Fasilitas;
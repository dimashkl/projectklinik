import React, {useEffect, useState} from 'react';
//import NavigationBar from './NavigationBar';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from 'axios';
import { Form, NavLink } from 'react-bootstrap';

const BookData = () => {
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

      const [dataPasien, setDataPasien] = useState([]);

      useEffect(()=>{
        getdata();
      }, [])

      const getdata = async () =>{
        const response = await axios.get('http://localhost:5000/datapasien');
        setDataPasien(response.data); 
      }

       const [search, setSearch] = useState("");
       const [cari, setCari] = useState([]);

       useEffect(()=>{
        const nama1 = dataPasien.map((pasien)=>{
          const nama2 = JSON.parse(pasien.data);
          return{
            Nama: nama2.Nama,
            NIK: nama2.NIK,
            fasilitas: pasien.fasilitas,
            namaDokter: pasien.namaDokter,
            tanggalDatang: pasien.tanggalDatang,
            jamDatang: pasien.jamDatang,
            uuid: pasien.uuid
          }
        });
        setCari(nama1)
       },[dataPasien, search]);

       const filtered = cari.filter((pasien)=>{
        const fasil = pasien.fasilitas.toLowerCase().includes(search.toLowerCase());
        const cariNama = pasien.Nama.toLowerCase().includes(search.toLowerCase());
        const cariNik = pasien.NIK.toLowerCase().includes(search.toLowerCase());
        const cariDokter= pasien.namaDokter.toLowerCase().includes(search.toLowerCase());
         return fasil || cariNama || cariNik || cariDokter
       })      
      

  return (
    <div style={{marginTop:"98px", width:"1145px", marginLeft:"0px"}}>
       <Form className="d-flex w-50 my-5 mx-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{position:"absolute",width:"700px", marginLeft:"-70px"}}/>
            </Form> 
        <div className="container mx-auto px-4" style={{marginBottom:"50px"}}>
          <div className="headersign my-4" style={{marginLeft:"440px"}}>
            <h1>Data Pasien</h1>
          </div>  
          {filtered.map((field)=>{
            return(
              <div className="bg-white shadow-lg my-10 rounded" style={{marginTop:"20px", padding:"20px 0px", width:"985px"}} key={field.id}>
                <div style={{marginTop:"10px"}}>
                  <table>
                    <tbody>
                      <tr key={field.uuid}>
                      <td style={{position:"relative",left:"20px", top:"-10px", width:"500px"}}><p>Nama Pasien: <strong>{field.Nama}</strong></p></td>
                      <td style={{position:"relative",left:"0px", top:"-10px", width:"500px"}}><p>Nama Dokter: <strong>{field.namaDokter}</strong></p></td>
                      <td style={{position:"relative",left:"0px", top:"-10px", width:"400px"}}><p>Tanggal kunjungan: <strong>{field.tanggalDatang}</strong></p></td>
                      </tr>
                      <tr>
                      <td style={{position:"relative",left:"20px", top:"-20px",width:"300px"}}><p> NIK: <strong>{field.NIK}</strong></p></td>
                      <td style={{position:"relative",left:"0px", top:"-20px", width:"400px"}}><p>Fasilitas: <strong>{field.fasilitas}</strong></p></td>
                      <td style={{position:"relative",left:"0px", top:"-20px", width:"400px"}}><p>Jam kunjungan: <strong>{field.jamDatang < 10 ? `0${field.jamDatang}:00` : `${field.jamDatang}:00`}</strong></p></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <NavLink href={`/datapasien/${field.uuid}`} style={{paddingLeft:"880px", color:"blue"}}> lihat details </NavLink>
            </div>
            )
          })}        
        </div>
    </div>
  )
}

export default BookData
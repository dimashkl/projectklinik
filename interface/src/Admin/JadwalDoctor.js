import React, { useState ,useEffect } from 'react';
import "../style/landing.css"
import NavigationBar from './NavigationBar';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { getMe } from "../features/authSlice";
import { Link } from "react-router-dom";
import axios from 'axios';

const JadwalDoctor = () => {

    const [jadwalDokter, setJadwalDokter] = useState("");


  useEffect(()=>{
    getJadwalDokter();
  }, []);


    const getJadwalDokter = async() =>{
    const response = await axios.get('http://localhost:5000/jadwaldokter');
    if (response.data.length === 0) {
      setHariSenin({ jadwalpraktikSenin: "OFF", jamMulaiPraktikSenin: "OFF", jamBerakhirPraktikSenin: "OFF" });
      setHariSelasa({ jadwalpraktikSelasa: "OFF", jamMulaiPraktikSelasa: "OFF", jamBerakhirPraktikSelasa: "OFF" });
      setHariRabu({ jadwalpraktikRabu: "OFF", jamMulaiPraktikRabu: "OFF", jamBerakhirPraktikRabu: "OFF" });
      setHariKamis({ jadwalpraktikKamis: "OFF", jamMulaiPraktikKamis: "OFF", jamBerakhirPraktikKamis: "OFF" });
      setHariJumat({ jadwalpraktikJumat: "OFF", jamMulaiPraktikJumat: "OFF", jamBerakhirPraktikJumat: "OFF" });
      setHariSabtu({ jadwalpraktikSabtu: "OFF", jamMulaiPraktikSabtu: "OFF", jamBerakhirPraktikSabtu: "OFF" });
      setHariMinggu({ jadwalpraktikMinggu: "OFF", jamMulaiPraktikMinggu: "OFF", jamBerakhirPraktikMinggu: "OFF" });
      return;
      }
    setJadwalDokter(response.data[11]);

    const hariSenin = JSON.parse(response.data[11].jadwalpraktikSenin);
    setHariSenin(hariSenin);
    const hariSelasa = JSON.parse(response.data[11].jadwalpraktikSelasa);
    setHariSelasa(hariSelasa);
    const hariRabu = JSON.parse(response.data[11].jadwalpraktikRabu);
    setHariRabu(hariRabu);
    const hariKamis = JSON.parse(response.data[11].jadwalpraktikKamis);
    setHariKamis(hariKamis);
    const hariJumat = JSON.parse(response.data[11].jadwalpraktikJumat);
    setHariJumat(hariJumat);
    const hariSabtu = JSON.parse(response.data[11].jadwalpraktikSabtu);
    setHariSabtu(hariSabtu);
    const hariMinggu = JSON.parse(response.data[11].jadwalpraktikMinggu);
    setHariMinggu(hariMinggu);

    }

    const [hariSenin, setHariSenin] = useState([]);
    const [hariSelasa, setHariSelasa] = useState([]);
    const [hariRabu, setHariRabu] = useState([]);
    const [hariKamis, setHariKamis] = useState([]);
    const [hariJumat, setHariJumat] = useState([]);
    const [hariSabtu, setHariSabtu] = useState([]);
    const [hariMinggu, setHariMinggu] = useState([]);


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

  return (
    <div className='duaBG'>
        <NavigationBar />
        <div className='juduledit'>Jadwal Praktik Dokter</div>
        <div className="columns mt-1 is-centered">
            <div className="column identifydok">
            <table className='table'>
            <Link
                  to={`/editjadwaldokter/${jadwalDokter.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                    <thead className='table'>
                      <tr>
                        <th>Nama Dokter</th>
                        <th>ID Dokter</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr key={jadwalDokter.id}>
                          <td>{jadwalDokter.namaDokter}</td>
                          <td>{jadwalDokter.idDokter}</td>
                        </tr>
                    </tbody>
                </table> 
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Hari</th>
                      <th>Jam Mulai</th>
                      <th>Jam Selesai</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr key={jadwalDokter.id}>
                          <td>{hariSenin.jadwalpraktikSenin}</td>
                          <td disabled={!hariSenin.jamMulaiPraktikSenin}>{hariSenin.jamMulaiPraktikSenin || "OFF"}</td>
                          <td disabled={!hariSenin.jamBerakhirPraktikSenin}>{hariSenin.jamBerakhirPraktikSenin || "OFF"}</td>
                        </tr>
                        <tr key={jadwalDokter.id}>
                          <td>{hariSelasa.jadwalpraktikSelasa}</td>
                          <td disabled={!hariSelasa.jamMulaiPraktikSelasa}>{hariSelasa.jamMulaiPraktikSelasa || "OFF"} </td>
                          <td disabled={!hariSelasa.jamBerakhirPraktikSelasa}>{hariSelasa.jamBerakhirPraktikSelasa || "OFF"}</td>
                        </tr>
                        <tr key={jadwalDokter.id}>
                          <td>{hariRabu.jadwalpraktikRabu}</td>
                          <td disabled={!hariRabu.jamMulaiPraktikRabu}>{hariRabu.jamMulaiPraktikRabu || "OFF"}</td>
                          <td disabled={!hariRabu.jamBerakhirPraktikRabu}>{hariRabu.jamBerakhirPraktikRabu || "OFF"}</td>
                        </tr>
                        <tr key={jadwalDokter.id}>
                          <td>{hariKamis.jadwalpraktikKamis}</td>
                          <td disabled={!hariKamis.jamMulaiPraktikKamis}>{hariKamis.jamMulaiPraktikKamis || "OFF"}</td>
                          <td disabled={!hariKamis.jamBerakhirPraktikKamis}>{hariKamis.jamBerakhirPraktikKamis || "OFF"}</td>
                        </tr>
                        <tr key={jadwalDokter.id}>
                          <td>{hariJumat.jadwalpraktikJumat}</td>
                          <td disabled={!hariJumat.jamMulaiPraktikJumat}>{hariJumat.jamMulaiPraktikJumat || "OFF"}</td>
                          <td disabled={!hariJumat.jamBerakhirPraktikJumat}>{hariJumat.jamBerakhirPraktikJumat || "OFF"}</td>
                        </tr>
                        <tr key={jadwalDokter.id}>
                          <td>{hariSabtu.jadwalpraktikSabtu}</td>
                          <td disabled={!hariSabtu.jamMulaiPraktikSabtu}>{hariSabtu.jamMulaiPraktikSabtu || "OFF"}</td>
                          <td disabled={!hariSabtu.jamBerakhirPraktikSabtu}>{hariSabtu.jamBerakhirPraktikSabtu || "OFF"}</td>
                        </tr>
                        <tr key={jadwalDokter.id}>
                          <td>{hariMinggu.jadwalpraktikMinggu}</td>
                          <td disabled={!hariMinggu.jamMulaiPraktikMinggu}>{hariMinggu.jamMulaiPraktikMinggu || "OFF"}</td>
                          <td disabled={!hariMinggu.jamBerakhirPraktikMinggu}>{hariMinggu.jamBerakhirPraktikMinggu || "OFF"}</td>
                        </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default JadwalDoctor
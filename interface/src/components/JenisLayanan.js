import "../style/jenisLayanan.css";
//import poliumumlogo from "../assets/images/poliumumlogo.png";
import axios from "axios";
import { useParams } from 'react-router-dom';
import React, {useState ,useEffect} from 'react';

const JenisLayanan = () => {
  const [fasilitas, setFasilitas] = useState([]);
  const {id, namaklinik} = useParams();

  useEffect(() => {
    const fasiluserByUserId = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/fasilitasklinik/${id}`);
            setFasilitas (response.data);
            //console.log(response.data)
        } catch (error) {
            
        }
    };
    fasiluserByUserId();
},[id]);


  return (
    <div key={fasilitas.UserId}>
      {fasilitas.map((fasilitas)=>(
    <div className="JenisLayananItem" key={fasilitas.namafasilitas}>
          <div className="jlDesc">
        <h1 className="jlTitle">{fasilitas.namafasilitas}</h1>
        <span className="jlSubtitle">
        {fasilitas.deskripsifasilitas}
        </span>
        <div className="jlDetailTexts">
          <a href= {`/listklinik/${id}/${namaklinik}/jadwaldokter/${fasilitas.namafasilitas}`}>
          <button className="jlCheckButton">Pilih Layanan</button>
          </a>
        </div>
      </div>
    </div>
    ))}
    </div>
  );
};

export default JenisLayanan;
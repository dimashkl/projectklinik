import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Layout from "./Layout";

const TambahFasilitas = () => {
  const [namafasilitas, setNamaFasilitas] = useState("");
  const [deskripsifasilitas, setDeskripsiFasilitas] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleOtherValueChange = (e) => {
    setNamaFasilitas(e.target.value);
  };

  const showAlertSubmit = () => {
    confirmAlert({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin ingin menyimpan data ini ?',
    buttons: [
        {
        label: 'Ya',
        onClick: async() => {
          try {
            await axios.post("http://localhost:5000/fasilitas", {
              namafasilitas: namafasilitas,
              deskripsifasilitas: deskripsifasilitas,
            });
            alert("Fasilitas Berhasil Ditambah ^^")
            navigate("/daftarfasilitasadmin");
          } catch (error) {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
          }
        }
        },
        {
        label: 'Tidak',
        onClick: () => {
                navigate("/tambahfasilitas");
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
                navigate("/daftarfasilitasadmin");
        }
        },
        {
        label: 'Tidak',
        onClick: () => {
                navigate("/tambahfasilitas");
            
        }
        }
    ]
    });
};

const fieldKosong = ()=>{
  setMsg("Ada informasi yang belum anda isi, silakan isi semua informasi diminta.")
}

  return (
    <Layout>
    <div style={{position:"absolute", marginTop:"50px"}}>
          <h1 className="title">Input Jenis Layanan</h1>
      <div className="card is-shadowless mx-5" style={{width:"900px"}}>
        <div className="card-content">
          <div className="content">
            <p className="has-text-centered" style={{color:"red"}}>{msg}</p>
              <div className="field">
                <label className="label">Nama Fasilitas</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Fasilitas" value={namafasilitas} onChange={handleOtherValueChange} />
                
                </div>
              </div>
              <div className="field">
                <label className="label">Deskripsi Fasilitas</label>
                <div className="control">
                  <textarea
                    type="text"
                    className="input"
                    value={deskripsifasilitas}
                    onChange={(e) => setDeskripsiFasilitas(e.target.value)}
                    placeholder="Deskripsi Fasilitas"
                  />
                </div>
              </div>
              {
              namafasilitas === "" || deskripsifasilitas === ""  ?
              <div className="field">
                <div className="control">
                  <button type="submit" className='button is-success' onClick={fieldKosong}>Submit</button>
                  <button type="submit" className="button is-danger" onClick={showAlertCancel} style={{marginLeft:"10px"}}>Cancel</button>
                  </div>
                  </div>
                  :
                  <div className="field">
                    <div className="control">
                      <button type="submit" className='button is-success' onClick={showAlertSubmit}>Submit</button>
                      <button type="submit" className="button is-danger" onClick={showAlertCancel} style={{marginLeft:"10px"}}>Cancel</button>
                      </div>
                      </div>
              }
          </div>
        </div>
      </div>      
    </div>
    </Layout>
  );
};

export default TambahFasilitas;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { /*useAsyncError,*/ useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import LangkahDua from "../assets/images/LangkahDua.png"

const InputFasilitas = () => {

    const [namafasilitas, setNamaFasilitas] = useState("");
    const [deskripsifasilitas, setDeskripsiFasilitas] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [cekFasil, setcekFasil] = useState("");
  
    const handleOtherValueChange = (e) => {
      setNamaFasilitas(e.target.value);
    };

    useEffect(()=>{
      getFasil()
    },[]);

    const getFasil = (async()=>{
      const response = await axios.get("http://localhost:5000/fasilitas");
      setcekFasil(response.data.length);
    })

    console.log(cekFasil)
  
    const showAlertSubmit = () => {
      confirmAlert({
      title: 'Konfirmasi',
      message: 'Apakah anda ingin mengisi formulir fasilitas lagi ?',
      buttons: [
          {
          label: 'Ya',
          onClick: async() => {
            try {
              await axios.post("http://localhost:5000/fasilitas", {
                namafasilitas: namafasilitas,
                deskripsifasilitas: deskripsifasilitas,
              });
              alert("Fasilitas Berhasil Ditambah ^^ anda bisa mengedit data ini di halaman dashboard admin")
              navigate("/inputfasilitas");
              window.location.reload();
            } catch (error) {
              if (error.response) {
                setMsg(error.response.data.msg);
              }
            }
          }
          },
          {
          label: 'Tidak',
          onClick: async() => {
            try {
                await axios.post("http://localhost:5000/fasilitas", {
                  namafasilitas: namafasilitas,
                  deskripsifasilitas: deskripsifasilitas,
                });
                alert("Fasilitas Berhasil Ditambah ^^ anda bisa mengedit data ini di halaman dashboard admin")
                navigate("/inputjadwalawal");
              } catch (error) {
              }
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
                  navigate("/cobainputjadwaldokter");
          }
          },
          {
          label: 'Tidak',
          onClick: () => {
                  navigate("/inputfasilitas");
              
          }
          }
      ]
      });
  };

  const fieldKosong = ()=>{
    setMsg("Ada informasi yang belum anda isi, silakan isi semua informasi diminta.")
  }

  return (
    <div style={{height:"125vh"}}>
      <img
            style={{position:"relative", left:"390px", width:"450px", marginTop:"25px"}}
            src={LangkahDua}
            />
          <h1 className="title">Input Jenis Layanan</h1>
      <div className="card is-shadowless mx-5">
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
                        cekFasil === 0 ?
                        <div className="field">
                        {
                            namafasilitas === "" || deskripsifasilitas === ""  ?
                            <div className="control">
                                <button type="submit" className='button is-success' onClick={fieldKosong}>Submit</button>
                            </div>
                            :
                            <div className="control">
                                <button type="submit" className='button is-success' onClick={showAlertSubmit}>Submit</button>
                            </div>
                        }
                    </div>
                    :
                    <div className="field">
                        {
                            namafasilitas === "" || deskripsifasilitas === "" ?
                            <div className="control">
                                <button type="submit" className='button is-success' onClick={fieldKosong}>Submit</button>
                                <button type="submit" className="button is-danger" onClick={showAlertCancel} style={{marginLeft:"10px"}}>Cancel</button>
                            </div>
                            :
                            <div className="control">
                                <button type="submit" className='button is-success' onClick={showAlertSubmit}>Submit</button>
                                <button type="submit" className="button is-danger" onClick={showAlertCancel} style={{marginLeft:"10px"}}> Cancel</button>
                            </div>
                        }
                    </div>
                    }
            
          </div>
        </div>
      </div>      
    </div>
  )
}

export default InputFasilitas

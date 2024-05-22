import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditFasilitas = () => {
  const [namafasilitas, setNamaFasilitas] = useState("");
  const [namafasilitaslain, setNamaFasilitasLain] = useState("");
  const [deskripsifasilitas, setDeskripsiFasilitas] = useState("");
  const [msg, setMsg] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    const getFasilitasById = async () =>{
        try {
            const response = await axios.get(
                `http://localhost:5000/fasilitasbyid/${id}`
            );
            setNamaFasilitas(response.data.namafasilitas);
            setNamaFasilitasLain(response.data.namafasilitaslain);
            setDeskripsiFasilitas(response.data.deskripsifasilitas);
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    };
    getFasilitasById();
}, [id]);

  const updatePoli = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/fasilitas/${id}`, {
        namafasilitas: namafasilitas,
        namafasilitaslain : namafasilitaslain,
        deskripsifasilitas: deskripsifasilitas,
      });
      navigate("/daftarfasilitasadmin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleOptionChange = (e) => {
    const selected = e.target.value;
    setNamaFasilitas(selected);
    if (selected === 'others') {
      setNamaFasilitasLain('');
    }
  };

  const handleOtherValueChange = (e) => {
    setNamaFasilitasLain(e.target.value);
  };

  return (
    <div>
      <h1 className="title">Daftar Fasilitas</h1>
      <div className="card is-shadowless mx-5">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updatePoli}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Fasilitas</label>
                <div className="control">
                <select value={namafasilitas} onChange={handleOptionChange}>
                  <option value="">Select an option</option>
                  <option value="Poli Umum">Poli Umum</option>
                  <option value="Poli Gigi">Poli Gigi</option>
                  <option value="Poli Anak">Poli Anak</option>
                  <option value="others">Fasilitas Lain</option>
                </select>
                {namafasilitas === 'others' && (
                  <input type="text" className="input" placeholder="Nama Fasilitas" value={namafasilitaslain} onChange={handleOtherValueChange} />
                )}
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

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFasilitas;

/*<input
                    type="text"
                    className="input"
                    value={namaFasilitas}
                    onChange={(e) => setNamaFasilitas(e.target.value)}
                    placeholder="Nama Fasilitas"
                  />*/
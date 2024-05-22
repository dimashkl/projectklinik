import React, {useEffect, useState} from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Layout from './Layout';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";

const DataPasienPreview = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
      }, [dispatch]);
    
      useEffect(() => {
        if (isError) {
          navigate("/");
        }
      }, [isError, navigate]);

    useEffect(() => {
        getme();
      }, []);

      const getme = async()=>{
        const response = await axios.get("http://localhost:5000/dynamics");
        const myarr = JSON.parse(response.data[0].pertanyaan);
        setDynamics(myarr);
        }

        const [dynamics, setDynamics] = useState([]);
        const [userAnswer, setUserAnswer] = useState({});
        const {id} = useParams();

        useEffect(()=>{
            const getdataPasienId = async() =>{
                try {
                    const response = await axios.get(`http://localhost:5000/datapasien/${id}`);
                    const myarr = JSON.parse(response.data.data)
                    setUserAnswer (myarr)
                } catch (error) {
                    if(error.response){
                        
                    }
                }
            }
            getdataPasienId();
        },[id]);

        const [data, setData]=useState("");

        useEffect(()=>{
            const dataPasien = async()=>{
                const responses = await axios.get(`http://localhost:5000/datapasien/${id}`);
                setData(responses.data);
            }
            dataPasien();
          }, [id])

        const showAlertDone = () => {
            confirmAlert({
            title: 'Konfirmasi',
            message: 'Apakah anda yakin pasien ini sudah selesai ? jika sudah selesai data pasien ini akan dihapus',
            buttons: [
                {
                label: 'Ya',
                onClick: async() => {
                    await axios.delete(`http://localhost:5000/datapasien/${id}`);
                    navigate("/admin");
                    alert("Pasien sudah selesai, data pasien tersebut sudah dihapus");
                }
                },
                {
                label: 'Tidak',
                onClick: () => {
                        navigate("/datapasien/:id");
                }
                }
            ]
            });
        };      


  return (
    <Layout>
        <div style={{height:"auto"}}>
        <div className="container mx-auto px-4" style={{ marginBottom:"50px"}}>
            <div className="headersign my-4">
                <h2 className='title' style={{textAlign:"center"}}>Data Pasien</h2>
            </div>
            <div className="bg-white shadow-lg p-5 my-10 rounded" style={{marginBottom:"100px"}}>
            {
                        dynamics.map((dynamic) =>{
                            return(
                                <div key={dynamic.id} className="d-flex rounded bg-white px-4">
                                <div>
                                <div className="formlist">
                                <div key={dynamic.label} className="typeinput">
                                    <label>{dynamic.label}</label>
                                </div>
                                </div>

                                <div className='my-4'>
                                    {
                                        dynamic.question_type === 'short_answer' && <input type="text" name={dynamic.label} value={userAnswer[dynamic.label]} className="inputform" disabled/>
                                    }

                                    {
                                        dynamic.question_type === 'paragraph' && <textarea rows={4} name={dynamic.label} value={userAnswer[dynamic.label]} className="inputform" disabled />
                                    }

                                    {
                                        dynamic.question_type === 'multichoice' && 
                                        <select
                                        className="inputform" name={dynamic.label} value={userAnswer[dynamic.label]} disabled>
                                            {dynamic.list.map((item) => <option key={item} value={item}>{item}</option>)}
                                        </select>
                                    }
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
            </div>
            <div className="bg-white shadow-lg rounded" style={{width:"1000px", position:"fixed", top:"550px", left:"300px", padding:"20px 0px"}}>
                <Button style={{marginLeft:"40%"}} onClick={showAlertDone}  className="button is-success">PASIEN SELESAI</Button>
                <Button href='/admin' style={{marginLeft:"10px"}} className="button is-danger">BACK</Button>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default DataPasienPreview
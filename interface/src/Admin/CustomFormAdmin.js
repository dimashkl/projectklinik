import React, {useState ,useEffect} from 'react';
import NavigationBar from './NavigationBar';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Layout from './Layout';

const CustomFormAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    const [dynamics, setDynamics] = useState([]);
    const [contentForm, setContentForm] = useState([]);
    

    useEffect(()=>{
      getDynamics();
      }, []);
    

    const getDynamics = async()=>{
      await axios.get('http://localhost:5000/dynamics').then((res)=>{
          const myarr = JSON.parse(res.data[0].pertanyaan);
          setContentForm(res.data);
          setDynamics(myarr);
          //console.log(res.data);
      });
    };

    const deleteDynamic = async() =>{
        await axios.delete(`http://localhost:5000/dynamics/${contentForm[0].uuid}`).then((res)=>{
            alert('Form berhasil dihapus');
            navigate("/admin");
        })
      }

    useEffect(() => {
        dispatch(getMe());
      }, [dispatch]);
    
      useEffect(() => {
        if (isError) {
          navigate("/");
        }
      }, [isError, navigate]);

  return (
    <Layout>
    <div>
        <div className="container mx-auto px-4" style={{marginTop:"50px", height:"350vh"}}>
            <div className="headersign my-4">
                <h1 className='title' style={{textAlign:"center"}}>Form Pasien Preview</h1>
            </div>
            <div style={{paddingBottom:"50px"}}>
            <div className="field" style={{marginLeft:"45%", marginTop:"-60px"}}>
                <Button type="submit" href="/editcustomform" className='button is-info'>EDIT FORM</Button>
              </div>
            </div>
            <div className="bg-white shadow-lg p-5 my-10 rounded" style={{width:"985px"}}>
            {
                        dynamics.map((dynamic, index) =>{
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
                                        dynamic.question_type === 'short_answer' && <input type="text"  style={{width:"850px"}} className="inputform" placeholder={dynamic.label} disabled/>
                                    }

                                    {
                                        dynamic.question_type === 'paragraph' && <textarea rows={4}  style={{width:"850px"}} className="inputform" placeholder={dynamic.label} disabled/>
                                    }

                                    {
                                        dynamic.question_type === 'multichoice' && 
                                        <select  className="inputform" disabled>
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
        </div>
    </div>
    </Layout>
  )
}

export default CustomFormAdmin
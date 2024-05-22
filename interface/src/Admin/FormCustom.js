import React, {useState, useEffect}from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../style/customform.css';

const FormCustom = () => {

    const [dynamics, setDynamics] = useState([]);

    useEffect(()=>{
      getDynamics();
      }, []);
    

    const getDynamics = async(index)=>{
      await axios.get('http://localhost:5000/dynamics').then((res)=>{
          const myarr = JSON.parse(res.data[0].pertanyaan);
          //console.log(res.data);
          setDynamics(myarr);  
      });
    };


  return (
    <div className='duaBG'>
        <NavBar/>
        <div className="container mx-auto px-4">
            <div className="headersign my-4">
                <h1>Custom Form Pasien Preview</h1>
            </div>
            <div className="bg-white shadow-lg p-5 my-10 rounded">
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
                                        dynamic.question_type === 'short_answer' && <input type="text" className="inputform" placeholder={dynamic.label} />
                                    }

                                    {
                                        dynamic.question_type === 'paragraph' && <textarea rows={4} className="inputform" placeholder={dynamic.label} />
                                    }

                                    {
                                        dynamic.question_type === 'multichoice' && 
                                        <select
                                        className="inputform">
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
  )
}

export default FormCustom
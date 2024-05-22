import React, {useState ,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
//import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
//import { getMe } from "../features/authSlice";
import axios from 'axios';

const FormUser = () => {

    const [dynamic, setDynamic] = useState([]);

  useEffect(()=>{
    getDynamic();
  }, []);

  const getDynamic = async() =>{
    const response = await axios.get('http://localhost:5000/dynamics');
    setDynamic(response.data);
    console.log(response.data);
    }

    /*const deleteDynamic = async(scheduleId) =>{
      await axios.delete(`http://localhost:5000/schedules/${dynamicId}`);
      getDynamic();
    }*/

    /*const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
      }, [dispatch]);
    
      useEffect(() => {
        if (isError) {
          navigate("/");
        }
      }, [isError, navigate]);*/

    return (
        <div className='duaBG'>
        <NavigationBar />
        <div className='juduledit'>
          Jadwal Dokter
        </div>
        <div className="columns mt-1 is-centered">
          <div className="column">
            <form>
              <div className='fields has-addons'>
                <div className='control has-expanded'>
                  <input 
                    type='text'
                    classname='input'
                    placeholder='Find Something Here..'
                    style={{padding:'6px', marginLeft:'50px', width:'1120px', marginBottom:'10px'}}
                  />
                  <button type='submit' className='button is-info'>Search</button>
                </div>
              </div>
            </form>
            <table className='table is-striped' style={{width:'1200px', marginLeft:'50px'}}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Pertanyaan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dynamic.map((dynamics, index)=>(
                  <tr key={dynamics.uuid}>
                    <td>{index + 1}</td>
                    <td>{dynamics.pertanyaan}</td>
                    <td>
                      <Button style={{marginLeft:'5px'}}>Edit</Button>
                      <Button style={{marginLeft:'5px'}} variant='danger'>Delete</Button>
                    </td>
                </tr>
                ))}
                
          </tbody>
              </table>
              <Button style={{marginLeft:'50px'}} href='/tambahjadwaldokter'>Add New Data</Button>
        </div>
        </div>
    </div>
    )
}

export default FormUser

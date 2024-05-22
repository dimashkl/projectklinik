import React, {useEffect, useState} from 'react';
import NavigationBar from './NavigationBar';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from 'axios';
import { NavLink } from 'react-bootstrap';

const BookingData = () => {
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
        const response = await axios.get("http://localhost:5000/datapasien");
        setDataPasien(response.data);
      }




  return (
    <div className='duaBG'>
      <NavigationBar />
        <div className="container mx-auto px-4">
          <div className="headersign my-4" style={{textAlign:"center"}}>
            <h1>Data Pasien</h1>
          </div>  
          {dataPasien.map((field)=>{
            const response = JSON.parse(field.data);
            console.log(field)

            return(
              <div className="bg-white shadow-lg p-3 my-10 rounded" style={{marginTop:"20px"}}>
                <div style={{marginTop:"10px"}}>
                  <table className='table'>
                    <tbody>
                      <tr key={field.id}>
                      <td><text><strong>{response.Nama}</strong></text></td>
                      <td style={{textAlign:"right"}}><text>{field.createdAt}</text></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <NavLink style={{paddingLeft:"980px", color:"blue"}}> lihat details </NavLink>
            </div>
            )
          })}        
        </div>
    </div>
  )
}

export default BookingData;
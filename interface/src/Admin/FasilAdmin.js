import React, {useEffect} from 'react';
import NavigationBar from './NavigationBar';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const FasilAdmin = () => {
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
        <div className='juduledit'>
          Fasilitas
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
                    <th>Nama Fasilitas</th>
                    <th>Jadwal Fasilitas</th>
                    <th>Buka Pukul</th>
                    <th>Tutup Pukul</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{1}</td>
                    <td>Ruang Farmasi</td>
                    <td>Senin-Sabtu</td>
                    <td>09.00</td>
                    <td>20.00</td>
                    <td>
                      <Button variant='primary'>Edit</Button>
                      <Button style={{marginLeft:'5px'}} variant='danger'>Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Rawat Inap</td>
                    <td>Senin-Minggu</td>
                    <td>24 jam</td>
                    <td>-</td>
                    <td>
                      <Button variant='primary'>Edit</Button>
                      <Button style={{marginLeft:'5px'}} variant='danger'>Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Radiologi</td>
                    <td>Senin-Jumat</td>
                    <td>10.00</td>
                    <td>17.00</td>
                    <td>
                      <Button variant='primary'>Edit</Button>
                      <Button style={{marginLeft:'5px'}} variant='danger'>Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Ambulance</td>
                    <td>Senin-Minggu</td>
                    <td>24 Jam</td>
                    <td>-</td>
                    <td>
                      <Button variant='primary'>Edit</Button>
                      <Button style={{marginLeft:'5px'}} variant='danger'>Delete</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button style={{marginLeft:'50px'}} href='/customform'>Masukan Fasilitas Baru</Button>
        </div>
        </div>
    </div>
  )
}

export default FasilAdmin
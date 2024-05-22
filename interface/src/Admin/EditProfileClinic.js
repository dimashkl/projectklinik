import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditProfileClinic = () => {
const [Name, setName] = useState("");
const [Address, setAddress] = useState("");
const [Phone, setPhone] = useState("");
const [Email, setEmail] = useState("");
const [Time, setTime] = useState("");
const navigate = useNavigate();

const {id} = useParams();

useEffect(()=>{
    getProfileClinicById();
}, []);

const updateProfileClinic = async (e) => {
    e.preventDefault();
    try{
        await axios.patch(`http://localhost:5000/profileklinik/${id}`,{
            Name,
            Address,
            Phone,
            Email,
            Time
        });
        navigate("/profileclinic");
    } catch (error) {
        console.log(error);
    }
};

  const getProfileClinicById = async () =>{
    const response = await axios.get(`http://localhost:5000/profileklinik/${id}`);
    setName(response.data.Name);
    setAddress(response.data.Address);
    setPhone(response.data.Phone);
    setEmail(response.data.Email);
    setTime(response.data.Time);
  } 

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half"></div>
        <form onSubmit={updateProfileClinic}>
            <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                    <input 
                    type="text" 
                    className="input" 
                    value={Name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder='Name'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Address</label>
                <div className='control'>
                    <input 
                    type="text"
                    className="input" 
                    value={Address}
                    onChange={(e)=> setAddress(e.target.value)}
                    placeholder='Address'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Phone</label>
                <div className='control'>
                    <input 
                    type="text"
                    className="input" 
                    value={Phone}
                    onChange={(e)=> setPhone(e.target.value)}
                    placeholder='Phone'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Email</label>
                <div className='control'>
                    <input 
                    type="text"
                    className="input" 
                    value={Email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder='Email'/>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Time</label>
                <div className='control'>
                    <input 
                    type="text"
                    className="input" 
                    value={Time}
                    onChange={(e)=> setTime(e.target.value)}
                    placeholder='Time'/>
                </div>
            </div>
            <div className='field'>
                <button type="submit" className='button is-success'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default EditProfileClinic
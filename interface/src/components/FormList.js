import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const FormList = () => {
const [users,setUser] = useState([]);

useEffect(()=>{
  getUser();
}, []);

const getUser = async () => {
  const response = await axios.get('http://localhost:5000/users');
  setUser(response.data);
}

  return (
    <div className="columns mt-5 is-centered">
      <div className="column">
        <Button href='/customform'>Add New</Button>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama</th>
              <th>Tanggal Lahir</th>
              <th>Domisili</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>RT</th>
              <th>RW</th>
              <th>Kelurahan</th>
              <th>Kecamatan</th>
              <th>Agama</th>
              <th>Status</th>
              <th>Pekerjaan</th>
              <th>Kewarganegaraan</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nik}</td>
                  <td>{user.nama}</td>
                  <td>{user.tanggalLahir}</td>
                  <td>{user.domisili}</td>
                  <td>{user.jenisKelamin}</td>
                  <td>{user.alamat}</td>
                  <td>{user.RT}</td>
                  <td>{user.RW}</td>
                  <td>{user.kelurahan}</td>
                  <td>{user.kecamatan}</td>
                  <td>{user.agama}</td>
                  <td>{user.status}</td>
                  <td>{user.pekerjaan}</td>
                  <td>{user.kerwarganegaraan}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FormList;
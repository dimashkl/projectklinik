import React, { useEffect, useState } from "react";
import Layout from "./Layout.js";
//import Admin from "./MainContentAdmin.js";
import BookData from "../Admin/BookData.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState("");
  const [fasil, setFasil] = useState("");
  const [dokter, setDokter] = useState("");
  const [dynamics, setDynamics] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);


  useEffect(()=>{
    const getProfileData = (async () =>{
        await axios.get("http://localhost:5000/profilefaskes").then((res)=>{
            setProfile(res.data.length);
        });
      });
    getProfileData();

    const getFasilitasData = (async() => {
      await axios.get("http://localhost:5000/fasilitas").then((res)=>{
      setFasil(res.data.length);
      });
    });
    getFasilitasData();

    const getDokterData = (async() => {
      await axios.get("http://localhost:5000/jadwaldokter").then((res)=>{
      setDokter(res.data.length);
      });
    });
    getDokterData();

    const getDynamicData = (async() => {
      await axios.get("http://localhost:5000/dynamics").then((res)=>{
      setDynamics(res.data.length);
      });
    });
    getDynamicData();
    alert('Anda telah berhasil melakukan login! Selamat Datang!');

  },[]);

  /*const handleLogin = () => {
    // Proses login
    // Jika login berhasil, set showLoginAlert menjadi true
    //setShowLoginAlert(true);
    alert('Anda telah berhasil melakukan login! Selamat Datang!');
  };*/

  const showAlertInfo = () => {
    confirmAlert({
    title: 'Informasi',
    message: 'Anda belum memiliki profile klinik, silakan isi terlebih dahulu profile klinik anda',
    buttons: [
        {
        label: 'Baik',
        onClick: () => {
                navigate("/inputprofileklinik");
        }
        }
    ]
    });
};

const showAlertFasil = () => {
  confirmAlert({
  title: 'Informasi',
  message: 'Anda belum memasukan fasilitas klinik anda, silakan isi terlebih dahulu fasilitas klinik anda',
  buttons: [
      {
      label: 'Baik',
      onClick: () => {
              navigate("/inputfasilitas");
      }
      }
  ]
  });
};

const showAlertDokter = () => {
  confirmAlert({
  title: 'Informasi',
  message: 'Anda belum memasukan dokter dan jadwal dokter, silakan isi terlebih dahulu dokter dan jadwal dokter klinik anda',
  buttons: [
      {
      label: 'Baik',
      onClick: () => {
              navigate("/inputjadwalawal");
      }
      }
  ]
  });
};

const showAlertDynamic = () => {
  confirmAlert({
  title: 'Informasi',
  message: 'Anda belum membuat formulir pendaftaran untuk pasien, silakan isi terlebih dahulu formulir pendaftaran untuk klinik anda',
  buttons: [
      {
      label: 'Baik',
      onClick: () => {
              navigate("/inputcustomform");
      }
      }
  ]
  });
};

  if (profile === 0) {
    showAlertInfo();
    // navigate("/inputprofilefaskes")
  } else if (fasil === 0) {
    showAlertFasil();
    //navigate("/tambahfasilitas")
  } else if (dokter === 0){
    showAlertDokter();
    // navigate("/tambahjadwaldokter")
  } else if (dynamics === 0){
    showAlertDynamic();
    // navigate("/customform")
  }

  return (
    <Layout>
      <BookData/>
      <Modal show={showLoginAlert} onHide={() => setShowLoginAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Anda telah berhasil login!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowLoginAlert(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Dashboard;

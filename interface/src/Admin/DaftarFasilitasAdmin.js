import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from "axios";
//import NavigationBar from "./NavigationBar";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { confirmAlert } from "react-confirm-alert";

const FasilitasList = () => {

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


  const [fasilitas, setFasilitas] = useState([]);

  useEffect(() => {
    getFasilitas();
  }, []);

  const getFasilitas = async () => {
    const response = await axios.get("http://localhost:5000/fasilitas");
    setFasilitas(response.data);
  };

  /*const deleteProduct = async (fasilitasId) => {
    await axios.delete(`http://localhost:5001/fasilitas/${fasilitasId}`);
    getFasilitas();
  };*/

  const showAlertDelete = (fasilitasId) => {
    confirmAlert({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin akan menghapus data ini ?',
    buttons: [
        {
        label: 'Ya',
        onClick: async() => {
          await axios.delete(`http://localhost:5000/fasilitas/${fasilitasId}`);
          getFasilitas();
          navigate("/daftarfasilitasadmin");
        }
        },
        {
        label: 'Tidak',
        onClick: () => {
                navigate("/daftarfasilitasadmin");
            
        }
        }
    ]
    });
};

  return (
    <Layout>
      <div style={{marginLeft:"20px"}}>
    <Container>
    <div style={{marginTop:"100px"}}>
      <h1 className="title">List Jenis Layanan</h1>
      <h2 className="subtitle">list</h2>
      <Link to="/tambahfasilitas" className="button is-primary mb-2">
        Add New
      </Link>
    </div>
      <Row style={{width:"1100px"}}>
        {fasilitas.map((fasilitas) => {
          // console.log(fasilitas.uuid);
          const nama = fasilitas.namafasilitas;
          const newLocal = (4, 3);
          return(
            <Col md={newLocal} key={fasilitas.uuid}>
            <Card style={{marginTop:"10px"}}>
              <Card.Img variant="top" src={fasilitas.image} />
              <Card.Body>
                {nama === "others" ? (
                  <Card.Title>{fasilitas.namafasilitasLain}</Card.Title>
                ):
                (
                  <Card.Title>{fasilitas.namafasilitas}</Card.Title>
                )
              }
                <Card.Text>{fasilitas.deskripsifasilitas}</Card.Text>
                <Link
                  to={`/editfasilitas/${fasilitas.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => showAlertDelete(fasilitas.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </Card.Body>
            </Card>
          </Col>
          )
        })}
      </Row>
    </Container>

    </div>
    </Layout>
  );
};

export default FasilitasList;

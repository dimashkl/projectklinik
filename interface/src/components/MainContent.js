import {Container, Row, Col, Button } from "react-bootstrap"
import "../style/maincontent.css"
import homecarelogo from "../assets/images/homecarelogo.png"
import vaccinelogo from "../assets/images/vaccinelogo.png"
import lablogo from "../assets/images/lablogo.png"
import poliumumlogo from "../assets/images/poliumumlogo.png"
import covidtestlogo from "../assets/images/covidtestlogo.png"
import poligigilogo from "../assets/images/poligigilogo.png"
import ibuanaklogo from "../assets/images/ibuanaklogo.png"
import konsuldoklogo from "../assets/images/konsuldoklogo.png"


const MainContent = () => {

  const card1 = "homecare";
  const card2 = "laboratorium";
  const card3 = "poli umum";
  const card4 = "tes covid";
  const card5 = "poli gigi";
  const card6 = "ibu dan anak";
  const card7 = "vaccine";
  const card8 = "farmasi";

    return (
      <div className="allbgmain">
      <div className="bgmain">
      {/* <h1>LAYANAN PALING DICARI</h1> */}
      <Container>
        <Row className="crdWrapper mx-auto"  >
        <Col md={3} className="cardWrapper">
        <a href={`/listklinik/${card1}`} >
        <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={homecarelogo} align="center" width={100} height={50} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">HOMECARE</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>

        <Col md={3} className="cardWrapper">
        <a href={`/listklinik/${card7}`} >
        <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={vaccinelogo} align="center" width={100} height={70} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">VACCINE</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>

        <Col md={3} className="cardWrapper">
        <a href={`/listklinik/${card2}`} >
          <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={lablogo} align="center" width={100} height={50} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">LABORATORIUM</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>

        <Col md={3} className="cardWrapper">
          <a href={`/listklinik/${card3}`} >
          <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={poliumumlogo} align="center" width={100} height={50} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">POLI UMUM</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>
      </Row>

      <Row className="crdWrapper mx-auto">
      <Col md={3} className="cardWrapper">
      <a href={`/listklinik/${card4}`} >
        <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={covidtestlogo} align="center" width={100} height={50} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">TEST COVID</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>

        <Col md={3} className="cardWrapper">
        <a href={`/listklinik/${card5}`} >
          <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={poligigilogo} align="center" width={100} height={50} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">POLI GIGI</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>

        <Col md={3} className="cardWrapper">
        <a href={`/listklinik/${card6}`} >
          <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={ibuanaklogo} align="center" width={100} height={50} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">IBU & ANAK</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>

        <Col md={3} className="cardWrapper">
        <a href={`/listklinik/${card8}`} >
          <Button className="d-flex my-5 mx-auto">
          <div class="card" style={{width : "10rem"}}>
            <img src={konsuldoklogo} align="center" width={100} height={50} alt=""/>
            <div class="card-body">
              <p class="card-text text-center">FARMASI</p>
              </div>
          </div>
          </Button>
          </a>
        </Col>
      </Row>
      </Container>
      </div>
      </div>
    )
}

export default MainContent

/*<div> 
        <Container>
          <Row>
            <Col md={3} className="cardWrapper">
            <Card className="cardImage text-dark text-center">
              <Card.Img variant="top" src={cardSatu} />
              <Card.Body>
                <Card.Title className="text-center">Vaccine</Card.Title>
                <Button variant="primary" href="/vaccine">Go</Button>
              </Card.Body>
            </Card>
            </Col>
            <Col md={3} className="cardWrapper">
            <Card className="cardImage text-dark text-center">
              <Card.Img variant="top" src={cardDua} />
              <Card.Body>
                <Card.Title className="text-center">Schedule</Card.Title>
                <Button variant="primary" href="/schedule">Go</Button>
              </Card.Body>
            </Card>
            </Col>
            <Col md={3} className="cardWrapper">
            <Card className="cardImage text-dark text-center">
              <Card.Img variant="top" src={cardTiga} />
              <Card.Body>
                <Card.Title className="text-center">Article</Card.Title>
                <Button variant="primary" href="/article">Go</Button>
              </Card.Body>
            </Card>
            </Col>
            <Col md={3} className="cardWrapper">
            <Card className="cardImage text-dark text-center">
              <Card.Img variant="top" src={cardEmpat} />
              <Card.Body>
                <Card.Title className="text-center">Marketplace</Card.Title>
                <Button variant="primary" href="/marketplace">Go</Button>
              </Card.Body>
            </Card>
            </Col>
            <br/>
            
            <Card md={12} className="cardWrapper2">
              <Card.Img variant="bottom" src="holder.js/100px180" />
            </Card>
            <br/>

            <Card md={12} className="cardWrapper2">
              <Card.Img variant="bottom" src="holder.js/100px180" />
            </Card>
            <br/>

            <Card md={12} className="cardWrapper2">
              <Card.Img variant="bottom" src="holder.js/100px180" />
            </Card>
            <br/>

            <Card md={12} className="cardWrapper2">
              <Card.Img variant="bottom" src="holder.js/100px180" />
            </Card>
            <br/>

            
          </Row>
        </Container>
      </div>*/

      /*<div className="komitmen">
        <Container>
        <Row>
        <Col md={6} className="cardWrapperkomit">
        <p className="judulkomit">Komitmen Kami</p>
        <p>
        Menyediakan informasi lengkap dan kemudahan untuk masyarakat dalam hal pelayanan kesehatan, 
        juga menyediakan platform untuk penyedia pelayanan kesehatan untuk menjangkau masyarakat sekitarnya.
        </p>
        </Col>

        <Col md={6} className="cardWrapperkomit">
        <div className="komitfoto">
          <img src={komitmenfoto} align="center" width={500} height={10} alt=""/>
        </div>
        </Col>
        </Row>
        </Container>

      </div>*/

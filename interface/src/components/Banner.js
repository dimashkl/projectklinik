import "../style/maincontent.css"
import Carousel from 'react-bootstrap/Carousel';
import {Container, Row} from 'react-bootstrap';
//import firstmed from "../assets/images/firstmedika.png"
//import slideSatu from "../assets/images/slideSatu.png"
//import slideDua from "../assets/images/slideDua.png"
//import slideTiga from "../assets/images/slideTiga.png"
//import banner from "../assets/images/banner.png"
import ColCard from "../components/ColCard.js";
//import Item from "../components/Item.js";


const Banner = () => {
        return (
          <div className="banner" style={{background:"#336699", width:"100%", height:"350px"}}>
          <Carousel style={{display:"flex", position:"relative", top:"50px", height:"300px", width:"100%"}}>
            <Carousel.Item>
              <div style={{textAlign:"center"}}>
                    <h2 style={{color:"white", fontWeight:"700", marginBottom:"30px"}}>Poli Umum Rekomendasi</h2>
              </div>
              <Container>
                <Row>
                  <ColCard/>
                  <ColCard/>
                  <ColCard/>
                </Row>
              </Container>
            </Carousel.Item>

            <Carousel.Item>
              <div style={{textAlign:"center"}}>
                    <h2 style={{color:"white", fontWeight:"700", marginBottom:"30px"}}>Poli Umum Rekomendasi</h2>
              </div>
              <Container>
                <Row>
                  <ColCard/>
                  <ColCard/>
                  <ColCard/>
                </Row>
              </Container>
            </Carousel.Item>

            <Carousel.Item>
              <div style={{textAlign:"center"}}>
                    <h2 style={{color:"white", fontWeight:"700", marginBottom:"30px"}}>Poli Umum Rekomendasi</h2>
              </div>
              <Container>
                <Row>
                  <ColCard/>
                  <ColCard/>
                  <ColCard/>
                </Row>
              </Container>
            </Carousel.Item>
          </Carousel>
          </div>
          
        );
      }
      
export default Banner

/*<div className="banner">
          <Carousel className='carousel active img-fluid'>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slideSatu}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block mw-100"
                src={slideDua}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item style={{position:"relative", display:"flex", }}>
              <div style={{background:"red"}}>
                <a href="/faskes">
                <button>Coba Carousel</button>
                </a>
              </div>
            </Carousel.Item>
          </Carousel>
          </div>*/

          /*<Card.Title>Card 1</Card.Title>
                        <Card.Text>
                          This is the first card.
                        </Card.Text>*/

/*<label style={{width:"50px",color:"white",textAlign:"center",borderRadius:"5px", background:"green"}}>OPEN</label>*/
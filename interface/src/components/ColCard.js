import {Button, Card, Col} from 'react-bootstrap';
import firstmed from "../assets/images/firstmedika.png"
//import "../style/searchItem.css"

const ColCard =() =>{
    return(
      <Col>
      <Card>
        <Card.Body className="cardboddybanner" style={{ height:"166px", width:"357px"}}>
        <img style={{position:"absolute", width:"135px", height:"135px"}}
          src = {firstmed}
          alt = ""
         />
         <div style={{position:"absolute", left:"160px" }}>
         <h1 className="siTitle">First Medika</h1>
         <h1 style={{fontSize:"16px", color:"#959798", marginTop:"-10px"}}>Klinik</h1>
         <span className="siSubtitle" style={{position: "absolute", display: "flex", width:"200px", marginTop:"-10px"}}>
          Soreang, Kabupaten Bandung
          </span>
          <label 
          style={{width:"50px",color:"white",textAlign:"center",borderRadius:"5px", background:"green", marginTop:"10px"}}>OPEN
          </label>
         </div>
          <div style={{position: "absolute", display: "flex", left:"246px", top:"115px"}}>
          <Button href="/listklinik">Pilih Klinik</Button>
          </div>
        </Card.Body>
      </Card>
      </Col>
    )
}

export default ColCard;
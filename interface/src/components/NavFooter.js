import "../style/footer.css"
import logo from '../assets/images/logo.png';
import { Container, Row, Col } from "react-bootstrap";

const NavFooter = () => {
    return (
    <div className="copyright">
    <footer className="text-center text-lg-start bg-dark text-muted">
        <Container>
            <Row>
                <Col>
                <section>
                <div style={{marginTop:"25px"}}>
                    <div>
                        <div className="" style={{position:"relative", left:"600px"}}>
                            <img src={logo} alt="" width={100} height={50}/>
                        </div>
                        <div className="text-center p-4">
                    © 2021 Copyright:
                    <p className="text-reset fw-bold">Muhammad Dimas Haikal, First Trina Vaneza, Kristian</p>
                    </div>
                        
                    </div>
                </div>
                </section>
                </Col>
        </Row>
        </Container>

    </footer>
    </div>
    )
}

export default NavFooter
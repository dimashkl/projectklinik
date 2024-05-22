import { Container, Row, Col } from "react-bootstrap"

const Intro = () => {
    return (
        <div className="intro">
            <Container className="text-white d-flex justify-content-center
            align-items-center">
                <Row>
                    <Col>
                        <div className="judul">BOOK NOW</div>
                        <div className="judul">FOR FREE</div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Intro
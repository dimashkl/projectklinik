import React, {useState ,useEffect} from 'react';
import "../style/searchItem.css";
//import logofirstmed from "../assets/images/firstmedika.png";
//import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import moment from 'moment';
import { useParams } from 'react-router-dom';

const SearchItem = () => {
  const [profilefaskes, setProfileFaskes] = useState([]);
  const {namafasil} = useParams()
  const [fasilitas, setFasilitas] = useState([]);
  const [search, setSearch] = useState(namafasil || "");
  const [merge, setMerge] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentTime, setCurrentTime] = useState(moment());


  useEffect(()=>{
    getProfileFaskes();
    getfasilitas();
  }, []);

  const getProfileFaskes = async() =>{
    const response = await axios.get('http://localhost:5000/userprofilefaskes');
    setProfileFaskes (response.data);
    //console.log(response.data) 
    //console.log(daysArray)
    }

    const getfasilitas = async() =>{
      const response = await axios.get('http://localhost:5000/mefasilitas');
      setFasilitas(response.data);
      //console.log(response.data);
    } 

    const [data, setData] = useState("");
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const APIkey = "959f6bf141f12c5c56a2745fd988a27b";

    useEffect(()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        //console.log(position.coords)
      });
    },[]);

    useEffect(()=>{
      if (lat && long) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}&units=metric`
        )
         .then((response) => response.json())
        .then((data) => setData(data));
      }
    },[lat, long]);

    console.log(data.name)

    useEffect(()=>{
      const merged = profilefaskes.map((prof)=>{
        const namafasilitas = fasilitas.filter((poli)=>poli.userId === prof.userId).map((poli)=>poli.namafasilitas);
        return{
          userId: prof.userId,
          name: prof.name,
          days: prof.days,
          url: prof.url,
          jenisFaskes: prof.jenisFaskes,
          kecamatan: prof.kecamatan,
          kota: prof.kota,
          namafasilitas: namafasilitas,
        };
      });
      setMerge(merged);
    },[profilefaskes, fasilitas]);

    //console.log(merge)

    useEffect(()=>{
      const filtered1 = merge.filter((item) =>{
        const profilematched = item.name.toLowerCase().includes(search.toLowerCase());
        const fasil = item.namafasilitas.some((namafasilitas) => namafasilitas.toLowerCase().includes(search.toLowerCase()))
        return profilematched || fasil
      });
      setFiltered(filtered1)
    }, [merge, search])

    //console.log(merge)
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(moment());
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);

    console.log(filtered)

    const fiterLok = filtered.filter((item) => data.name && item.kota.toLowerCase().includes(data.name.toLowerCase()));
    


   return (
    <div>
            <Form className="d-flex w-50 my-5 mx-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{position:"absolute",width:"700px", marginLeft:"-100px"}}/>
            </Form>

            <Container style={{marginTop:"100px"}}>

              {filtered.length === 0 ?(
                <h1 style={{marginBottom:"114px", paddingTop:"33px", textAlign:"center", color:"gray", fontSize:"30px"}}>"{search}" {<br/>} tidak ditemukan</h1>
              ):(
                fiterLok.map((data) =>{
                  const myarr = JSON.parse(data.days);
                  const myarr2 = JSON.parse(myarr)
                  //console.log(data.kota)
                  //console.log(myarr2)
                  const today = new Date().toLocaleDateString('id', { weekday: 'long' });
  
                  const clinicToday = myarr2.find(hari => hari.day === today);
                  //console.log(clinicToday)
  
                  function isClinicOpen(day) {
                    const openingTime = moment(day.openingTime, 'HH:mm');
                        const closingTime = moment(day.closingTime, 'HH:mm');
                        const currentTimeFormatted = moment(currentTime.format('HH:mm'), 'HH:mm');
                    if ((day.day === today && day.isOpen)  && currentTimeFormatted.isBetween(openingTime, closingTime)) {
                     //console.log(!day.isOpen);
                    return true;
                    }
                    return false;
                  }
                  
                 //const clinicDays = days.map(isClinicOpen);
                 //console.log(clinicDays)
  
                  return(
                    <Row key={data.userId}>
                    <Col>
                      <div className="searchItem" style={{background:"white"}}>
                        <figure className='image is-96x96'>
                        <img
                          src = {data.url}
                          alt = "logo_faskes"
                        />
                        </figure>
                        <div className="siDesc">
                          <h1 className="siTitle">{data.name}</h1>
                          <div style={{marginTop:"-16px", marginBottom:"7px", width:"700px"}}>
                            {data.namafasilitas.map((fasil)=>(
                              <span className="border rounded" style={{padding:"2px 5px", background:"#28a4fc", color:"white", fontWeight:"bold", width:"fit-content", marginRight:"3px", fontSize:"12px"}}>{fasil}</span>
                            ))}
                          </div>
                          <h1 className="sijenisTitle">{data.jenisFaskes}</h1>
                          <span className="siSubtitle"> 
                            {`${data.kecamatan}, ${data.kota}`}
                          </span>
                        </div>
  
                        {clinicToday && isClinicOpen(clinicToday) ? (
                        <label 
                        style={{position:"absolute",left:"900px",padding:"5px",width:"70px",color:"white",textAlign:"center",borderRadius:"5px", background:"green"}}>
                         OPEN
                         </label>
                         ) : (
                         <label
                         style={{position:"absolute",left:"900px",padding:"5px",width:"70px",color:"white",textAlign:"center",borderRadius:"5px", background:"red"}}>
                          CLOSED
                          </label>
                      )} 
    
                        <div className="siDetails" style={{marginTop:"80px"}}>
                          <div className="siDetailTexts">
                            <a href={`listklinik/${data.userId}/${data.name}`}>
                            <Button className="siCheckButton">Lihat Klinik</Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
              </Row>
                  )
                })
              )}
            
        </Container>
          </div>
  );
};

export default SearchItem;
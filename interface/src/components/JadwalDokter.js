import "../style/jadwaldokter.css"
import {Collapse, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import NavBar from "./NavBar";

const JadwalDokter = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
        
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedShift, setSelectedShift] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const [isOpenPagi, setIsOpenPagi] = useState(true)
    const [isOpenSiang, setIsOpenSiang] = useState(true)
    const [isOpenMalam, setIsOpenMalam] = useState(true)
    const [isEnter, setIsEnter] = useState({});
    
    const [open, setOpen] = useState({});
    const {id,namaklinik ,namapoli} = useParams();
    const fasil = {namapoli};

    
    const minggu = [
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
        { day:"", date:new Date(), check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "", jamBerakhirPraktikPagi: "", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "", jamBerakhirPraktikSiang: "", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "", jamBerakhirPraktikMalam: ""},
    ];


    const [jadwalpraktikdokter, setJadwalPraktikDokter] = useState([minggu]);
    const [jadwalDokter, setJadwalDokter] = useState([]);

    useEffect(()=>{
      const getJadwalDokter = async() =>{
        const response = await axios.get(`http://localhost:5000/jadwaldokteruser/${id}`);
        if (response.data.length === 0) {
          setJadwalPraktikDokter({ day:"", date:"OFF", check: false, shiftPagi:"Pagi", checkshiftPagi: false, jamMulaiPraktikPagi: "OFF", jamBerakhirPraktikPagi: "OFF", shiftSiang:"Siang", checkshiftSiang: false,  jamMulaiPraktikSiang: "OFF", jamBerakhirPraktikSiang: "OFF", shiftMalam:"Malam", checkshiftMalam: false, jamMulaiPraktikMalam: "OFF", jamBerakhirPraktikMalam: "OFF"});
          return;
          }
        setJadwalDokter(response.data);
        setJadwalPraktikDokter(response.data);
        }
        getJadwalDokter();
      }, [id]);

        const toggle1 = ((index) =>{
            setOpen({
                ...open,
                [index]: !open[index]
            });
                toggle(index);
        });

        const toggleDokter = ((index) => {
          // Menutup semua button selain button yang ditekan
          const newIsEnter = {};
          Object.keys(isEnter).forEach((closed) => {
            newIsEnter[closed] = false;
          });
          // Membuka button yang ditekan
          newIsEnter[index] = true;
          setIsEnter(newIsEnter);
          newIsEnter[index] = !isEnter[index];
          setIsEnter(newIsEnter);
        });

        const toggle = ((day) => {
            // Menutup semua button selain button yang ditekan
            const newIsOpen = {};
            Object.keys(isOpen).forEach((closed) => {
              newIsOpen[closed] = false;
            });
            // Membuka button yang ditekan
            newIsOpen[day] = true;
            setIsOpen(newIsOpen);
          });

          const toggleShift = ((pagey) =>{
            setIsOpenPagi({
                ...open,
                [pagey]: !open[pagey]
            });
        });

        const toggleShiftSiang = ((siang) =>{
          setIsOpenSiang({
              ...open,
              [siang]: !open[siang]
          });
      });

      const toggleShiftMalam = ((malam) =>{
        setIsOpenMalam({
            ...open,
            [malam]: !open[malam]
        });
    });

    const [clickCount, setClickCount] = useState([]);
  const maxClicks = 5;

  // Fungsi untuk menyimpan data klik ke localStorage
  const saveClickCountToLocalStorage = (count) => {
    localStorage.setItem('clickCount', count.toString());
  };

  // Fungsi untuk mengambil data klik dari localStorage
  const getClickCountFromLocalStorage = () => {
    const count = localStorage.getItem('clickCount');
    return count ? parseInt(count, 10) : 0;
  };

  useEffect(() => {
    // Ambil data clickCount dari localStorage saat komponen dimuat
    const initialClickCount = getClickCountFromLocalStorage();
    setClickCount(initialClickCount);
  }, []);

  const handleClick = (i) => {
    const updatedCount = clickCount + 1;
    setClickCount(updatedCount);

    // Simpan data klik yang terbaru ke localStorage
    saveClickCountToLocalStorage(updatedCount);
  };

const handleReset = () => {
  // Reset data klik ke 0 dan hapus dari localStorage
  setClickCount(0);
  saveClickCountToLocalStorage(0);
  };

          //console.log(jadwalDokter)
    return(
      <div>
        <NavBar/>
        <div className="bodytableJadwal">
          {jadwalDokter.filter((list) => list.poli.toLowerCase() === fasil.namapoli.toLowerCase()).map((data, index) => {
            const jadwalpraktik = JSON.parse(data.jadwalpraktikdokter);
            const jpraktik = JSON.parse(jadwalpraktik);
            const jp = JSON.parse(jadwalpraktik);
            //console.log(jadwal)
            function handleHourButtonClick  (hour, hari, date) {
              // Menghandle aksi ketika tombol jam ditekan
              //navigate(`/listklinik/${id}/${namaklinik}/jadwaldokter/${namapoli}/userform/${data.namaDokter}/${hari}/${date}/${hour}`)
              console.log('Jam yang dipilih:', hour);
              // Lakukan aksi lainnya sesuai kebutuhan
            };
            return(
                <div style={{position:"relative", top:"-200px", marginLeft:"-80px"}} key={index}>
                    <button className="dokterbutton"
                    style={{zIndex:"1"}}
                onClick={() => toggleDokter(index)}
                aria-controls="collapsebar"
                aria-expanded={isEnter}
                >
                    <div className="profiledokter">
                    <h2>{data.namaDokter}</h2>
                    <h3>Dokter {data.poli}</h3>
                    <div className="control" key={jadwalDokter}>
                                    <figure className='image is-96x96'>
                                    <img style={{marginTop:"25px",width:"96px", height:"96px"}}
                                    src = {data.url}
                                    alt = ""
                                    />
                                </figure>
                                    </div>
                    </div>
                </button>

                    <Collapse in={isEnter[index]} className="collapseJadwal">
                    <div id="collapsebar" >
                        {jpraktik.filter((hari)=> hari.day !== "").map((hari, day) => {
                            return(
                                <div key={index} className="haributton" >
                                    <button
                                    aria-controls="collapsehari"
                                    color="is-primary"
                                    onClick={() => {
                                        setSelectedDay(day);
                                        toggle(day);
                                      }}>{hari.day},<br></br>{hari.date}</button>
                                </div>
                            )
                        })}
                        {jp.map((hari,day) => {
                          const mulaiPagi = hari.checkshiftPagi === true ? parseInt(hari.jamMulaiPraktikPagi.split(':')[0]) : " "
                          const selesaiPagi = hari.checkshiftPagi === true ? parseInt(hari.jamBerakhirPraktikPagi.split(':')[0]) : ""
                          const clickCountMap = {};
                          const jamPagi = [];
                          //console.log(endHour)
                          //let isFirstHour = true;
                          for (let i = mulaiPagi; i <= selesaiPagi; i++) {
                              // if (!clickCountMap[i]) {
                              //   // Jika belum, inisialisasi nilai klik menjadi 0
                              //   clickCountMap[i] = 0;
                              // }
                            
                              // // Cek apakah jumlah klik sudah mencapai 5
                              // const isDisabled = clickCountMap[i] >= 5;
                              jamPagi.push(
                             
                                  <button style ={{marginRight:"35px", marginLeft:"50px"}}
                                  key={i}
                                  onClick={() => handleClick(i, hari.day, hari.date)} disabled={clickCount >= maxClicks}
                                  // className={isDisabled ? 'red-button' : ''}
                                  // onClick={() => {
                                  //   if (!isDisabled) {
                                  //     handleHourButtonClick(i, hari.day, hari.date);
                                  //     clickCountMap[i] += 1;
                                  //   }
                                  // }}
                                >
                                  {i < 10 ? '0' + i + ':00' : i + ':00' }
                                </button>
                                
                              );
                              //isFirstHour = false;
                            }
                            console.log(clickCountMap);
                            const mulaiSiang = hari.checkshiftSiang === true ? parseInt(hari.jamMulaiPraktikSiang.split(':')[0]) : " "
                          const selesaiSiang = hari.checkshiftSiang === true ? parseInt(hari.jamBerakhirPraktikSiang.split(':')[0]) : ""
                            const jamSiang = [];
                            for (let i = mulaiSiang; i <= selesaiSiang; i++) {
                                if (!clickCountMap[i]) {
                                  // Jika belum, inisialisasi nilai klik menjadi 0
                                  clickCountMap[i] = 0;
                                }
                              
                                // Cek apakah jumlah klik sudah mencapai 5
                                const isDisabled = clickCountMap[i] >= 5;
                                jamSiang.push(
                                  <button style ={{marginRight:"35px", marginLeft:"50px"}}
                                    key={i}
                                    onClick={() => {
                                      if (!isDisabled) {
                                        handleHourButtonClick(i, hari.day, hari.date);
                                        clickCountMap[i] += 1;
                                      }
                                    }}
                                  >
                                    {i < 10 ? '0' + i + ':00' : i + ':00' }
                                  </button>
                                );
                              }
                              
                              const mulaiMalam = hari.checkshiftMalam === true ? parseInt(hari.jamMulaiPraktikMalam.split(':')[0]) : " "
                              const selesaiMalam = hari.checkshiftMalam === true ? parseInt(hari.jamBerakhirPraktikMalam.split(':')[0]) : ""
                            const jamMalam = [];
                            for (let i = mulaiMalam; i <= selesaiMalam; i++) {
                                if (!clickCountMap[i]) {
                                  // Jika belum, inisialisasi nilai klik menjadi 0
                                  clickCountMap[i] = 0;
                                }
                              
                                // Cek apakah jumlah klik sudah mencapai 5
                                const isDisabled = clickCountMap[i] >= 5;
                                jamMalam.push(
                                  <button style ={{marginRight:"35px", marginLeft:"50px"}}
                                    key={i}
                                    onClick={() => {
                                      if (!isDisabled) {
                                        handleHourButtonClick(i, hari.day, hari.date);
                                        clickCountMap[i] += 1;
                                      }
                                    }}
                                  >
                                    {i < 10 ? '0' + i + ':00' : i + ':00' }
                                  </button>
                                );
                              }
                          return (
                            <Collapse in={isOpen[day]}>
                                    <div id="collapsehari" className="OpenJadwal">
                                      <div key={hari.pagey} className="jadwalbutton">
                                      <button
                                      color="is-primary"
                                      onClick={() =>{
                                        setSelectedShift();
                                        toggleShift(hari.pagey)
                                      }} style={{height:"50px", width:"800px"}}>Jadwal Pagi</button>
                                      <div style={{marginTop:"25px", width:"1000px"}}>
                                        {jamPagi.length > 0 ? jamPagi : "Tidak Beroperasional"}
                                        </div>
                                      </div>

                                      <div key={hari.siang} className="jadwalbutton">
                                        <button
                                      onClick={() =>{
                                        setSelectedShift();
                                        toggleShiftSiang(hari.siang)
                                      }} style={{marginTop:"50px",height:"50px", width:"800px"}}>Jadwal Siang</button>
                                      <div style={{marginTop:"25px", width:"1000px"}}>
                                      {jamSiang.length > 0 ? jamSiang : "Tidak Beroperasional"}
                                        </div>
                                      </div>

                                      <div key={hari.malam} className="jadwalbutton">
                                        <button
                                      onClick={() =>{
                                        setSelectedShift();
                                        toggleShiftMalam(hari.malam)
                                      }} style={{marginTop:"100px",height:"50px", width:"800px"}}>Jadwal Malam</button>
                                      <div style={{marginTop:"25px", width:"1000px"}}>
                                      {jamMalam.length > 0 ? jamMalam : "Tidak Beroperasional"}
                                        </div>
                                      </div>
                                    </div>
                                    </Collapse>
                          )
                        })}
                    </div>
                    </Collapse>
                </div>
            )
          })}
    
        </div>
        </div>
    )
}

export default JadwalDokter
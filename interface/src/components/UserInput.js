import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from "../assets/images/logo.png"
import success from "../assets/images/successLogo.png";


const UserInput = () => {
    const [dynamics, setDynamics] = useState([]);
    const {id, namaklinik, namapoli, namadokter, hari, hour, tgl, bln, thn} = useParams();

    const klinik = <strong>{namaklinik}</strong>

    // console.log(namapoli)

    useEffect(()=>{
        const getProfile = async()=>{
            const response = await axios.get(`http://localhost:5000/profilefaskesuserid/${id}`);
        }
        getProfile();
    }, [id])

    useEffect(() => {
        const meUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/fasilitas/${id}/${namapoli}`);
                const myarr = JSON.parse(response.data.pertanyaan);
                setDynamics(myarr);
                
                //console.log(response)
            } catch (error) {
                 
            }
        };
        meUserId();
    },[id, namapoli]);


        const [userAnswer, setUserAnswer] = useState({});

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setUserAnswer({ ...userAnswer, [name]: value });
        };
        //console.log(userAnswer);

        const navigate = useNavigate();

        const paramsData = {
            id: id,
            namadokter: namadokter,
            namapoli: namapoli,
            hari: hari,
            jam: hour,
            tanggal: tgl+"-"+bln+"-"+thn
        }
        

        const generatePDF = () => {
            const data =[
                ["Nama Pasien","NIK","Fasilitas", "Nama Dokter", "Hari", "Tanggal", "Pukul"],
                [userAnswer.Nama,userAnswer.NIK,paramsData.namapoli, paramsData.namadokter, paramsData.hari, paramsData.tanggal, `${paramsData.jam}:00`]
            ]

            const doc = new jsPDF();

             doc.setFillColor('#03005e');
             doc.rect(0, 0, 210, 30, 'F');

            const logoImage = logo;
            doc.addImage(logoImage, 'png', 10,7.5,30,15);

            const successImage = success;
            doc.addImage(successImage, 'png', 90,60,30,30);

            doc.setFontSize(25);
            doc.setFont('helvetica','bold');
            doc.setTextColor(0, 128, 0);
            doc.text("RESERVASI ANDA BERHASIL", 45, 110);
           

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.setLineHeightFactor(2)
            doc.text(`Terima kasih atas reservasi Anda di ${namaklinik} melalui website Clinique.Berikut lampiran\n reservasi telah Anda buat :`, 20, 140);

            
            doc.autoTable({
              head: [data[0]],
              body: data.slice(1),
              startY: 160,
              startX: 20,
              styles:{
                fontSize: 12,
                border: 1
              }
            });

            doc.text(`Dimohon untuk hadir tepat waktu sesuai dengan jam reservasi Anda. Simpan dan tunjukkan\nbukti reservasi berhasil ini ke bagian pendaftaran pada klinik yang Anda pilih.`, 20, 200);
        
            doc.save("Rekapan reservasi.pdf");
          }
        

        const showAlertSubmit = () => {
            confirmAlert({
            title: 'Konfirmasi',
            message:(
                <div>
                    Mohon cek terlebih dahulu janji temu dibawah
                    <br />
                    Fasilitas: <strong>{namapoli}</strong>
                    <br />
                    Nama dokter: <strong>{namadokter}</strong>
                    <br />
                    Hari: <strong>{hari}</strong>
                    <br />
                    Tanggal: <strong>{tgl}-{bln}-{thn}</strong>
                    <br />
                    Pukul <strong>{hour}:00</strong>
                    <br />
                    <br />
                    Jika janji temu dan data anda sudah benar silakan tekan "Ya" untuk mengirimkan formulir ini.
                </div>
            ),
            buttons: [
                {
                    label: 'Ya',
                    onClick: async() => {
                        try {
                            const answerLength = Object.keys(userAnswer).length;
                            if (answerLength !== dynamics.length) {
                                alert("Mohon isi semua pertanyaan")
                            } else {
                                await axios.post('http://localhost:5000/datapasien',{
                                    fasilitas: namapoli,
                                    data: userAnswer,
                                    namaDokter: namadokter,
                                    tanggalDatang: paramsData.tanggal,
                                    jamDatang: hour,
                                    userId: id
                                }).then(res=>{
                                    generatePDF();
                                    alert("Data anda sudah tersimpan, silakan lihat file yang sudah kami kirim ^^")
                                    navigate("/");
                                });   
                            }
                        } catch (error) {
                            
                        }
                    }
                },
                {
                label: 'Tidak',
                onClick: () => {
                        navigate(`/listklinik/${id}/${namaklinik}/jadwaldokter/${namapoli}/userform/${namadokter}/${hari}/${tgl}/${bln}/${thn}/${hour}`);
                }
                }
            ]
            });
        };    
    
        const showAlertCancel = () => {
            confirmAlert({
            title: 'Konfirmasi',
            message: 'Semua perubahan belum disimpan, apakah anda yakin ingin membatalkannya ?',
            buttons: [
                {
                label: 'Ya',
                onClick: () => {
                        navigate(`/listklinik`);
                }
                },
                {
                label: 'Tidak',
                onClick: () => {
                        navigate(`/listklinik/${id}/${namaklinik}/jadwaldokter/${namapoli}/userform/${namadokter}/${hari}/${tgl}/${bln}/${thn}/${hour}`);
                    
                }
                }
            ]
            });
        };

  return (
    <div style={{height:"auto"}}>
        <NavBar/>
        <div className="container mx-auto px-4" style={{paddingBottom:"130px"}}>
            <div className="headersign my-4">
                <h1 style={{textAlign:"center"}}> Formulir Pendaftaran </h1>
            </div>
            <div style={{justifyContent:"center"}} className="bg-white shadow-lg p-5 my-10 rounded">
            {
                        dynamics.map((dynamic, index) =>{
                            return(
                                <div key={dynamic.id} style={{justifyContent:"center"}}className="d-flex rounded bg-white px-4">
                                <div>
                                <div className="formlist">
                                <div key={dynamic.label} className="typeinput">
                                    <label>{dynamic.label}</label>
                                </div>
                                </div>

                                <div className='my-4'>
                                    {
                                        dynamic.question_type === 'short_answer' ?
                                            dynamic.name === "state2" ?
                                            <input type="text" name={dynamic.label} value={userAnswer[dynamic.name]} onChange={handleInputChange} className="inputform" placeholder="NIK (KTP / KK / PASSPORT)" />
                                            :
                                            <input type="text" name={dynamic.label} value={userAnswer[dynamic.name]} onChange={handleInputChange} className="inputform" placeholder={dynamic.label} />
                                        :
                                        dynamic.question_type === "paragraph" ?
                                        <textarea rows={4} name={dynamic.label} value={userAnswer[dynamic.name]} onChange={handleInputChange} className="inputform" placeholder={dynamic.label} />
                                        :
                                        <select
                                        className="inputform" name={dynamic.label} value={userAnswer[dynamic.name]} onChange={handleInputChange}>
                                            <option value="">Silakan Pilih {dynamic.label}</option>
                                            {dynamic.list.map((item) => <option key={item} value={item}>{item}</option>)}
                                        </select>

                                    }
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }

            
            </div>
            <div className="bg-white shadow-lg rounded" style={{width:"1200px", position:"fixed", top:"500px", left:"30px", padding:"20px 0px"}}>
                <button style={{marginLeft:"45%"}} onClick={showAlertSubmit} className="button is-success">SUBMIT</button>
                <button style={{marginLeft:"10px"}} onClick={showAlertCancel} className="button is-danger">CANCEL</button>
            </div>
        </div>
        
    </div>
  )
}

export default UserInput
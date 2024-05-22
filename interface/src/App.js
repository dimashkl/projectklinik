import "./style/landing.css";
import './style/login.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayananUmum from './components/LayananUmum';
import LayananLansia from './components/LayananLansia';
import LayananIbuAnak from './components/LayananIbuAnak';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import About from './components/About';
import Admin from './Admin/Admin';
import CustomForm from "./Admin/CustomForm";
import DynamicForm from './components/DynamicForm';
import FormList from './components/FormList';
import Article from './components/Article';
import Faskes from './components/Faskes';
import Fasilitas from './components/Fasilitas';

import EditCustomForm from './Admin/EditCustomForm';
import FasilAdmin from './Admin/FasilAdmin';
import BookData from './Admin/BookData';
import FormUser from "./Admin/FormUser";
import FormCustom from "./Admin/FormCustom";
import UserInput from "./components/UserInput";
import BookingData from "./Admin/BookingData";

import InputProfileFaskes from "./Admin/InputProfileFaskes";
import ProfileFaskesAdmin from "./Admin/ProfileFaskesAdmin";
import EditProfileFaskes from "./Admin/EditProfileFaskes";
import InputFasilitas from "./Admin/InputFasilitas";
import DaftarFasilitasAdmin from "./Admin/DaftarFasilitasAdmin";
import EditFasilitas from "./Admin/EditFasilitas";
import InputCustomForm from "./Admin/InputCustomForm";
import CustomFormAdmin from "./Admin/CustomFormAdmin";
import TambahFasilitas from "./Admin/Tambahfasilitas";
import TambahJadwalDokter from "./Admin/tambahjadwaldokter";
import DataPasienPreview from "./Admin/DataPasienPreview";

import JadwalDokter from "./components/JadwalDokter";
import InputJadwalDokter from "./Admin/InputJadwalDokter";
import CobaInputJadwalAwal from "./Admin/CobaInputJadwalAwal";
import JadwalDokterAdmin from "./Admin/JadwalDokterAdmin";
import CobaEditJadwalDokter from "./Admin/CobaEditJadwalDokter";

import CobaTampilJadwalDokter from "./Admin/CobaTampilJadwalDokter";
import ListJadwalDokterAdmin from "./Admin/ListJadwalDokterAdmin";

function App() {
  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/layananumum' element={<LayananUmum/>}/>
            <Route exact path='/layananlansia' element={<LayananLansia/>}/>
            <Route exact path='/layananibuanak' element={<LayananIbuAnak/>}/>
            <Route exact path='/loginadmin' element={<Login/>}/>
            <Route exact path= '/signup' element = {<SignUp/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/admin' element={<Admin/>}/>
            <Route exact path='/customform' element={<CustomForm/>}/>
            <Route exact path='/dynamicform' element={<DynamicForm/>}/>
            <Route exact path='/formlist' element={<FormList/>}/>
            <Route exact path='/article' element={<Article/>}/>
            <Route exact path='/listklinik' element={<Faskes/>}/>
            <Route exact path='/listklinik/:namafasil' element={<Faskes/>}/>
            <Route exact path='/listklinik/:id/:namaklinik' element={<Fasilitas/>}/>


            <Route exact path='/editcustomform' element={<EditCustomForm/>}/>
            <Route exact path="inputcustomform" element={<InputCustomForm/>}/>
            <Route exact path="customformadmin" element={<CustomFormAdmin/>}/>
            <Route exact path='/fasiladmin' element={<FasilAdmin/>}/>
            <Route exact path='/datapasien' element={<BookData/>}/>
            <Route exact path='/preview' element={<FormUser/>}/>
            <Route exact path='/custom2' element={<FormCustom/>}/>

            <Route path="/inputprofileklinik" element={<InputProfileFaskes/>}/>
            <Route path="/profileklinik" element={<ProfileFaskesAdmin/>}/>
            <Route path="/editprofilefaskes" element={<EditProfileFaskes/>}/>
            <Route path="/inputfasilitas" element={<InputFasilitas/>}/>
            <Route path="/daftarfasilitasadmin" element={<DaftarFasilitasAdmin/>}/>
            <Route path="/editfasilitas/:id" element={<EditFasilitas/>}/>
            <Route path="/listklinik/:id/:namaklinik/jadwaldokter/:namapoli" element={<JadwalDokter/>}/>

            <Route path="/datapasien/:id" element={<DataPasienPreview/>}/>

            <Route path= "/listklinik/:id/:namaklinik/jadwaldokter/:namapoli/userform/:namadokter/:hari/:tgl/:bln/:thn/:hour" element={<UserInput/>}/>
            <Route path="/bookingdata" element={<BookingData/>}/>
            <Route path="/jadwaldokteradmin" element={<JadwalDokterAdmin/>}/>
            <Route path="/editjadwaldokter/:Id" element={<CobaEditJadwalDokter/>}/>
            <Route path="/inputjadwaldokter" element={<InputJadwalDokter/>}/>
            <Route path="/inputjadwalawal" element={<CobaInputJadwalAwal/>}/>
            <Route path="/cobatampiljadwaldokter/:id" element={<CobaTampilJadwalDokter/>}/>
            <Route path="/listjadwaldokteradmin" element={<ListJadwalDokterAdmin/>}/>
            <Route path="/tambahfasilitas" element={<TambahFasilitas/>}/>
            <Route path="/tambahjadwaldokter" element={<TambahJadwalDokter/>}/>

          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;


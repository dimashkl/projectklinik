import Banner from "./Banner";
//import {Button } from 'react-bootstrap';
import MainContent from "./MainContent"; 
import NavFooter from "./NavFooter";
//import Search from "./search";
import Navbar from "./NavBar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Banner/>
        <MainContent/>
      </div>
      <NavFooter/>
    </div>
  );
}

export default Home;

/*<div className="book">
        <a href="/Fasilitas">
        <Button className="d-flex w-25 my-5 mx-auto my-auto">
          <p className="mx-auto my-auto">BOOK NOW!</p>
        </Button>
        </a>
        </div>*/
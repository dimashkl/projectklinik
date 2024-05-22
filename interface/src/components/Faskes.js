import "../style/faskes.css";
import NavFooter from "./NavFooter";
import SearchItem from "./SearchItem";
import Search from "./search";
import Navbar from "./NavBar"

const Faskes = () => {

  return (
    <div>
      <Navbar />
    <div className="listContainer">
    <div className="listWrapper" style={{marginBottom:"50px"}}>
      <div className="listResult">
            <SearchItem />
      </div>
    </div>
  </div>
   <NavFooter/>
   </div>
  )
}

export default Faskes;
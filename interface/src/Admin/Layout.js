import React from "react";
import NavigationBar from "../Admin/NavigationBar";
import Sidebar from "../Admin/SideBar.js"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="columns" style={{minHeight: "100vh"}}>
        <div className="column is-2" style={{width:"245px", background:"rgb(237, 247, 255)"}}>
          <Sidebar />
        </div>
        <div sttyle={{width:"90%"}}>
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
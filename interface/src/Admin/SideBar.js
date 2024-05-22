import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import ListSubheader from '@mui/material/ListSubheader';
//import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MedicationIcon from '@mui/icons-material/Medication';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
//import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
//import AssignmentIcon from '@mui/icons-material/Assignment';

const Sidebar = () => {
  return (
    <div style={{background:"rgb(237, 247, 255)", marginTop:"68px",height:"100vh", paddingRight:"30px",position:"fixed"}}>
      <aside className="menu pl-2 has-shadow">
      <React.Fragment>
      <ListItemButton href="/admin">
          <ListItemIcon>
            <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component="a" href="/profileklinik">
          <ListItemIcon>
            <AdminPanelSettingsIcon/>
          </ListItemIcon>
            <ListItemText primary="Profile Klinik"/>
        </ListItemButton>

        <ListItemButton component="a" href="/customformadmin">
          <ListItemIcon>
            <DynamicFormIcon/>
            </ListItemIcon>
            <ListItemText primary="Custom Form" />
        </ListItemButton>
        
        <ListItemButton href="/daftarfasilitasadmin">
          <ListItemIcon>
            <MedicationIcon />
            </ListItemIcon>
            <ListItemText primary="Jenis Layanan" />
        </ListItemButton>
        
        <ListItemButton href="/listjadwaldokteradmin">
          <ListItemIcon>
            <CalendarMonthIcon/>
            </ListItemIcon>
            <ListItemText primary="Jadwal Dokter" />
        </ListItemButton>
      </React.Fragment>
      </aside>
    </div>
  );
};

export default Sidebar;
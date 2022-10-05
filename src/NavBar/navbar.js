import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
 
export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#ff0000"}}>
        <Toolbar variant="dense">
         <div style={{display: "flex",
    justifyContent: "space-between"}}>
            <div>
          <img src="/particeep.jpg" alt="image" style={{height:"50px"}} />
          </div>
          <Typography variant="h6" color="inherit" component="div">
            Particeep
          </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

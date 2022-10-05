import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { connect, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Navbar from "./NavBar/navbar"
import { moviess } from './movies';
import {names,MenuProps} from "./utils"
import { useEffect, useState } from 'react';

function App(props) {
  function getStyles(name, categorieName, theme) {
    return {
      fontWeight:
        categorieName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const [movies,setMovies]=useState([])
  const [rowpage,setRowPage]=useState()
  const [page,setPage]=useState(0)
  const [listeMovies,setlisteMovies]=useState([])
  const dispatch = useDispatch();
  const theme = useTheme();
  const [categorieName, setcategorieName] = useState([]);
  useEffect(()=>{
   
   moviess.then(result=>{
    dispatch({
      type: "ALL_MOVIES",
      payload: result,
    });
  setRowPage(result.length)
  setlisteMovies(result)
   })
  },[])
  useEffect(()=>{
   console.log('rowpage',rowpage,"page",page)
  },[rowpage,page])
  
  const addLike =(item)=>{
    if(props.dislikes.includes(item)){
      removedisLike(item)
    }
    dispatch({
      type: "ADD_LIKE",
      payload: item,
    });
  }
  
  const removeLike =(item)=>{
    dispatch({
      type: "REMOVE_LIKE",
      payload: item,
    });
  }

  const removeMovies =(id)=>{
    console.log('id',id)
    var filtered = props.movies.filter(function(value, index, arr){ 
      return value.id !== id;
  });
  console.log('filtred',filtered)
  dispatch({
    type: "ALL_MOVIES",
    payload: filtered,
  });
  //setMovies(filtered)
  }
  const handleChangeC = (event) => {
   
    const {
      target: { value },
    } = event;
    console.log('value',value)
    setcategorieName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    if(value.length>0)
   { var filtered = props.movies.filter(function(values, index, arr){ 
      return value.includes(values.category) })
      console.log('filtered',filtered)
      setlisteMovies(filtered)}
      else {
        setlisteMovies(props.movies)
      }
  };
 
  const handleChange = (event) => {
    setRowPage(event.target.value);
  };
const nextPage=()=>{
     if(((page+1)*rowpage)<=listeMovies.length){
         setPage(page+1)
     }
  }

  const previousPage=()=>{
         if(page-1>=0){
          setPage(page-1)
         }
  }
  const adddisLike=(item)=>{
    if(props.likes.includes(item)){
      removeLike(item)
    }
    dispatch({
      type: "ADD_DISLIKE",
      payload: item,
    });
  }
  const removedisLike=(item)=>{
    dispatch({
      type: "REMOVE_DISLIKE",
      payload: item,
    });
  }

  return (
    <div className="App">
     <Navbar/>
          <div style={{ display: "flex",
    justifyContent: "space-between"
}}>
         
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
    { props.categories &&   <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={categorieName}
          onChange={handleChangeC}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {props.categories.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, categorieName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>}
      </FormControl>

      <FormControl style={{width:"20%",margin:"10px"}} >
        <InputLabel id="demo-simple-select-label">Rows per page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rowpage}
          label="Rows per page"
          onChange={handleChange}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>

            </div>
     
         <div style ={{
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    width:"100%"
   }}>
     <Grid container xs={12} style={{display:"flex" ,padding:"1.5rem", width:"100%"}} >
     {
     
      props.movies &&
      listeMovies.slice(page*rowpage,(page*rowpage)+rowpage).map((item,index)=>{
     return (  
     <Grid item xs={12} md={4} lg={3} sm={6}>
   <Card sx={{ minWidth: 275 }} style={{margin: "15px"}}>
               <CardContent  >
    
        <Typography variant="h5" component="div">
     {item.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {item.category}
        </Typography>
      
      </CardContent>
      <CardActions style={{justifyContent: "space-between"}}>
     <div style={{display:"flex"}}>  
   { props.likes.includes(item.id) ? <div style={{display:"flex"}} onClick={()=>removeLike(item.id)}>
    
        <ThumbUpIcon /> {item.likes}
          
        </div> :
        <div style={{display:"flex"}} onClick={()=>addLike(item.id)}>
    
        <ThumbUpOutlinedIcon /> {item.likes}
          
        </div> 
        } 
        

    { props.dislikes.includes(item.id) ? <div style={{display:"flex",marginLeft:"10px"}} onClick={()=>removedisLike(item.id)}>
     
         <ThumbDownIcon /> {item.dislikes}
         
         </div> :
         <div style={{display:"flex",marginLeft:"10px"}} onClick={()=>adddisLike(item.id)}>
     
         <ThumbDownOutlinedIcon /> {item.dislikes}
         
         </div> 
         }
       </div>
       <div  onClick={()=>removeMovies(item.id)}> 
       <Tooltip title="Supprimer" className=''>
       <DeleteOutlineOutlinedIcon />
        </Tooltip>     </div>
      </CardActions>
  
        </Card>
     
        
        </Grid>)
      })
   
   }
   </Grid>
   </div>
  
   <div style ={{
    display: "flex",
    justifyContent: "center",
    alignItems:"center"
   }}>
   <Button variant="outlined" startIcon={<ArrowBackIosIcon />} style={{margin:"10px"}} onClick={()=>previousPage()}>
   Précédent
</Button>
  <div style={{fontWeight:"bold"}}>page :   {
      page
     }
       </div>  
      <Button variant="outlined" startIcon={<NavigateNextIcon />}style={{margin:"10px"}} onClick={()=>nextPage()}>
   Suivant
</Button>
      </div>

    </div>
  );
}
const mapStateToProps = (state) => ({
  movies: state.movies,
  categories:state.categories,
  likes:state.Likes,
  dislikes:state.Dislikes
 
});
export default connect(mapStateToProps, {}) (App);

import "./App.css";
import React, { useState } from "react";
import photoData from "./photo-data.json";
import Photo from './Photo.js';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';



/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
photoData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // a state variable to hold the filter
  const [trigger, setTrigger] = useState([])
  const [filters, setFilters] = useState( { "animal": false, "house": false, "people": false, "favorites": false, "all": true } ) 
  const [sort, setSort] = useState(0)
  const [favfilter, setFav] = useState(false)
  const [favorites, setFavorites] = useState([[0,0], []])

  const [checkedAnimal, setCA] = useState(0)
  const [checkedArchitecture, setCAr] = useState(0)
  const [checkedPeople, setP] = useState(0)

  // checkbox functions / states

  function resetHelper(event){
    setFilters({ "animal": false, "house": false, "people": false, "favorites": false, "all": true })
    setSort(0)
    setFav(false)
    setFavorites([[0,0], []])
    setCA(0)
    setCAr(0)
    setP(0)
  }
  
  function handleChangeAnimal(event){
    var newFilters = filters
    newFilters["all"] = false
    newFilters["animal"] = event.target.checked
    setFilters(newFilters);
    setCA(!checkedAnimal)
    let keeptrack = ""; 
    for ( var types in filters ) { 
      if ( filters[types] ) { 
        keeptrack += types + " "; 
      } 
    } 
    setTrigger(keeptrack); 
  }

  function handleChangeArch(event){
    var newFilters = filters
    newFilters["all"] = false
    newFilters["house"] = event.target.checked
    setFilters(newFilters);
    setCAr(!checkedArchitecture)
    let keeptrack = ""; 
    for ( var types in filters ) { 
      if ( filters[types] ) { 
        keeptrack += types + " "; 
      } 
    } 
    setTrigger(keeptrack); 
  }

  function handleChangePeople(event){
    var newFilters = filters
    newFilters["all"] = false
    newFilters["people"] = event.target.checked
    setFilters(newFilters);
    setP(!checkedPeople)
    let keeptrack = ""; 
    for ( var types in filters ) { 
      if ( filters[types] ) { 
        keeptrack += types + " "; 
      } 
    } 
    setTrigger(keeptrack); 
  }

  
  // filter function
  const matchesFav = item => {
    if (favfilter){
      return (favorites[1].includes(item.time))
    } else {
      return true
    } 
  }
  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    var toCheck = item.type
    if (filters["all"]){
      return true;
    } else if (filters[toCheck]){
      console.log('success')
      return true;
    } else if (!filters["animal"] && !filters["favorites"] && !filters["house"] && !filters["people"]){
      return true;
    } else {
      return false;
    }
    // if(filters.all) { 
    //   return true
    // } else if (filters.toCheck) {
    //   console.log(filters.toCheck)
    //   return true
    // } else {
    //   return false
    // }
  }

  const sorting_function = (a, b) =>{
    if (sort == 0){
      return a.time - b.time
    } else {
      return b.numberanimals - a.numberanimals
    }
  }

  const filteredandsortedData = photoData.filter(matchesFav).filter(matchesFilterType).sort(sorting_function)

  return (
    <div className="App">
      <div className = "head">
        <div className = "row">
        <div className = 'column2'>
          <div className="newH">Camino Photographs</div>
          <div> Spain and Portugal, <i>May 2022</i></div>
        </div>
        <div className = "row">
        <div className="filter">
          <div>
            <div className = 'font-equal'><b>Filter</b></div>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked = {checkedAnimal} onChange={handleChangeAnimal}/>} label="Animals" />
              <FormControlLabel control={<Checkbox checked = {checkedPeople} onChange={handleChangePeople}/>} label="People" />
              <FormControlLabel control={<Checkbox checked = {checkedArchitecture} onChange={handleChangeArch}/>} label="Architecture" />
            </FormGroup>
          </div>
          <div>
            <FormControl fullWidth style={{marginTop: '40px'}} >
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value= {sort}
                label="Subject"
                onChange={value => !value}>
              <MenuItem value = {0} onClick={() => setSort(0)}>Date Taken</MenuItem>
              <MenuItem value = {1} onClick={() => setSort(1)}>Number of Animals</MenuItem>
            </Select>
            </FormControl>
          </div>
        </div>
        <div className="filter">
          <div className="column">
            <div className = 'font-equal'> <b>Favorites</b> </div>
            <div className = 'paddingfont'>
              <b>{favorites[0][0]}</b> Photos
            </div>
            <div className = 'paddingfont'>
              <b>{favorites[0][1]}</b> Animals
            </div>
            <FormGroup>
              <FormControlLabel control={<Switch checked = {favfilter} color = "success" onChange = {() => setFav(!favfilter)}/>} label="Show Favorites" />
            </FormGroup>
          </div>
          <Button style={{maxWidth: '150px', maxHeight: '50px', marginTop: '30px'}} onClick = {resetHelper} variant="outlined" size = "small" color="error" startIcon={<RestartAltIcon />}>
              Reset All
        </Button>
        </div>
        </div>
        </div>
      </div>
    <div className = "main">
      {filteredandsortedData.map((item, index) => ( // TODO: map photoData to Photo components
        <Photo 
          name = {item.name}
          image ={item.image}
          color = {item.color} 
          type = {item.type} 
          time ={item.time}
          animalcount = {item.numberanimals}
          favorites = {favorites}
          setFavorites = {setFavorites} 
          // cart = {cart} 
          // updateCart = {updateCart} 
          // items = {items} 
          // updateItems = {updateItems}
          /> 
      ))}
    </div>
    </div>
  );
}

export default App;
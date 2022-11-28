// TODO: create a component that displays a single bakery item
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';


export default function Photo(props) {
    // enlarge image code help from
    // https://stackoverflow.com/questions/51854055/how-to-set-a-modal-popup-with-an-image-in-react
    const [click, setClick] = useState(false)

    const remove = (e) => {
      var newArray = []

      for (var toremove in e[1]) {
        if (e[1][toremove] != props.time){
          newArray.push(e[1][toremove])
        }
      }

      return [[e[0][0] - 1, e[0][1] - props.animalcount], newArray]
    }

    const handleClick = () => {
        var newfavs = props.favorites
        if (!props.favorites[1].includes(props.time)) {
          props.setFavorites([[newfavs[0][0] + 1, newfavs[0][1] + props.animalcount], [... newfavs[1], props.time]])
        } else {
          props.setFavorites(remove(newfavs))
        }
    }


    return (
      <div>
        {click ? (
          <div className="Photo enlarge">
            <img src = {props.image} onClick={() => setClick(!click)}></img>
            <div className='titleHolder'>
              <div> {props.name} </div>
              <IconButton color={!props.favorites[1].includes(props.time) ? "neutral" : "error"} onClick = {handleClick}>
                <FavoriteBorderIcon/>
              </IconButton>
            </div>
          </div>
        ) : (
          <div className="Photo">
            <img src = {props.image} onClick={() => setClick(!click)}></img>
            <div className='titleHolder'>
              <div> {props.name} </div>
              <IconButton color={!props.favorites[1].includes(props.time) ? "neutral" : "error"} onClick = {handleClick}>
                <FavoriteBorderIcon/>
              </IconButton>
            </div>
          </div>
        )}
      </div>  
    );
}


{/* <Button onClick = {handleClick} class = "button" variant="outlined"> <StarBorderIcon/> </Button> */}
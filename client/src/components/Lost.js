import React from 'react';
import { Link } from 'react-router-dom';
import LostSVG from '../res/lost.svg';

const lostStyle = {
    width: "20vw"
}

const pageStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center"
}
const Lost = ()=> (      
     <div style={pageStyle}>
         <img style={lostStyle} src={LostSVG} alt="Are you lost?"/>
        <h4 style={{margin: "1rem"}}>Are you lost? <Link className="link link-dark" to="/">Go back.</Link></h4>
   </div>
)

export default Lost;

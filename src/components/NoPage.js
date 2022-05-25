import React from 'react';
import VoidSVG from '../res/void.svg';

const voidStyle = {
    width: "20vw"
}

const pageStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center"
}
const NoPage = ()=> (      
     <div style={pageStyle}>
         <img style={voidStyle} src={VoidSVG} alt="Nothing here."/>
        <h4 style={{margin: "1rem"}}>Nothing here.</h4>
   </div>
)

export default NoPage;

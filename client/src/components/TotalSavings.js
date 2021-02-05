import React from 'react';


export default function TotalSavings(props){
    return (
        <button 
        className={props.className} 
        style={props.bgColor} 
        onClick={()=> props.redirect(props.path)}>
            { props.icon }
            <p className="link-dark">{props.title}</p>
            <p style={savingStyle} className="link-dark bold">{props.trimCurrency(props.total)}</p>
        </button>
    )
}
const savingStyle = {
        fontSize: "1.5rem",
        color: "var(--color-black)",
        fontWeight: 900,
        overflowWrap: "break-word",
        maxWidth: "20vw"
}
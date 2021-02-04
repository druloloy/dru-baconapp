import React from 'react';
import { Link } from 'react-router-dom';
// import * as FaIcon from 'react-icons/fa';
import Bacon from '../res/bacon.png';
// const linkSTyle={
//     fontSize: "2rem"
// }

const iconstyle = {
    height:"1.8rem",
    width:"1.8rem"
}
const Header = () => {
    return (
        <>
            <header className="container-fluid">
                <Link to="/" className="header-brand link-dark" ><img style={iconstyle} src={Bacon} alt="Bacon"/> Bacon</Link>
                {/* <Link to="https://github.com/druloloy" className="link link-dark " ><FaIcon.FaGithub style={linkSTyle}/></Link> */}
            </header>
        </>
    )

}

export default Header;
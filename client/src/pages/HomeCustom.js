import React, { useEffect, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import TotalSavings from '../components/TotalSavings';

import createSVG from '../res/create.svg';
import aboutSVG from '../res/about.svg';
import addSVG from '../res/add.svg';
import historySVG from '../res/history.svg';
import savingsSVG from '../res/savings.svg';

import trimCurrency from '../functions/trimCurrency';


const Home = ({totalSavings}) =>{
    const [ total, setTotalSavings ] = useState(0)
    const history = useHistory();
    const redirectToSomewhere = location => history.push(location)

    useEffect(()=>{
        let mount = true;

        if(mount){
            setTotalSavings(totalSavings)
        }
        return ()=>{
            mount = false
        }
    }, [totalSavings])

    return (
        <div className="grid-container">
        {
            boxesData.map((box, index)=>{
                return ( 
                    <button key={index} className={box.cName} style={box.bgColor} onClick={()=> redirectToSomewhere(box.path)}>
                        { box.icon }
                        <p className="link-dark bold">{box.title}</p>
                    </button>

                )
            })
        }
        <TotalSavings 
            title="Savings"
            total={total} 
            trimCurrency={trimCurrency}
            icon={<img src={savingsSVG} className="svg" alt="savings" />}  
            className="savings"
            bgColor={{backgroundColor: "var(--color-yellow)"}}
            redirect={redirectToSomewhere}
            path="/savings" />
        </div>
    )
}

// --color-red: #d00000;
// --color-yellow: #ffba08;
// --color-gblue: #3f88c5;
// --color-blue: #332b43;
// --color-green: #136f63;
const boxesData = [
    {
        title: "List",
        path: "/list",
        icon: <MdIcon.MdList className="link-dark bold" />,
        cName: "list",
        bgColor: {backgroundColor: "var(--color-red)"}
    },
    {
        title: "Create",
        path: "/create",
        icon: <img alt="create" className="svg createsvg" src={createSVG} />,
        cName: "create",
        bgColor: {backgroundColor: "var(--color-green)"}
    },
    {
        title: "History",
        path: "/history",
        icon: <img alt="history" className="svg" src={historySVG} />,
        cName: "history",
        bgColor: {backgroundColor: "var(--color-gblue)"}
    },
    {
        title: "Add Transaction",
        path: "/transact",
        icon: <img alt="transact" className="svg" src={addSVG} />,
        cName: "update",
        bgColor: {backgroundColor: "var(--color-blue)"}
    },
    {
        title: "About",
        path: "/about",
        icon: <img alt="about" className="svg" src={aboutSVG} />,
        cName: "about",
        bgColor: {backgroundColor: "var(--color-cyan)"}
    },
]
export default Home;
import React, { useEffect, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import TotalSavings  from '../components/TotalSavings';


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
            icon={<p className="link-dark bold">&#8369;</p>}  
            className="savings"
            bgColor={{backgroundColor: "var(--color-yellow)"}}
            redirect={redirectToSomewhere}
            path="/savings"
            trimCurrency={trimCurrency} />
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
        icon: <MdIcon.MdCreate className="link-dark bold" />,
        cName: "create",
        bgColor: {backgroundColor: "var(--color-green)"}
    },
    {
        title: "History",
        path: "/history",
        icon: <MdIcon.MdHistory className="link-dark bold" />,
        cName: "history",
        bgColor: {backgroundColor: "var(--color-gblue)"}
    },
    {
        title: "Add Transaction",
        path: "/transact",
        icon: <MdIcon.MdAddShoppingCart className="link-dark bold" />,
        cName: "update",
        bgColor: {backgroundColor: "var(--color-blue)"}
    },
    {
        title: "About",
        path: "/about",
        icon: <MdIcon.MdInfo className="link-dark bold" />,
        cName: "about",
        bgColor: {backgroundColor: "var(--color-cyan)"}
    },
]
export default Home;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoPage from '../components/NoPage'

const HistoryContainer = (props) =>{  
    return (
        <div style={{borderRadius: "0px", borderBottom: "2px dotted var(--color-black"}} className="container-boilerplate colored-container-red">
            <div>
                <p className="p-list bold">{props.title}</p>
                <p className="p-list sm wrap">{props.details}</p>
                <p className="p-list sm"><strong>Date:</strong> {props.date}</p>
                
                <div style={{borderLeft: "2px solid var(--color-black"}} key={0} className="binder">
                <p className="p-list sm bold">Additional Information</p>
                {
                    props.data.map((info,index)=>{
                        if(props.history.type==='transaction') return( 
                            <>
                                <p key={1} className="sm">Transaction Type: {info.transaction}</p>
                                <p key={2} className="sm">Name: {info.name}</p>
                                <p key={3} className="sm">Increase/Decrease &#8369;{info.exchange}</p>
                                <p key={4} className="sm">New Balance: &#8369;{info.outcome}</p>
                            </>
                        )
                        if(props.history.type==='genesis') return( 
                            <>
                                <p key={1} className="sm">Entry Name: {info.name}</p>
                                <p key={2} className="sm">Initial Amount: &#8369;{info.amount}</p>
                            </>
                        )
                        if(props.history.type==='exodus')return ( 
                            <>
                                <p key={1} className="sm">Entry Name: {info.name}</p>
                                <p key={2} className="sm">Initial Amount: &#8369;{info.amount}</p>
                            </>
                        )
                        return <></>
                    })
                }
                </div>
            </div>
        </div>
    )
}

const History = (props) =>{
    const [ history, setHistory ] = useState([]);

    useEffect(()=>{
        let mount = true;

        if(mount){
            setHistory(props.history)
            mount=false;
        }
    }, [props.history])

    const displayListResult = history.length>0 ? history.map((hist, index)=>{
        return <HistoryContainer 
        key={ hist._id }
        history={ hist }  
        title={ hist.title.toUpperCase() } 
        details={ hist.notes } 
        data={hist.data}
        date={ hist.creationDate.substring(0,10) } 
        />
    }) : <NoPage/>

    const deleteHistory = async (e) =>{
        try {
            await axios.post('http://localhost:5000/history/available/delete')
            .then(()=>{
                history.filter(hist=>hist.isDeleted)
            })
            .catch(e=>console.log(e));
        } catch (error) {
            throw new Error(error);
        }
    }   
    return (
        <div className="container-float">
            <div className="container">
                <h3>Your Recent History</h3>
                <Link to="#" className="link-dark" onClick={deleteHistory}>delete history</Link>
                { displayListResult }
                
            </div>
        </div>
    )
}
export default History;
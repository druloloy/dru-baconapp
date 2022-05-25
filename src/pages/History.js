import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { baseUrl } from '../bacon.config';
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
                <p className="p-list sm"><strong>Action: </strong> {props.type}</p>
                <p className="p-list sm"><strong>Initial Amount:</strong> &#8369;{props.initialAmount}</p>
                <p className="p-list sm"><strong>Final Amount:</strong> &#8369;{props.finalAmount}</p>  
                </div>
            </div>
        </div>
    )
}

const History = (props) =>{
    const [ history, setHistory ] = useState([]);
    const [offset, setOffset] = useState(0);
    useEffect(()=>{
        let mount = true;

        if(mount){
            try {
                axios.get(`${baseUrl}/history?&param.offset=${offset}&param.limit=10`)
                    .then((history)=>{
                        setHistory(history.data);
                        setOffset(o=>o+10);
                    })
                    .catch(e=>{
                        const {response} = e;
                        if(response){
                            toast.error(response.data.message, {position: "bottom-center"})
                        }
                    })
            } catch (error) {
                toast.error("Oops! That didn't worked.", {position: "bottom-center"})
            }
        
            return ()=>{
                mount=false;
            }
        }
    }, [history, offset])

    const displayListResult = history.length>0 ? history.map((hist)=>{
        return <HistoryContainer 
        key={ hist.id }
        history={ hist }  
        title={ hist.hist_label.toUpperCase() } 
        details={ hist.reason } 
        type={ hist.hist_type.toUpperCase() }
        initialAmount={hist.initialAmount}
        finalAmount={hist.finalAmount}
        date={ hist.createdAt.substring(0,10) } 
        />
    }) : <NoPage/>

    const deleteHistory = async () =>{
        try {
            await axios.delete(`${baseUrl}/history`)
            .then(()=>{
                setHistory(history.filter(hist=>hist.isArchived));
                toast.success("History deleted!", {position: "bottom-center"})
            });
        } catch (error) {
            toast.error("Oops! That didn't worked.", {position: "bottom-center"})
        }
    }   
    return (
        <div className="container-float">
            <div className="container">
                <h3>Your Recent History</h3>
                {
                    history.length > 0 ?
                    <Link to="#" className="btn btn-dark" onClick={()=>deleteHistory()}>Clear History</Link>
                    :
                    <></>
                }
                { displayListResult }
                
            </div>
        </div>
    )
}
export default History;
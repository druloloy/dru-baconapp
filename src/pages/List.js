import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import {baseUrl} from '../bacon.config';
import * as MdIcon from 'react-icons/md';

import NoPage from '../components/NoPage'

import BanksContainer from '../components/BanksContainer';

const List = ({banks}) =>{
    const [ bank, setBanks ] = useState([]);

    useEffect(()=>{
        let mount = true;

        if(mount){
            setBanks(banks)
            mount=false;
        }
    }, [banks])

    const removeBank = (id,name) => {
        const encodedId = Buffer.from(id.toString()).toString("base64");

        try {
            axios.delete(`${baseUrl}/bank/${encodedId}`)
                .then(res=>res.data)
                .then(data=>{
                    if(data.error) return toast.error(data.error.message, {position: "bottom-center", toastId: data.id})
                        setBanks(bank.filter(bank=>bank.id!==id));    
                        toast.success(name+" deleted!", {position: "bottom-center", toastId: data.id})
                })
                .catch(e=>{
                    const {response} = e;
                    if(response){
                        toast.error(response.data.message, {position: "bottom-center", toastId: response.data.id})
                    }
                });
        } catch (error) {
            toast.error("Oops! That didn't worked.", {position: "bottom-center"})
        }
    
    }

    const displayListResult = bank.length>0 ? bank.map((bank)=>{
        return <BanksContainer 
        key={ bank.id } 
        id={ bank.id }
        icon={<MdIcon.MdDeleteForever />}  
        name={ bank.name.toUpperCase() } 
        amount={bank.amount}
        date={ bank.createdAt.substring(0,10) } 
        removeBank={ removeBank }/>
    }) : <NoPage/>

    return (
        <div className="container-float">
            <div className="container">
                <h3>Your Saving bank List</h3>
                { displayListResult }
                
            </div>
        </div>
    )
}

export default List;
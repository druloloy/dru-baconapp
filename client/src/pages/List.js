import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'

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

    const removeBank = (name, amount, id) => {
        const exodusInformation = {
            type: "exodus",
            title: "Account Deletion",
            notes: "",
            creationDate: new Date(),
            data: {
                name,
                amount
            }
            
        }
        console.log(name, exodusInformation)
        axios.delete('http://192.168.100.9:5000/bank/delete/'+id)
        .then(res=>res.data)
        .then(data=>{
            if(data.error) return toast.error(data.error.message, {position: "bottom-center", toastId: data._id})
            axios.post('http://192.168.100.9:5000/history/add', exodusInformation)
            .then(res=>res.data)
            .then(data=>{
                setBanks(bank.filter(bank=>bank._id!==id));    
                toast.success(name+" deleted!", {position: "bottom-center", toastId: data._id})
            })
            .catch(e=>console.log(e))
        })
        .catch(e=>console.log(e));
    
    }

    const displayListResult = bank.length>0 ? bank.map((bank, index)=>{
        return <BanksContainer 
        key={ bank._id } 
        id={ bank._id }
        icon={<MdIcon.MdDeleteForever />}  
        name={ bank.name.toUpperCase() } 
        amount={bank.savings}
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
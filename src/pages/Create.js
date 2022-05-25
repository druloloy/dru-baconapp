import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css';
import { baseUrl } from '../bacon.config';
// import { Prompt } from 'react-router-dom';


const Create = () =>{

    const [ name, setName ] = useState("");
    const [ amount, setAmount ] = useState(0);
    const [ date, setDate ] = useState(new Date());

    const onChangeName = e =>{
        e.preventDefault();
        setName(e.target.value);
    }
    const onChangeAmount = e =>{
        e.preventDefault();
        setAmount(e.target.value);
    }
    const onChangeDate = e =>{
        e.preventDefault();
        setDate(e.target.value);
    }
    const onSubmit =  (e)=>{
        e.preventDefault();
        const data = {
            name,
            amount,
            creationDate: date
        };
        try {
            axios.post(baseUrl+'/bank', data)
            .then((res)=>res.data)
            .then((d)=>{
            
                toast.success("Successfully added!", 
                    {position: "bottom-center", 
                    toastId: data.id})
            
               // to home
               window.location = "/";
            })
            .catch(e=>{
                const {response} = e;
                if(response){
                    toast.error(response.data.message, 
                        {position: "bottom-center", 
                        toastId: response.data.id})
                }
            })      
        } catch (e) {
            toast.error("Oops! That didn't worked.", {position: "bottom-center"})
        }
    }
    return (
        <div className="container-float">
            {/* <Prompt 
                when={formIsHalfFilledOut}
                message="Are you sure you want to leave?"
            /> */}

            <div className="container-neo colored-container-green">
            <h3>Create an Entry</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Entry Name</label>
                    <input type="text" className="form-control" placeholder="Entry Name" value={name} 
                        onChange={onChangeName} required />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" className="form-control" placeholder="&#8369;"
                    onChange={onChangeAmount} pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required />
                </div>
                <div className="form-group">
                    <label>Date</label><br/>
                    <DatePicker selected={date} onChange={onChangeDate} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Add" className="btn btn-primary" />
                </div>
                
            </form>
            </div>
        </div>
    )
}

export default Create;
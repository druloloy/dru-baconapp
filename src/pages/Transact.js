import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css';
import { baseUrl } from '../bacon.config';
// import { Prompt } from 'react-router-dom';

const Transact = ({ banks }) =>{

    const [ bank, setBank ] = useState([]);
    const [ transact, setTransaction ] = useState('');  
    const [ id, setId ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ bankName, setBankName ] = useState('');
    const [ details, setDetails ] = useState('');

    useEffect(()=>{
        let mount = true;

        if(mount){
            setBank(banks)
            mount=false;
        }
    }, [banks])
    
    useEffect(() => {
        const def = bank.map(bank=>bank.id)
        return setId(def[0]);
    }, [bank]);

    useEffect(() => {
        setTransaction('earning')
        return;
    }, []);

    const onTransactionChange = e =>{
        e.preventDefault();
        setTransaction(e.target.value);
    }
    const onChangeId = e =>{
        e.preventDefault();
        setId(e.target.value);
        setBankName(bank.find(b=>b.id===e.target.value).name);
    }
    const onChangeAmount = e =>{
        e.preventDefault();
        setAmount(e.target.value);
    }

    const onChangeDetails = e =>{
        e.preventDefault();
        setDetails(e.target.value);
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            //savings
            const savingsAmount = transact === 'expenditure' ? 
            -parseFloat(amount): 
            parseFloat(amount);

            const savingsBody = {
                id,
                amount: savingsAmount,
                name: bankName,
                reason: details
            }

            
            //frontend - backend connection
            
            axios.put(baseUrl+'/bank', savingsBody)
            .then(res=>res.data)
            .then(data => {
                if(data.error) return toast.error(data.error.message, {position: "bottom-center", toastId: data._id})
                
                toast.success("Successfully updated!", {position: "bottom-center", toastId: data.id})
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
            <h3>Create Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Transaction Type</label>
                    <select onChange={onTransactionChange} 
                    value={transact} 
                    className="form-control" required> 
                        <option value="earning" >Earning</option>
                        <option value="expenditure">Expenditure</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Entry Name</label>
                    <select 
                    className="form-control"
                    value={id}
                    onChange={onChangeId} required>
                    {
                        bank.map(bank=>(
                            <option className="form-control"
                            key={bank.id}
                            value={bank.id}>{ bank.name }</option>
                        ))
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" className="form-control" placeholder="&#8369;"
                    onChange={onChangeAmount} pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required />
                </div>

                <div className="form-group">
                    <label>Details</label>
                        <textarea 
                        maxLength={255} 
                        className="form-control"
                        placeholder="(optional)" 
                        onChange={onChangeDetails}/>
                </div>

                <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-dark" />
                </div>
                
            </form>
            </div>
        </div>
    )
}

export default Transact;
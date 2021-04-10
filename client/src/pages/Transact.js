import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css';
// import { Prompt } from 'react-router-dom';

const Transact = ({ banks }) =>{

    const [ bank, setBank ] = useState([]);
    const [ transact, setTransaction ] = useState('');  
    const [ id, setId ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ title, setTitle ] = useState('');
    const [ details, setDetails ] = useState('');

    useEffect(()=>{
        let mount = true;

        if(mount){
            setBank(banks)
            mount=false;
        }
    }, [banks])
    
    useEffect(() => {
        const def = bank.map(bank=>bank._id)
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
    }
    const onChangeAmount = e =>{
        e.preventDefault();
        setAmount(e.target.value);
    }

    const onChangeTitle = e =>{
        e.preventDefault();
        setTitle(e.target.value);
    }
    const onChangeDetails = e =>{
        e.preventDefault();
        setDetails(e.target.value);
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            //savings
            let currAmount = bank.filter(bank=>{
                if(bank._id===id)
                    return bank.savings;
                return undefined;
            });
            let getName = bank.filter(bank=>{
                if(bank._id===id)
                    return bank.name;
                return undefined;
            });
            currAmount = currAmount[0].savings;
            const savingsData = transact === 'earning' ? parseFloat(currAmount)+parseFloat(amount): 
            parseFloat(currAmount)-parseFloat(amount);

            //history
            let name = getName[0].name;
            const historyTitle = title || transact;
            const historyDetails = details || "no details";
            const historyData = {
                transaction: transact,
                name,
                exchange: amount,
                outcome: savingsData
            }

            const historyInformation = {
                title: historyTitle,
                notes: historyDetails,
                creationDate: new Date(),
                data: historyData,
                type: 'transaction'
            }
            
            //frontend - backend connection
            
            axios.post('api/bank/savings/update/'+id, {savings: savingsData})
            .then(res=>res.data)
            .then(data => {
                if(data.error) return toast.error(data.error.message, {position: "bottom-center", toastId: data._id})
                axios.post('api/history/add', historyInformation)
                .then(res=>res.data)
                .then(data=>{
                    toast.success("Successfully updated!", {position: "bottom-center", toastId: data._id})
                    window.location = '/';
                })
                .catch(e=>console.log(e));
            })
            .catch(e=>console.log(e));
        } catch (e) {
            console.log(e)
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
                            key={bank._id}
                            value={bank._id}>{ bank.name }</option>
                        ))
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" className="form-control" placeholder="&#8369;"
                    onChange={onChangeAmount} pattern="^\d+(?:\.\d{1,2})?$" step="0.01" required />
                </div>

                <h4>Transaction Details</h4>
                <div className="form-group">
                    <label>Title</label>
                    <input
                    type="text"
                    maxLength={50}
                    className="form-control"
                    placeholder="(optional)"
                    onChange={onChangeTitle}/>
                </div>
                <div className="form-group">
                    <label>Details</label>
                        <textarea 
                        maxLength={100} 
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
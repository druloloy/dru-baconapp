import React,{ useEffect, useState }  from 'react'
import { useHistory } from 'react-router-dom'
import BankAmountCharts from '../components/BankAmountCharts';

const BankAmountStatus = (props) => {
    return (
        <tr className="table table-default">
            <td key={1} >{props.name}</td>
            <td key={2} >&#8369;{props.amount}</td>
        </tr>
    )
}

const Savings =  (props) => {
    const [ banks, setBank ] = useState([])

    useEffect(()=>{
        let mount = true;

        if(mount){
            setBank(props.banks)
            mount=false;
        }
    }, [props.banks])

    const history = useHistory();
    const sendReport = () => history.push('/report');

    return (
        <div className="container-float">
            <h3 className="bold">Bank Current State</h3>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Your Savings</th>
                    </tr>
                    <tr>
                        <th>Bank</th>
                        <th>Savings Amount</th>
                    </tr>
                </thead>
                <tbody>
                {
                    banks.map((bank,index)=>{
                        return <BankAmountStatus 
                        key={index}
                        index={index} 
                        id={bank._id} 
                        name={bank.name} 
                        amount={bank.savings} />
                    })
                }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Savings</th>
                        <th> &#8369;
                            {
                                banks.map(bank=>bank.savings)
                                .reduce((amount, curr)=>{return parseFloat(amount)+parseFloat(curr)}, 0)
                            }
                        </th>
                    </tr>
                </tfoot>
            </table>
            
            <BankAmountCharts banks={banks}/>

            <button onClick={sendReport}>SEND REPORT</button>
        </div>
    )
}

export default Savings;

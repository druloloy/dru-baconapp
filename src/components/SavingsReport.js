import React from 'react';
import Header from './Header'

const SavingsReport = ({ banks, history, id }) => {
    return (
        <div id={id} className="container-float">
            <Header/>
            <table className="table table-light">
                <caption>Overall Savings Amount a of { new Date().toLocaleString() }</caption>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Bank Name</th>
                        <th scope="col">Total Savings Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        banks.map((bank, index)=>(
                           <tr key={bank.id}>
                               <td key={1}>{bank.name}</td>
                               <td key={2}>&#8369;{bank.amount}</td>
                           </tr>
                        ))
                    }
                </tbody>

                <tfoot>
                        <tr>
                            <th>Overall Savings Amount</th>
                            <th>&#8369;
                                {
                                    banks
                                        .map(bank=>bank.amount)
                                        .reduce((acc, curr)=>{
                                            return parseFloat(acc)+parseFloat(curr);
                                        }, 0)
                                }
                            </th>
                        </tr>
                </tfoot>
            </table>
            
            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Initial Amount</th>
                        <th>Final Amount</th>
                        <th>Additional Notes</th>
                        <th>Transaction Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((hist)=>{
                            return (
                                <tr key={ hist.id }>
                                        <td key={1}>{ hist.createdAt.substring(0,10)}</td>
                                        <td key={2}><strong>{ hist.hist_label }</strong></td>
                                        <td style={{ wordWrap: "break-word",minWidth:"100px",maxWidth:"100px"}} key={3}>
                                            {hist.initialAmount}
                                        </td>
                                        <td style={{ wordWrap: "break-word",minWidth:"100px",maxWidth:"100px"}} key={3}>
                                            {hist.finalAmount}
                                        </td>
                                        <td style={{ wordWrap: "break-word",minWidth:"100px",maxWidth:"100px"}} key={4}>{ hist.reason }</td>
                                        <td key={5}>{ hist.hist_type }</td>
                                </tr>
                            )
                        })
                    }                
                </tbody>                    
            </table>
        </div>
    )
}
export default SavingsReport
import React from 'react';
import Header from './Header'

const splitInfos = (jsonstr)=>{
    let objKeys = Object.keys(jsonstr);
    let objVal = Object.values(jsonstr);
    let temp = '';
    for(let k = 0; k< objKeys.length; k++){
        temp += `${objKeys[k]}: ${objVal[k]}, `
    }
    return temp;
}

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
                           <tr key={bank._id}>
                               <td key={1}>{bank.name}</td>
                               <td key={2}>&#8369;{bank.savings}</td>
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
                                        .map(bank=>bank.savings)
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
                        <th>YYYY-MM-DD</th>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Additional Notes</th>
                        <th>Transaction Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((hist)=>{
                            return (
                                <tr key={ hist._id }>
                                        <td key={1}>{ hist.creationDate.substring(0,10)}</td>
                                        <td key={2}><strong>{ hist.title }</strong></td>
                                        <td style={{ wordWrap: "break-word",minWidth:"100px",maxWidth:"100px"}} key={3}>
                                        <i>
                                        {
                                            splitInfos(hist.data[0])
                                        }
                                        </i>
                                        </td>
                                        <td key={4}>{ hist.notes }</td>
                                        <td key={5}>{ hist.type }</td>
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
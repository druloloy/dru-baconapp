import React, { useState, useEffect } from 'react';

import { HorizontalBar } from 'react-chartjs-2';

const BankAmountCharts = (props) =>{
    
    const [ bankName, setBankName ] = useState([]);
    const [ bankAmount, setBankAmount ] = useState([]);

    useEffect(()=>{
        const names = props.banks.map(bank=>bank.name);
        setBankName(names);
        
        return; 
    }, [props.banks])

    useEffect(()=>{
        const amounts = props.banks.map(bank=>bank.savings);
        setBankAmount(amounts);

        return; 
    }, [props.banks])
    const datatest = {
        labels: bankName,
        datasets: [
            {
                label: "Banks",
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: bankAmount
            }
        ],
        backgroundColor: "rgba(75, 192, 192, 1)"
    }

    return (
        <div className="container-float" style={{backgroundColor: "#ffffff",margin: 0}}>
            <HorizontalBar 
                data={datatest}
                options={{
                    title: {
                        display:true,
                        text: "Bank Savings Amount",
                        fontSize: 20
                    },
                    legend:{
                        display: true,
                        position: "right"
                    },
                    maintainAspectRatio: false
                }}
                height={150}
            />
        </div>
    )
}

export default BankAmountCharts;

import React, {useState, useEffect } from 'react'
import html2pdf from 'html2pdf.js';
import SavingsReport from '../components/SavingsReport';

const Report = (props)=> {

    const [banks, setBanks] = useState([]);
    const [history, setHistory] = useState([]);
    const [ loaded, isLoaded ] = useState(false);

    useEffect(()=>{
        setBanks(props.banks)
        setHistory(props.history)
    }, [props.banks, props.history])

    useEffect(()=>{
        if(history===[] && banks === []){
            isLoaded(false)
        }
        else{
            isLoaded(true)
        }

        return()=>{
            console.log("unmounted")
        }
    }, [banks,history])

    useEffect(() => {
        const date = Date.now();
        try {
            if(loaded){
                const content = document.getElementById('report');
                const opt = {
                    margin: 10,
                    image: { type: 'jpeg', quality: 1 },
                    filename: `report-${date}.pdf`
                }
                html2pdf()
                    .set(opt)
                    .from(content)
                    .save()
                    .then(()=>{window.location='/'})
                    
            }    
        } catch (error) {
            console.log(error)
        }

        return () => {
            console.log("finished!")
        }
    }, [loaded])

    return (
        <div style={{display:"none"}}>
            <SavingsReport banks={banks} history={history}  id="report" />
        </div>
    )
}

export default Report

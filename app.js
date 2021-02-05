const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT | 5000;
const ATLAS_URI = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json()); 


// mount routes
const bank_route = require("./routes/bank-routes");
const history_route = require("./routes/history-routes");

app.use('/bank',bank_route);
app.use('/history', history_route);


// connect to MongoDB database

mongoose.connect(ATLAS_URI, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(res=>{
        console.log('SuccessFully connected to database.')
    })
    .catch(e=>console.log(e));

// serve client
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'client','build')));

    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname, 'client','build','index.html'));
    })  
    
}else{
    app.get('/', (req,res)=>{
        res.send('API RUNNING');
    })
}

// run express server
app.listen(PORT, ()=>{
        console.log('Listening on port: '+ PORT);
})

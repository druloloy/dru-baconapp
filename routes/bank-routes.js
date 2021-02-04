const router = require('express').Router();
const Bank = require('../models/bank-model');

const getBanks = async(req, res)=>{
    try{
        await Bank.find()
        .then(result=> res.send(result))
        .catch(e=>res.status(400).json(e.message));
    }
    catch(e){
        res.status(500).json(e);
    }
}
const addBank = async (req, res)=>{
    try{
        const { name, savings, date } = req.body;
        const hasDoppelganger = await Bank.findOne({ name });
        
        if(!name || !savings || !date) return res.json({"error": {message: "Blank fields are not allowed."}});

        if(savings < 0) return res.status(406).json({"error": {message: "Amount must not below zero."}});
        if(name.length < 3) return res.json({"error": {message: "Name must exceed 3 characters."}});

        
        if(hasDoppelganger) return res.json({error: "Already existing."});

       
        const newBank = new Bank({
            name,
            savings,
            date
        });
        await newBank.save()
        .then(res.json({bank: newBank, isAdded: true}))
        .catch(e=>res.status(400).json(e.message)); 
        
    }
    catch(e){
        res.status(500).json(e);
    }
}

const updateBank = async (req, res)=>{
    try{

        const doesExist = await Bank.findById(req.params.id);
        if(!doesExist) return res.json({error: {message: "ID doesn't exists in the database."}}); 

        await Bank.findOneAndUpdate({ _id: req.params.id }, {savings: req.body.savings}, 
            (error, result)=>{
                if(error) return res.status(400).json({error, isUpdated: false});

                res.json({bank: result, isUpdated: true})
            }
        )
    }
    catch(e){
        res.status(500).json(e);
    }
}
const deleteBank = async (req, res)=>{
    try {
        const doesExist = await Bank.findById(req.params.id);
        if(!doesExist) return res.json({error: {message: "ID doesn't exists in the database."}}); 

        await Bank.findOneAndDelete({ _id: req.params.id }, (err, result)=>{
            if(err) res.status(400).json(error);
    
            res.json("Bank removed from the database.")
        });
    } catch (e) {
        res.status(500).json(e)
    }
}


router.get('/', getBanks);
router.post('/add', addBank);
router.post('/savings/update/:id', updateBank);
router.delete('/delete/:id', deleteBank);


module.exports = router;
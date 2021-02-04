const router = require('express').Router();
const History = require('../models/history-model');

const getHistory = async (req, res)=>{
    try {
        await History.find( {} , (err, result)=>{
            if(err) return res.json({error: err});

            res.send(result);
        })
        .sort( { creationDate: -1 } );
    } catch (e) {
        res.status(500).json({error: e});
    }
}
const getHistoryAvailable = async (req, res)=>{
    try {
        await History.find( {isDeleted: false} , (err, result)=>{
            if(err) return res.send(err);

            res.send(result);
        }).limit(Number(req.params.limit))
        .sort( { creationDate: -1 })
        
    } catch (e) {
        res.status(500).json({error: e});
    }
}
const getHistoryLimit = async (req, res)=>{
    try {
        await History.find( {} , (err, result)=>{
            if(err) return res.send(err);

            res.send(result);
        }).limit(Number(req.params.limit));
    } catch (e) {
        res.status(500).json({error: e});
    }
}
const addHistory = async (req, res)=>{
    try {
        const { title, notes, creationDate, data, type } = req.body;

        const newHistory = new History({
            title,
            notes, 
            creationDate, 
            data,
            type
        })

        await newHistory.save()
        .then(()=>res.json("New history added!"))
        .catch(e=>res.status(400).json({error: e}));

    } catch (e) {
        res.status(500).json({error: e});
    }
}
const deleteHistory = async (req, res)=>{
    try {
        History.updateMany({isDeleted: false}, { isDeleted: true },            
            (error, result)=>{
                if(error) return res.status(400).json({error});
                res.json("history deleted")
        })
    } catch (error) {
        res.status(500).json({error: e});
    }
}
const flushHistory = async (req, res)=>{
    try {
        await History.deleteMany((err, result)=>{
            if(err) return res.send(err);

            res.send(result);
        });
    } catch (e) {
        res.status(500).json({error: e});
    }
}

router.get('/', getHistory);
router.get('/available/:limit', getHistoryAvailable);
router.get('/:limit', getHistoryLimit);
router.post('/add', addHistory);
router.post('/available/delete', deleteHistory);
router.delete('/flush', flushHistory);

module.exports = router;
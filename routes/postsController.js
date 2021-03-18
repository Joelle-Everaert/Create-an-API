const express = require ('express');
const router = express.Router();  
// on appel la constante router pour joindre l'objet router de express
const ObjectID = require ('mongoose').Types.ObjectId;
// recupere l'id de l'objet --> update et delete via ID

const { PostsModel } = require ('../models/postsModel');

//afficher notre db sur le navigateur // docs : data de la db
router.get('/', (req, res)=>{
    PostsModel.find((err, docs)=>{
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    })
});

// AFFICHER PAR ID
router.get('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id)

    PostsModel.findById(
        req.params.id,
        (err, docs)=>{
            if(!err) res.send(docs);
            else console.log("Not found by ID : " + err);
        }
    )
});


router.post("/", (req, res)=>{
    // const { author, message } = req.body
    const newRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs)=>{
        if (!err) res.send(docs);
        else console.log("Error creating new data: " + err);
    })
})

//update
router.put("/:id", (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id)
    
    const updateRecord ={
        author: req.body.author,
        message: req.body.message
    };
    //met a jour le modele
    PostsModel.findByIdAndUpdate(
        req.params.id,
        // $set / new = obligatoire... 
        { $set: updateRecord },
        { new: true },
        (err, docs)=>{
            if(!err) res.send(docs);
            else console.log("Update error: " + err);
        }
    )
});

router.delete("/:id", (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id)
    
    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs)=>{
            if(!err) res.send(docs);
            else console.log("Delete error : " + err);
        }
    )
});

module.exports = router
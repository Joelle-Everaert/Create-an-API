const express = require ('express');
const app = express();
require('./models/dbConfig');
const postsRoutes =require ('./routes/postsController');
const mongoose = require('mongoose');
const cors = require ('cors'); // sert a donné accès a notre API a "n'importe qui"

mongoose.set('useFindAndModify', false);
// ^ lorsque qu'on utilise methode put (postcontroller) nous devons mettre 
//useFindAndModify sur false --> donc crea d'un middleware 

app.use(express.json())
// meme principe que Body parser <- intégré dans express
app.use(cors()); 
// donne accès a notre API a tout le monde
// SI ON VEUT RESTREINDRE A UN SEUL SITE ON FERA 
// app.use(cors({origin: 'https:// le site en question'})) ou notre front en react


const demoLogger = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.path}`)
    console.log(req.body)
    console.log(`\n`)
    next();
};
app.use(demoLogger);
// pour voir les requetes dans le terminal /!\


//creation de middelware => sera a l'affut des request et des responses
// si / alors tu nous envois postsRoutes -> se connecte a notre router
app.use('/posts', postsRoutes);

app.listen(5500, () => console.log('Server started: 5500'))
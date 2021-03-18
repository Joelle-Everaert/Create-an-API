// configuration de la base de donnée dans le modele car tout ce qui a attrait a la base de donnée

const mongoose = require ('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/createNewAPI",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log("Mongodb connected ");
        else console.log("Connection error : " + err);
    }
)
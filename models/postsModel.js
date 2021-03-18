const mongoose = require('mongoose');

const PostsModel = mongoose.model(
    "createNewAPI",  // la db
    {               // ce qui se trouve dans la table de la dv sous  forme d'objet
        author: {
            type: String,
            require : true
        },
        message: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    "posts"         // la table de la db
);

module.exports= { PostsModel };
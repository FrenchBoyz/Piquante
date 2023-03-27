// importation de mongoose
const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator');



// le modèle de base de donnée pour le signup 
const userSchema = mongoose.Schema({
    email : {type : String , required: true , unique : true},
    password : { type: String, required : true}
});


// sécurité supplementaire pour ne pas ajouter 2 fois la meme adresse email
userSchema.plugin(uniqueValidator);


module.exports =  mongoose.model("user", userSchema);
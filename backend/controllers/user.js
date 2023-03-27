// importation de bcrypt
const bcrypt = require("bcrypt");

// importation de crypto-js
const CryptoJS = require("crypto-js");

const jwt = require('jsonwebtoken');


const dotenv = require('dotenv');
require('dotenv').config();



// importation models de la bdd User.js
const User = require("../models/User");



exports.signup = (req, res, next) => {
// je crypte l'email avec cryptoJs
const emailCryptoJs = CryptoJS.AES.encrypt(req.body.email,`${process.env.PRIVATE_KEY}`).toString();


// salt combien de fois sera executer l'algo de hashage
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


//login pour s'authentifer
exports.login = (req,res,next) => {
// chiffrer l'email pour l'envoi dans la bdd
const emailCryptoJs = CryptoJS.AES.encrypt(req.body.email,`${process.env.PRIVATE_KEY}`).toString();
console.log(emailCryptoJs);

// chercher dans la bdd si l'user est bien present
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
          console.log("log de user");
          console.log(user);
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                // 3 arguments
                {userId :  user._id},
                `${process.env.TOKEN}`,
                {expiresIn : '12h'}
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
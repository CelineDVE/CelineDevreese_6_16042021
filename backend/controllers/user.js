const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');

const User = require('../models/user');


exports.signup = (req, res, next) => {
    const crytedEmail = cryptojs.HmacSHA256(req.body.email, process.env.KEY_EMAIL).toString();    
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
                email: crytedEmail,
                password: hash
            });
            user
              .save()
              .then(() => res.status(201).json ({ message: 'Utilisateur créé !'}))
              .catch((error) => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json ({ error }));
};

exports.login = (req, res, next) => {
    const crytedEmail = cryptojs.HmacSHA256(req.body.email, process.env.KEY_EMAIL).toString();
    User
        .findOne({ email: crytedEmail })
        .then(user => {
            if (!user) {
                return res
                  .status(401)
                  .json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
              .compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res
                        .status(401)
                        .json({ error: 'Mot de passe incorrect !' });
                  }
                  res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id }, 
                        process.env.KEY_JWT, 
                        { expiresIn: "24h"}),
                  });
              })
              .catch((error) => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};



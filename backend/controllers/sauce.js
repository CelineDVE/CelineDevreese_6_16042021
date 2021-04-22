const Sauce = require("../models/sauce");
const fs = require('fs');

exports.createSauce = (req, res, next) => {
      delete req.body._id;
      const sauce = new Sauce({
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
      });
      sauce
        .save()
        .then(() => res.status(201).json ({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json ({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
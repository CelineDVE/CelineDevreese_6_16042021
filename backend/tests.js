switch (req.body.like) {
  case -1:
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id,
      }
    )
      .then(() =>
        res.status(201).json({ message: "Vous n'aimez pas cette sauce !" })
      )
      .catch((error) => res.status(400).json({ error }));
    break;

  case 0:
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.find((user) => user === req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { userLiked: req.body.userId },
              _id: req.params.id,
            }
          )
            .then(() =>
              res
                .status(201)
                .json({ message: "Vous n'aimez plus cette sauce !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id,
            }
          )
            .then(() =>
              res
                .status(201)
                .json({ message: "Modification prise en compte !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
    break;

  case 1:
    Sauce.updateOne({ _id: req.params.id },
      {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id,
      }
    )
      .then(() => res.status(201).json({ message: "Vous aimez cette sauce !" }))
      .catch((error) => res.status(400).json({ error }));
    break;

  default:
    console.error("Mauvaise requête !");
}

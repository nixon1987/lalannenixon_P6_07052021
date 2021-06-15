// ---------------importation des modules sauces et fs-------------------//

const Sauce = require("../models/Sauce");
const fs = require("fs");

// ---------------Controllers des routes de l'application-------------//

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() =>
      res.status(200).json({ message: "Sauce mise à jour avec succès" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  like = req.body.like;
  userId = req.body.userId;
  if (like == 1) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        sauce.usersLiked.push(userId);
        sauce.likes += 1;
        sauce
          .save()
          .then(() => res.status(201).json({ message: "Sauce likée" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else if (like == 0) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (
          !sauce.usersLiked.includes(userId) &&
          !sauce.usersDisliked.includes(userId)
        ) {
          res.status(400).json({ error: `Vous n'avez pas liké ni disliké` });
        }
        if (sauce.usersLiked.includes(userId)) {
          let position = sauce.usersLiked.indexOf(userId);
          sauce.usersLiked.splice(position, 1);
          sauce.likes--;
          sauce
            .save()
            .then(() => res.status(201).json({ message: "Sauce unlikée" }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          let position = sauce.usersDisliked.includes(userId);
          sauce.usersDisliked.splice(position, 1);
          sauce.dislikes--;
          sauce
            .save()
            .then(() => res.status(201).json({ message: "Sauce undislikée" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        sauce.usersDisliked.push(userId);
        sauce.dislikes += 1;
        sauce
          .save()
          .then(() => res.status(201).json({ message: "Sauce dislikée" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

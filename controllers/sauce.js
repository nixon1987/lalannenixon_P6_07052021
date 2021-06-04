const Sauce = require("../models/Sauce");
const fs = require("fs");

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
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      console.log("avant");
      console.log(sauce.usersLiked);
      console.log(sauce.likes);
      sauce.usersLiked.forEach((element) => {
        if (sauce.likes == 1 && element == userId) {
          sauce.usersLiked.splice(element, 1);
          console.log("après");
          console.log(sauce.usersLiked);
          sauce.likes -= 1;
          sauce
            .save()
            .then(() => res.status(201).json({ message: "Sauce unlikée" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.likes == -1 && element == userId) {
          sauce.usersDisliked.splice(element, 1);
          console.log("après");
          console.log(sauce.usersDisliked);
          sauce.likes += 1;
          sauce
            .save()
            .then(() => res.status(201).json({ message: "Sauce unDislikée" }))
            .catch((error) => res.status(400).json({ error }));
        }
      });
    });
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

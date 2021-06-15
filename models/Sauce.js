const mongoose = require("mongoose");
const validator = require("mongoose-validator");

// ----------------model pour la création de sauce------------------//
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    validate: [
      validator({
        validator: "matches",
        arguments: /^[^@&()_$*€£`+=\/?#]+$/,
        message: "le champ ne doit pas contenir de caractères spéciaux",
      }),
    ],
  },
  manufacturer: {
    type: String,
    required: true,
    validate: [
      validator({
        validator: "matches",
        arguments: /^[^@&()_$*€£`+=\/?#]+$/,
        message: "le champ ne doit pas contenir de caractères spéciaux",
      }),
    ],
  },
  description: {
    type: String,
    required: true,
    validate: [
      validator({
        validator: "matches",
        arguments: /^[^@&()_$*€£`+=\/?#]+$/,
        message: "le champ ne doit pas contenir de caractères spéciaux",
      }),
    ],
  },
  mainPepper: {
    type: String,
    required: true,
    validate: [
      validator({
        validator: "matches",
        arguments: /^[^@&()_$*€£`+=\/?#]+$/,
        message: "le champ ne doit pas contenir de caractères spéciaux",
      }),
    ],
  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
});

// ----------------model pour la création de sauce------------------//

module.exports = mongoose.model("Sauce", sauceSchema);

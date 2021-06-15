const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("mongoose-validator");

// ---------model de l'email--------------//

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validator({
        validator: "isEmail",
        message: "Veuillez entrer un email valide",
      }),
    ],
  },
  password: { type: String, required: true },
});

// ---------model de l'email--------------//

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);



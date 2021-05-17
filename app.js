const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use('/api/sauces', (req, res, next))



const userRoutes = require("./routes/user");
mongoose
  .connect(
    "mongodb+srv://nixon:LNtabnp91@cluster0.2rjmn.mongodb.net/cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !" + error));

const app = express();

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;

app.use("/api/auth", userRoutes);

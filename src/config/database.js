const mongoose = require('mongoose');

const connectDB = async() => {
   await mongoose.connect("mongodb+srv://jatinbisht1900:ItR0r6jOkqC6NNUI@cluster0.plemqjo.mongodb.net/hyprsets");
}


module.exports = connectDB;
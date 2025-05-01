const mongoose = require("mongoose");

// Remove "MONGO_URL=" from the string
const mongoURI = "mongodb+srv://shivakumarmm1732004:kIDjwhB01wLiXhM1@lost-found.8hb8vll.mongodb.net/?retryWrites=true&w=majority&appName=Lost-Found";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
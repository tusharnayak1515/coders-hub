const mongoose = require("mongoose");

const Mongo_Uri = process.env.MONGO_URI;

const connectToMongo = ()=> {
    try {
        mongoose.connect(Mongo_Uri, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> {
            console.log("Connected to MongoDB successfully!");
        })
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
}

module.exports = connectToMongo;
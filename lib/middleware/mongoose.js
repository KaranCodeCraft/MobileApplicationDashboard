import mongoose from "mongoose";

// Mongo URI from environment variables
const url = process.env.MONGO_URI;

if (!url) {
  throw new Error("Mongo URI not available");
}

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the MongoClient across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongooseClientPromise) {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
      });
    global._mongooseClientPromise = mongoose.connection;
  }
  clientPromise = global._mongooseClientPromise;
} else {
  // In production mode, connect normally without global caching
  clientPromise = mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
}

export default clientPromise;

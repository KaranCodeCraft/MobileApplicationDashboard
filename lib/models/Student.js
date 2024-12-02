import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    enrollmentNumber: {
      type: String,
      unique: true,
      required: [true, "Enrollment number is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    aadharNumber: {
      type: String,
      unique: true,
      required: [true, "Aadhar number is required"],
      match: [/^\d{12}$/, "Aadhar number must be a 12-digit number"], // Validates the Aadhar format
    },
    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensures that this field is populated at the time of student creation
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware to handle duplicate field errors
StudentSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    next(new Error(`Duplicate value '${value}' found for field '${field}'`));
  } else {
    next(error);
  }
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
import mongoose from "mongoose";

enum Role {
  Patient = "patient",
  Doctor = "doctor",
  Admin = "admin",
}

enum Expertise {
  ORTHODONTICS = "orthodontics",
  ENDODONTICS = "endodontics",
  PROSTHODONTICS = "prosthodontics",
  PERIODONTICS = "periodontics",
}

const userSchema = new mongoose.Schema(
  {
    ssn: { type: String, required: true },
    name: { type: String, required: [true, "Name is required"] },
    dateOfBirth: { type: String, required: [true, "Date of birth required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    phoneNumber: { type: String, required: true },
    expertise: {
      type: String,
      enum: Object.values(Expertise),
      required: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.Patient,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    ssn: { type: String, required: true },
    name: { type: String, required: [true, "Name is required"] },
    dateOfBirth: { type: String, required: [true, "Date of birth required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"] },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

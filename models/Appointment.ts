import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dentist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    appointmentDate: { type: String, required: true },
    status: { type: String, required: true },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;

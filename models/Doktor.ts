import mongoose from "mongoose";

enum Expertise {
  orthodontics,
  endodontics,
  prosthodontics,
  periodontics,
}
const doktorSchema = new mongoose.Schema(
  {
    ssn: { type: String, required: true },
    name: { type: String, required: [true, "Name is required"] },
    dateOfBirth: { type: String, required: [true, "Date of birth required"] },
    email: { type: String, required: [true, "Email is required"] },
    phoneNumber: { type: String, required: true },
    expertise: { type: Expertise, required: true },
  },
  {
    timestamps: true,
  }
);

const Doktor = mongoose.model("Doktor", doktorSchema);

export default Doktor;

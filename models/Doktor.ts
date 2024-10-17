import mongoose from "mongoose";

enum Expertise {
  ORTHODONTICS = "orthodontics",
  ENDODONTICS = "endodontics",
  PROSTHODONTICS = "prosthodontics",
  PERIODONTICS = "periodontics",
}

const doktorSchema = new mongoose.Schema(
  {
    ssn: {
      type: String,
      required: [true, "SSN is required"],
      unique: true,
      minlength: [9, "SSN must be at least 9 characters"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    expertise: {
      type: String,
      enum: Object.values(Expertise),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

doktorSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

doktorSchema.set("toJSON", { virtuals: true });
doktorSchema.set("toObject", { virtuals: true });

const Doktor = mongoose.model("Doktor", doktorSchema);

export default Doktor;

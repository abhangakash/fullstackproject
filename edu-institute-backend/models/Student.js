const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentName: { type: String, required: true },
  profilePic: { type: String, default: '' },
  address: {
    village: { type: String, required: true },
    taluka: { type: String, required: true },
    district: { type: String, required: true },
  },
  phone: { type: String, required: true },
  altPhone: { type: String },
  studentClass: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String },
  declaration: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);

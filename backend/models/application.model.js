import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
    required: true
  },
  applicants: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'], // Separate values correctly
    default: 'Pending',
    required: true,
  }
}, { timestamps: true });

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application;
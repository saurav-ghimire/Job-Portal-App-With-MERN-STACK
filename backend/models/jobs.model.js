import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title : {
    type: String,
    required:true
  },
  description : {
    type: String,
    required:true
  },
  requirements : [{
    type: String
  }],
  salary : {
    type: Number,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  jobType:{
    type:String,
    required:true
  },
  company : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Company',
    required:true
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required:true
  },
  applications:{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Application'
  }
},{timestamps:true})

const Jobs = mongoose.models.Jobs || mongoose.model('Jobs', jobSchema);

export default Jobs;
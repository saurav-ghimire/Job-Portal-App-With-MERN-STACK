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
  requirements :[
    {
      type: String, // Directly use an array of strings
    },
  ],
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
  position:{
    type:String,
    required:true
  },
  experienceLevel:{
    type:Number,
    required:true
  },
  companyId : {
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
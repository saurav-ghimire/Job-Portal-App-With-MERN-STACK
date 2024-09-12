import Application from "../models/application.model"
import Jobs from "../models/jobs.model"

export const applyJobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required', success: false });
    }
    // check if the user have already applied for the jobs
    const existingApplication = await Application.findOne({ applicants: userId, job: jobId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this role', success: false });
    }

    // Check if job Exist of not
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: 'Job Dosenot Exist', success: false });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicants: userId
    });

    job.applications.push(newApplication?._id);
    await job.save();

    return res.status(201).json({ message: 'You have successfully applied for this Job', success: true });

  } catch (error) {
    console.log(error)
  }
}

export const getAllAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(404).json({ message: 'User ID Not Found', success: false });
    }
    const jobs = await Application.find({ applicants: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { createdAt: - 1 } },
      populate: {
        path: 'companyId'
      }
    });
    if (!jobs) {
      return res.status(404).json({ message: 'No Application', success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error)
  }
}


// Get All Appplicant
export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Jobs.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicants',
        options: { sort: { createdAt: -1 } },
      }
    });
    if (!job) {
      return res.status(404).json({ message: 'Job Dosenot Exist', success: false })
    }

    return res.status(200).json({ job, success: true });

  } catch (error) {
    console.log(error)
  }
}


import Company from "../models/company.model.js"

export const registerCompany = async(req,res) => {
  try {
    const {companyname} = req.body
    if(!companyname){
      return resizeBy.status(400).json({
        message:'Company Name is required',
        success:false
      })
    }

    let company = await Company.findOne({name:companyname});
    if(company){
      return res.status(400).json({message:'Company Already Exist', success:false});
    }
    company = await Company.create({
      name : companyname,
      userId: req.id
    })
    return res.status(201).json({message:'Company Successfully Created', company, success:true});

  } catch (error) {
    console.log(error)
  }
}

export const getCompany = async (req,res) => {
  try {
    const userId = req.id;
    const companies = await Company.find(userId);
    if(!companies){
      return res.status(404).json({message:'Companies Not Found', success:false})
    }
  } catch (error) {
    console.log(error)
  }
}


const mongoose=require("mongoose")
 const InternshipSchema=new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    Duration: String,
    category: String,
    aboutCompany:String,
    aboutInternship:String,
    Whocanapply: String,
    perks: Array,
    numberOfopning:Number,
    AdditionalInfo:String,
    stipend: String,
    StartDate:String,
    
    

   
   
 })
 module.exports=mongoose.model("Internship",InternshipSchema)



 
    
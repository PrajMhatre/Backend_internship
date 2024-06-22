const express =require("express")
const router= express.Router();
const Internship=require("../Model/Internship");
const interndata=require("../Data/InternshipDatAvl")



router.post("/", async (req, res) => {
    try {
        const internships = interndata;

        const savedInternships = [];

        for (const internshipData of internships) {
            const newInternship = new Internship(internshipData);
            const savedInternship = await newInternship.save();
            savedInternships.push(savedInternship);
        }

        // Send the saved data as the response
        res.send(savedInternships);
    } catch (error) {
        console.error("Error while posting the data", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/",async (req,res)=>{
    try {
        const data=await Internship.find();
        res.json(data) .status(200)
    } catch (error) {
        console.log(err);
        res.status(404).json({error:"Internal server error "})
    }
});


router.get("/:id", async (req,res)=>{
    const {id}=req.params;
    try {
        const data=await Internship.findById(id);
        if (!data) {

             res.status(404).json({error:"Internship is not found "})
        }
        res.json(data) .status(200)
    } catch (error) {
        console.log(err);
        res.status(404).json({error:"Internal server error "})
    }
});
module.exports=router
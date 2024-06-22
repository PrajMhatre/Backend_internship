const express = require('express');
const router = express.Router();

const authRoute = require('./auth');
const userRoute = require('./userRoute');
const jobRoute = require('./jobRoute');
const intern = require('./internshipRout');
const ApplicationRoute = require('./ApplicationRoute');
const loginHistoryRoute = require('./loginHistoryRoute'); // Add this line

router.get("/",(req,res)=>{
    res.send("this is backend")
})

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/jobs', jobRoute);
router.use('/internship', intern);
router.use('/application', ApplicationRoute);
router.use('/loginHistory', loginHistoryRoute); // Add this line

module.exports = router;

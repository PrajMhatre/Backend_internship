const express = require('express');
const router = express.Router();

const authRoute = require('./auth');
const userRoute = require('./userRoute');
const jobRoute = require('./jobRoute');
const internshipRoute = require('./internshipRout');
const applicationRoute = require('./ApplicationRoute');
const loginHistoryRoute = require('./loginHistoryRoute'); // Add this line

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/jobs', jobRoute);
router.use('/internships', internshipRoute);
router.use('/applications', applicationRoute);
router.use('/loginHistory', loginHistoryRoute); // Add this line

module.exports = router;

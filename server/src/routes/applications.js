const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const { applyForJob, getMyApplications, getJobApplications, updateStatus } = require('../controllers/applicationController')

router.post('/:jobId', auth, role('seeker'), applyForJob)
router.get('/my', auth, role('seeker'), getMyApplications)
router.get('/job/:jobId', auth, role('employer', 'admin'), getJobApplications)
router.put('/:id/status', auth, role('employer', 'admin'), updateStatus)

module.exports = router
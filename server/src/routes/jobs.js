const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const { getJobs, getJob, createJob, updateJob, deleteJob, getMyJobs } = require('../controllers/jobController')

router.get('/', getJobs)
router.get('/my', auth, role('employer', 'admin'), getMyJobs)
router.get('/:id', getJob)
router.post('/', auth, role('employer', 'admin'), createJob)
router.put('/:id', auth, role('employer', 'admin'), updateJob)
router.delete('/:id', auth, role('employer', 'admin'), deleteJob)

module.exports = router
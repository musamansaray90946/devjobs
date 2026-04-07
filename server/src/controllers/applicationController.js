const prisma = require('../prisma')

const applyForJob = async (req, res) => {
  try {
    const { coverLetter } = req.body
    const jobId = parseInt(req.params.jobId)
    const existing = await prisma.application.findFirst({
      where: { jobId, seekerId: req.userId }
    })
    if (existing) return res.status(400).json({ error: 'Already applied for this job' })
    const application = await prisma.application.create({
      data: { jobId, seekerId: req.userId, coverLetter }
    })
    res.json(application)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getMyApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { seekerId: req.userId },
      include: { job: { include: { employer: { select: { name: true } } } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json(applications)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getJobApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { jobId: parseInt(req.params.jobId) },
      include: { seeker: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json(applications)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const application = await prisma.application.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status }
    })
    res.json(application)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { applyForJob, getMyApplications, getJobApplications, updateStatus }
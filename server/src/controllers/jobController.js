const prisma = require('../prisma')

const getJobs = async (req, res) => {
  try {
    const { search, location, type } = req.query
    const where = {}
    if (search) where.title = { contains: search, mode: 'insensitive' }
    if (location) where.location = { contains: location, mode: 'insensitive' }
    if (type) where.type = type
    const jobs = await prisma.job.findMany({
      where,
      include: { employer: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getJob = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { employer: { select: { name: true, email: true } } }
    })
    if (!job) return res.status(404).json({ error: 'Job not found' })
    res.json(job)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createJob = async (req, res) => {
  try {
    const { title, company, description, location, type, salary } = req.body
    const job = await prisma.job.create({
      data: { title, company, description, location, type, salary, employerId: req.userId }
    })
    res.json(job)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateJob = async (req, res) => {
  try {
    const job = await prisma.job.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    })
    res.json(job)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteJob = async (req, res) => {
  try {
    await prisma.job.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Job deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getMyJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { employerId: req.userId },
      include: { applications: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob, getMyJobs }
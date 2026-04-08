const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma')

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'Email already in use' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: role || 'seeker' }
    })
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body
    const existing = await prisma.user.findFirst({
      where: { email, NOT: { id: req.userId } }
    })
    if (existing) return res.status(400).json({ error: 'Email already in use' })
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { name, email },
      select: { id: true, name: true, email: true, role: true }
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    await prisma.application.deleteMany({ where: { seekerId: userId } })
    await prisma.application.deleteMany({ where: { job: { employerId: userId } } })
    await prisma.job.deleteMany({ where: { employerId: userId } })
    await prisma.user.delete({ where: { id: userId } })
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { register, login, getProfile, updateProfile, getUsers, deleteUser }
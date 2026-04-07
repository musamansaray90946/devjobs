const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://devjobs-umber.vercel.app'],
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/jobs', require('./routes/jobs'))
app.use('/api/applications', require('./routes/applications'))

app.get('/', (req, res) => {
  res.json({ message: 'DevJobs API is running' })
})

const PORT = process.env.PORT || 5003
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
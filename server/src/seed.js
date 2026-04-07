const prisma = require('./prisma')
const bcrypt = require('bcryptjs')

async function seed() {
  const password = await bcrypt.hash('password123', 10)

  const employer = await prisma.user.create({
    data: { name: 'Tech Corp', email: 'employer@techcorp.com', password, role: 'employer' }
  })

  const admin = await prisma.user.create({
    data: { name: 'Admin', email: 'admin@devjobs.com', password, role: 'admin' }
  })

  const jobs = [
    { title: 'Senior React Developer', company: 'Tech Corp', description: 'We are looking for a skilled Senior React Developer to lead our frontend team. You will architect scalable UI components, mentor junior developers, and collaborate with designers to deliver exceptional user experiences. Requirements: 4+ years React, TypeScript, state management, and testing.', location: 'Remote', type: 'full-time', salary: '$90,000 - $120,000' },
    { title: 'Backend Node.js Engineer', company: 'DataFlow Inc', description: 'Join our backend team building scalable Node.js APIs and microservices. You will design RESTful APIs, optimize database queries, and implement authentication systems. Requirements: 3+ years Node.js, Express, PostgreSQL, and Redis.', location: 'New York, USA', type: 'full-time', salary: '$85,000 - $110,000' },
    { title: 'UI/UX Designer', company: 'DesignHub', description: 'Creative designer needed to craft beautiful user experiences for our SaaS products. You will conduct user research, create wireframes and prototypes, and work closely with developers. Requirements: Figma, user research, design systems.', location: 'London, UK', type: 'full-time', salary: '$60,000 - $80,000' },
    { title: 'React Native Developer', company: 'AppWorks', description: 'Build cross-platform mobile apps using React Native for our growing client base. You will develop features, fix bugs, and optimize performance. Requirements: 2+ years React Native, iOS/Android deployment experience.', location: 'Remote', type: 'contract', salary: '$55/hour' },
    { title: 'DevOps Engineer', company: 'CloudScale', description: 'Manage our cloud infrastructure and CI/CD pipelines on AWS. You will automate deployments, monitor systems, and ensure 99.9% uptime. Requirements: AWS, Docker, Kubernetes, Terraform, GitHub Actions.', location: 'Berlin, Germany', type: 'full-time', salary: '$80,000 - $100,000' },
    { title: 'Junior Frontend Developer', company: 'StartupLabs', description: 'Great opportunity for a junior developer to grow their skills in a supportive environment. You will build UI components, write tests, and participate in code reviews. Requirements: HTML, CSS, JavaScript, React basics.', location: 'Remote', type: 'part-time', salary: '$30,000 - $40,000' },
    { title: 'Full Stack Developer', company: 'WebPro Agency', description: 'Work on diverse client projects using modern web technologies. You will handle both frontend and backend development, deploy applications, and communicate with clients. Requirements: React, Node.js, PostgreSQL, Git.', location: 'Toronto, Canada', type: 'full-time', salary: '$75,000 - $95,000' },
    { title: 'Python Data Engineer', company: 'DataFlow Inc', description: 'Build and maintain data pipelines that power our analytics platform. You will work with large datasets, optimize ETL processes, and ensure data quality. Requirements: Python, SQL, Apache Spark, Airflow.', location: 'San Francisco, USA', type: 'full-time', salary: '$100,000 - $130,000' },
  ]

  for (const job of jobs) {
    await prisma.job.create({ data: { ...job, employerId: employer.id } })
  }

  console.log('Seeded: 2 users, 8 jobs')
  console.log('Employer login: employer@techcorp.com / password123')
  console.log('Admin login: admin@devjobs.com / password123')
}

seed().catch(console.error).finally(() => prisma.$disconnect())
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes) // <-- route des tâches

// Connexion MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB Atlas'))
.catch(err => console.error('❌ Erreur MongoDB :', err))

// Démarrage serveur
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Serveur Taskifyy lancé sur le port ${PORT}`)
})


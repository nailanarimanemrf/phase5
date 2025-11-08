import Task from '../models/Task.js'

// Créer une tâche
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body
    const task = await Task.create({
      user: req.user._id, // depuis le token
      title,
      description,
      dueDate
    })
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Récupérer les tâches d’un utilisateur
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Mettre à jour une tâche
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' })
    if (task.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Non autorisé' })

    Object.assign(task, req.body)
    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Supprimer une tâche
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' })
    if (task.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Non autorisé' })

    await task.remove()
    res.json({ message: 'Tâche supprimée' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


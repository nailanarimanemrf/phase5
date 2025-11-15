import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate || null,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Erreur création tâche" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération tâches" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Non autorisé" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Erreur update" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Non autorisé" });

    await task.deleteOne();
    res.json({ message: "Supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression" });
  }
});

export default router;

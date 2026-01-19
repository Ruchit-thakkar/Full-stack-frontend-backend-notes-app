const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes.model");

// 1. Create Note
router.post("/notes", async (req, res) => {
  const { title, content, tags, isPinned } = req.body;

  if (!title && !content) {
    return res
      .status(400)
      .json({ error: true, message: "Title or Content required" });
  }

  try {
    const note = await notesModel.create({
      title,
      content,
      tags: tags || [],
      isPinned: isPinned || false,
    });
    res.json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// 2. Get All Notes
router.get("/notes", async (req, res) => {
  try {
    const notes = await notesModel.find().sort({ isPinned: -1, createdAt: -1 });
    res.json({ error: false, notes, message: "All notes retrieved" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// 3. Edit Note
router.put("/notes/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;

  try {
    const note = await notesModel.findByIdAndUpdate(
      noteId,
      { title, content, tags, isPinned },
      { new: true }, // Return updated note
    );
    res.json({ error: false, note, message: "Note updated" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// 4. Delete Note
router.delete("/notes/:noteId", async (req, res) => {
  const { noteId } = req.params;
  try {
    await notesModel.findByIdAndDelete(noteId);
    res.json({ error: false, message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// 5. Update Pin (Special Route)
router.put("/notes/update-pin/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;

  try {
    const note = await notesModel.findByIdAndUpdate(
      noteId,
      { isPinned },
      { new: true },
    );
    res.json({ error: false, note, message: "Pin status updated" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;

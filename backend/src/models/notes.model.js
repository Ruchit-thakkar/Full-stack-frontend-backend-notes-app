const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // Changed 'description' to 'content' for consistency
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }, // <--- THIS FIXES THE DATE ISSUE
);

const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;

const express = require("express");
const router = express.Router();
const path = require("path");

const notes = [];

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "leaveNote.html"));
});
router.post("/", (req, res, next) => {
  const note = req.body.note;
  notes.push({ note });
  res.redirect("http://localhost:8000");
});

module.exports = {
  router: router,
  notes: notes
};
// module.exports = router;

const express = require("express");
const router = express.Router();
// const path = require("path");

const { notes } = require("./leaveNote");

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "readNotes.html"));

  const noteList = notes.map((note) => `<li>${note.note}</li>`).join("");
  res.send(`
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../public/main.css" />
  </head>
      <body>
        <h1>Notes Left by Others</h1>
        <ul>
          ${noteList}
        </ul>
      </body>
    </html>
  `);
});

module.exports = router;

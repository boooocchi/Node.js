const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ exteded: true }));

app.use(require("./routes/homePage"));
app.use("/leavenote", require("./routes/leaveNote").router);
app.use("/readnotes", require("./routes/readNotes"));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(8000);

const express = require("express");
const cors = require("cors");
//multeris package that allows node to receive files from forms and analyzes them
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//returns analysis of uploaded file that is inside req.file.[property]
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });

  //path where file is stored
  //__dirname + "/" + req.file.path
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

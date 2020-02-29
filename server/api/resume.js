const router = require("express").Router();
const fileUpload = require("express-fileupload");
const Resume = require("../../db/models/resume");
const multer = require("multer");
const path = require("path");

module.exports = router;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

console.log("STORAGE ", storage);

//will be using this for uplading
const upload = multer({ storage: storage });

router.get("/", async (req, res, next) => {
  try {
    const resume = await Resume.findAll();
    res.json(resume);
  } catch (err) {
    next(err);
  }
});

// router.post("/", fileUpload(), async (req, res, next) => {
//   try {
//     const resumeFile = req.files.resume;
//     console.log("resumeFIle ", resumeFile.data);
//     await Resume.create({
//       resume: resumeFile.data
//     });

//     res.status(201).send("uploaded");
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("storage location is ", req.hostname + "/" + req.file.path);
    console.log("FILENAME ", req.file.filename);
    await Resume.create({
      fileName: req.file.filename,
      title: req.body.title,
      type: req.body.type
    });
    return res.send(req.file);
  } catch (error) {
    console.log(error);
  }
});

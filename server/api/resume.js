const router = require("express").Router();
const fileUpload = require("express-fileupload");
const Resume = require("../../db/models/resume");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const resume = await Resume.findAll();
    res.json(resume);
  } catch (err) {
    next(err);
  }
});

router.post("/", fileUpload(), async (req, res, next) => {
  try {
    const resumeFile = req.files.resume;
    console.log("resumeFIle ", resumeFile.data);
    await Resume.create({
      resume: resumeFile.data
    });

    res.status(201).send("uploaded");
  } catch (error) {
    next(error);
  }
});

const router = require("express").Router();
const { Comment } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        documentId: 1 //hardcoded
      }
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("REQ BODy, ", req.body);
    const newComment = await Comment.create({
      documentId: req.body.documentId,
      comment: req.body.comment
    });

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

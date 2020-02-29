const router = require("express").Router();

router.use("/comments", require("./comments"));
router.use("/resume", require("./resume"));

module.exports = router;

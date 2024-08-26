const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    user: {
      id: 1,
      username: "johnny",
    },
    additionalInfo: "You are authorized",
  });
});

module.exports = router;

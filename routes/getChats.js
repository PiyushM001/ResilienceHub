const express = require("express");
const router = express.Router();
const chatdb = require("../schema/chat");
router.post("/", async (req, res) => {
  const { teamname } = req.body;
  try {
    const chatinfo = await chatdb.find({ group: teamname });

    if (!chatinfo) {
      res.status(404).send("cant find chats");
    }

    return res.status(200).send(chatinfo);
  } catch (error) {
    res.send(" something error ");
  }
});
module.exports = router;

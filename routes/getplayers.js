const express = require("express");
const router = express.Router();
const info = require("../schema/info");

// Search route
router.post("/", async (req, res) => {
    const __v = 0;
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    try {
        let players;
        if (query) {
            // Perform a case-insensitive search on the 'name' field
            players = await info.find({ __v, IngameName: new RegExp(query, 'i') });
        } else {
            // If no query is provided, return all players
            players = await info.find({ __v }).skip((page - 1)*10).limit(10);
        }
        res.status(200).send(players);
    } catch (error) {
        res.status(500).send("server me dikkat h b0$$");
    }
});

module.exports = router;
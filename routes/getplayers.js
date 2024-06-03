const express = require("express");
const router = express.Router();
const info = require("../schema/info");

// Search route
router.post("/", async (req, res) => {
    
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    try {
        let players;
        if (query) {
            // Perform a case-insensitive search on the 'IngameName' field
            players = await info.aggregate([
                { $match: { IngameName: new RegExp(query, 'i') } },
                { $sample: { size: limit } } // Randomly select 'limit' documents
            ]);
        } else {
            // If no query is provided, return a random selection of players with pagination
            players = await info.aggregate([
                
                { $sample: { size: 30 } }, // Randomly select 100 documents (adjust size as needed)
                { $skip: (page - 1) * limit },
                { $limit: limit }
            ]);
        }
        res.status(200).send(players);
    } catch (error) {
        res.status(500).send("server me dikkat h b0$$");
    }
});

module.exports = router;

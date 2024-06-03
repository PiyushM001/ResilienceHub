const express = require("express");
const router = express.Router();
const post = require("../schema/post");

// Search route
router.post("/", async (req, res) => {
    const __v = 0;
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    
    try {
        // Calculate the number of documents to skip
        const skip = (page-1)*limit;

        // Aggregate pipeline to get random documents and then paginate
        const posts = await post.aggregate([
           
            { $sample: { size: 20 } }, // Randomly select 100 documents (adjust size as needed)
            { $skip: skip },
            { $limit: limit } // Limit the number of documnts
        ]);

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send("server me dikkat h b0$$");
    }
});

router.post("/my", async (req, res) => {
  
    const {infoid}=req.body;
    try {
        // Calculate the number of documents to skip

        // Aggregate pipeline to get random documents and then paginate
        const posts = await post.find({_userid:infoid});

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/other", async (req, res) => {
  
    const {userid}=req.body;
    try {
        // Calculate the number of documents to skip

        // Aggregate pipeline to get random documents and then paginate
        const posts = await post.find({_userid:userid});

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

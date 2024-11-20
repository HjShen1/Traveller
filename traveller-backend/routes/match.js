const express = require("express");
const User = require("../models/User");
const router = express.Router();

// 匹配旅友
router.get("/recommendations", async (req, res) => {
    try {
        const { interests, coordinates } = req.query;

        // 将兴趣标签转为数组
        const interestArray = interests ? interests.split(",") : [];

        // 查找附近用户，兴趣至少有一个匹配
        const matches = await User.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: coordinates.split(",").map(Number) },
                    $maxDistance: 50000, // 50公里
                },
            },
            interests: { $in: interestArray },
        })
        .select("email interests location");
console.log("Matches dound:",matches);

//此处开始返回结果
res.json(matches.map((match)=>({
    _id:match._id,
    email:match.email || "Unknown Email",
    interests: match.interests || [],
    location:match.location || {},
})));
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching recommendations");
    }
});

module.exports = router;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interests: [String],
    location: { 
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
});

userSchema.index({ location: "2dsphere" }); // GeoJSON索引

module.exports = mongoose.model("User", userSchema);

